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
      <Table border ref="table" :columns="columns7" :data="historyData" :stripe="true" :border="false"
             :loading="loading" @on-selection-change="onSelectionChange"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" :page-size="pageSize" show-sizer show-total @on-change="handlePage"
                @on-page-size-change='handlePageSize'></Page>
        </div>
      </div>
    </Card>
    <Modal v-model="addModel" :title="title" footer-hide @on-cancel="addCanael">
      <Form :model="formItem" ref="formItem" :label-width="80">
        <FormItem label="供应商代码" prop="comNo">
          <Input :disabled="disable" :hidden="hidden" v-model="formItem.comNo"/>
        </FormItem>
        <FormItem label="供应商名称">
          <Input  v-model="formItem.comName" placeholder="请输入供应商名称"/>
        </FormItem>
        <FormItem label="地址" prop="comAddress">
          <Input  v-model="formItem.comAddress" placeholder="请输入地址"/>
        </FormItem>
        <FormItem label="联系电话" prop="contactTel">
          <Input v-model="formItem.contactTel" placeholder="请输入联系电话"/>
        </FormItem>
        <FormItem label="联系人" prop="contactPer">
          <Input v-model="formItem.contactPer" placeholder="请输入联系人"/>
        </FormItem>
        <FormItem label="类别" prop="comType">
          <Input v-model="formItem.comType" placeholder="请输入类别"/>
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
  name: 'level_2_7',
  data () {
    return {
      columns7: [
        { title: '供应商代码', key: 'comNo' },
        { title: '供应商名称', key: 'comName' },
        { title: '地ַ止', key: 'comAddress' },
        { title: '联系电话', key: 'contactTel' },
        { title: '联系人', key: 'contactPer' },
        { title: '类别', key: 'comType' },
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
      data6: [],
      historyData: [],
      searchValue: '',
      loading: false,
      addModel: false,
      current: 1,
      total: 0,
      pageSize: 10,
      disable: false,
      hidden: false,
      formItem: {
        comNo: '', //  供应商代码
        comName: '', // 供应商名称
        comAddress: '', //  地址
        contactTel: '', //   联系电话
        contactPer: '', // 联系人
        comType: '' //  类别
      }
    }
  },
  methods: {
    // 修改
    show (index) {
      this.formItem = {
        comNo: this.data6[index].comNo,
        comName: this.data6[index].comName,
        comAddress: this.data6[index].comAddress,
        contactTel: this.data6[index].contactTel,
        contactPer: this.data6[index].contactPer,
        comType: this.data6[index].comType
      }
      this.title = '修改添加供应商编码'
      this.disable = true
      this.addModel = true
    },
    // 删除
    remove (index) {
      this.$Modal.confirm({
        title: `确定要删除${this.data6[index].comNo}吗？`,
        onOk: () => {
          this.loading = true
          const url = this.GLOBAL.BASE_URL + '/supplier/delete'
          this.$axios.delete(url, { params: { id: this.data6[index].comNo } })
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
      const url = this.GLOBAL.BASE_URL + '/supplier/query'
      this.$axios.get(url)
        .then(res => {
          console.log(res.data)
          this.data6 = res.data.data
          this.total = res.data.data.length
          this.loading = false
          if (this.total < this.pageSize) {
            this.historyData = this.data6
            this.loading = false
          } else {
            this.historyData = this.data6.slice(0, this.pageSize)
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
          let url = this.GLOBAL.BASE_URL + '/supplier/update'

          if (this.title === '添加供应商编码') {
            url = this.GLOBAL.BASE_URL + '/supplier/add'
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
      this.title = '添加供应商编码'
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
      this.historyData = this.data6.slice(_start, _end)
      console.log(this.historyData)
      // this.changePage()
    },
    handlePageSize (index) {
      // 当前展示条数
      this.pageSize = index
      let _start = (this.current - 1) * index
      let _end = this.current * index
      this.historyData = this.data6.slice(_start, _end)
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
