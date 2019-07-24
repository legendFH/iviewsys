<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px;">
        <Input placeholder="输入关键字搜索" v-model="searchValue" style="width: 200px" @keydown.enter.native="handleSearch"/>&nbsp;
        <Button @click="handleSearch" type="primary">
          <Icon type="md-search"/>
          搜索
        </Button>&nbsp;
        <Button @click="handleAdd" type="success">
          <Icon type="ios-add"/>
          添加
        </Button>&nbsp;&nbsp;
        <Button style="position: absolute;right: 20px" @click="exportData" type="warning">
          <Icon type="ios-download-outline"></Icon>
          导出
        </Button>
      </div>
      <Table border ref="table" :columns="columns7" :data="historyData" :stripe="true" :border="false" :loading="loading"
             @on-selection-change="onSelectionChange"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" :page-size="pageSize" show-sizer show-total @on-change="handlePage"
                @on-page-size-change='handlePageSize'></Page>
        </div>
      </div>
    </Card>
    <Modal v-model="addModel" :title="title" footer-hide @on-cancel="addCanael">
      <Form :model="formItem" ref="formItem" :label-width="80">
        <FormItem label="药品代码" prop="mediNo">
          <Input :disabled="disable" :hidden="hidden" v-model="formItem.mediNo"/>
        </FormItem>
        <FormItem label="规格">
          <Input  v-model="formItem.specification" placeholder="请输入规格"/>
        </FormItem>
        <FormItem label="单位" prop="unit">
          <Input  v-model="formItem.unit" placeholder="请输入单位"/>
        </FormItem>
        <FormItem label="单价" prop="unitPrice">
          <Input v-model="formItem.unitPrice" placeholder="请输入价格"/>
        </FormItem>
        <FormItem label="品名" prop="mediName">
          <Input v-model="formItem.mediName" placeholder="请输入药品名字"/>
        </FormItem>
        <FormItem label="性质">
          <Select v-model="formItem.quality">
            <Option value="自费">自费</Option>
            <Option value="公费">公费</Option>
          </Select>
        </FormItem>
        <FormItem label="库存下限" prop="storeLimit">
          <Input v-model="formItem.storeLimit" placeholder="请输入库存下线"/>
        </FormItem>
        <FormItem>
          <Button @click="addAndUpdate" type="primary">Submit</Button>
          <Button  @click="addCanael" style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import qs from 'qs'

export default {
  name: 'level_2_3',
  data () {
    return {
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        { title: '药品代码', key: 'mediNo' },
        { title: '规格', key: 'specification' },
        { title: '单位', key: 'unit' },
        { title: '单价', key: 'unitPrice' },
        { title: '品名', key: 'mediName' },
        { title: '性质', key: 'quality' },
        { title: '库存下限', key: 'storeLimit' },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  icon: 'ios-create-outline'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error',
                  icon: 'md-trash'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              })
            ])
          }
        }
      ],
      data7: [],
      historyData: [],
      searchValue: '',
      loading: false,
      addModel: false,
      current: 1, // 当前页数
      // 总条数
      total: 0,
      // 每页显示条数
      pageSize: 10,
      disable: false,
      hidden: false,
      formItem: {
        mediNo: '',
        specification: '',
        unit: '',
        unitPrice: '',
        mediName: '',
        quality: '自费',
        storeLimit: ''
      }
    }
  },
  methods: {
    // 修改
    show (index) {
      this.formItem = {
        mediNo: this.data7[index].mediNo,
        specification: this.data7[index].specification,
        unitPrice: this.data7[index].unitPrice,
        unit: this.data7[index].unit,
        mediName: this.data7[index].mediName,
        quality: this.data7[index].quality,
        storeLimit: this.data7[index].storeLimit
      }
      this.title = '修改价格'
      this.disable = true
      this.addModel = true
    },
    // 删除
    remove (index) {
      this.$Modal.confirm({
        title: `确定要删除${this.data7[index].mediNo}吗？`,
        onOk: () => {
          this.loading = true
          const url = this.GLOBAL.BASE_URL + '/pharmacyprice/delete'
          this.$axios.delete(url, { params: { id: this.data7[index].mediNo } })
            .then(res => {
              this.$Message.success('删除成功')
              this.changePage()
              this.loading = false
            })
            .catch(res => {
              console.log(res)
            })
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    },
    // 查询方法
    changePage () {
      this.loading = true
      const url = this.GLOBAL.BASE_URL + '/pharmacyprice/query'
      this.$axios.get(url)
        .then(res => {
          console.log(res.data)
          this.data7 = res.data.data
          this.total = res.data.data.length
          if (this.total < this.pageSize) {
            this.historyData = this.data7
            this.loading = false
          } else {
            this.historyData = this.data7.slice(0, this.pageSize)
            this.loading = false
          }
        })
        .catch(res => {
          console.log(res)
        })
    },

    // 添加修改方法
    addAndUpdate () {
      this.$refs.formItem.validate((valid) => {
        if (valid) { // 步骤1
          this.loading = true
          // 判断此时是添加还是修改
          let url = this.GLOBAL.BASE_URL + '/pharmacyprice/update'

          if (this.title === '添加调价') {
            url = this.GLOBAL.BASE_URL + '/pharmacyprice/add'
          }
          this.$axios.post(url, qs.stringify(this.formItem))
            .then(res => {
              this.$Message.success('操作成功')
              this.changePage()
              this.loading = false
            })
            .catch(res => {
              console.log(res)
            })
          this.addModel = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSelectionChange (selection) {
      console.log(selection)
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: 'The original data'
      })
    },
    handleSearch () {
      this.changePage()
    },
    handleAdd () {
      this.title = '添加调价'
      this.disable = true
      this.addModel = true
    },
    handleDelete () {

    },
    handlePage (index) {
      this.current = index
      let _start = (index - 1) * this.pageSize
      console.log(_start)
      let _end = index * this.pageSize
      console.log(_end)
      this.historyData = this.data7.slice(_start, _end)
      console.log(this.historyData)
      // this.changePage()
    },
    handlePageSize (index) {
      // 当前展示条数
      this.pageSize = index
      let _start = (this.current - 1) * index
      let _end = this.current * index
      this.historyData = this.data7.slice(_start, _end)
      this.changePage()
    },
    addCanael () {
      this.addModel = false
    }
  },
  mounted () {
    this.changePage()
  }
}
</script>
