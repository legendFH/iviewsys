<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>进入库情况查询</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchName"
        append-icon="search"
        label=" 输入关键词搜索"
        single-line
        hide-details
      ></v-text-field>

    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="searchName"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.time1 }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.guige }}</td>
        <td class="text-xs-left">{{ props.item.company }}</td>
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="text-xs-left">{{ props.item.unit }}</td>
        <td class="text-xs-left">{{ props.item.unit_price }}</td>
        <td class="text-xs-left">{{ props.item.in_price }}</td>
        <td class="text-xs-left">{{ props.item.out_price }}</td>
        <td class="text-xs-left">{{ props.item.time2 }}</td>
        <td class="text-xs-left">{{ props.item.person }}</td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:pageText="props">
        第{{ parseInt(props.pageStop /props.itemsLength) +1}}页，共{{ Math.ceil(props.itemsLength /5)}}页 {{ props.itemsLength }}条数据
        <!--        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}-->
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    searchName: '',
    dialog: false,
    headers: [
      {
        text: '入库单号',
        align: 'left',
        sortable: false,
        value: 'id'
      },
      { text: '入库日期', value: 'time1' },
      { text: '名称', value: 'name' },
      { text: '规格', value: 'guige' },
      { text: '供应商', value: 'company' },
      { text: '数量', value: 'number' },
      { text: '单位', value: 'unit' },
      { text: '进价', value: 'unit_price' },
      { text: '进价金额', value: 'in_price' },
      { text: '零售价', value: 'out_price' },
      { text: '有效期', value: 'time2' },
      { text: '收费人', value: 'person' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      time1: '',
      guige: '',
      place: '',
      company: '',
      number: '',
      unit: '',
      unit_price: '',
      in_price: '',
      out_price: '',
      time2: '',
      person: ''
    },
    defaultItem: {
      id: '',
      time1: '',
      guige: '',
      name: '',
      company: '',
      number: '',
      unit: '',
      unit_price: '',
      in_price: '',
      out_price: '',
      time2: '',
      person: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '进入库统计信息' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          id: '1000',
          time1: '2019-7-22 09:50',
          guige: '500ml',
          name: '肌肉营养液',
          company: '史塔克公司',
          number: '408',
          unit: '瓶',
          unit_price: '39.48',
          in_price: '16107.84',
          out_price: '39.48',
          time2: '2020/7/31',
          person: 'fh'
        },
        {
          id: '1001',
          time1: '2019-7-23 10:50',
          guige: '1.0g',
          name: '注射用呃他',
          company: '史塔克公司',
          number: '9',
          unit: '支',
          unit_price: '1934.20',
          in_price: '17408.34',
          out_price: '1934.20',
          time2: '2020/7/31',
          person: 'czc'
        },
        {
          id: '1003',
          time1: '2019-7-23 11:00',
          guige: '1kg',
          name: '乌药',
          company: '史塔克公司',
          number: '1',
          unit: 'kg',
          unit_price: '62.00',
          in_price: '62.00',
          out_price: '77.50',
          time2: '',
          person: 'czc'
        },
        {
          id: '1004',
          time1: '2019-7-23 11:00',
          guige: '1kg',
          name: '木香',
          company: '史塔克公司',
          number: '3',
          unit: 'kg',
          unit_price: '70.00',
          in_price: '210.00',
          out_price: '87.50',
          time2: '2022/9/5',
          person: 'czc'
        },
        {
          id: '1005',
          time1: '2019-7-23 11:00',
          guige: '1kg',
          name: '木香',
          company: '史塔克公司',
          number: '3',
          unit: 'kg',
          unit_price: '70.00',
          in_price: '210.00',
          out_price: '87.50',
          time2: '',
          person: 'czc'
        },
        {
          id: '1006',
          time1: '2019-7-23 11:00',
          guige: '1kg',
          name: '木香',
          company: '史塔克公司',
          number: '3',
          unit: 'kg',
          unit_price: '70.00',
          in_price: '210.00',
          out_price: '87.50',
          time2: '2022/8/30',
          person: 'czc'
        }
      ]
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    searchByName () {
      this.tableData = this.tableData.filter(item => {
        if (item.stuname === this.searchName) {
          return item
        }
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.$Message.success('操作成功')
      } else {
        this.desserts.push(this.editedItem)
        this.$Message.success('操作成功')
      }
      this.close()
    }

  }
}
</script>
<style>

</style>
