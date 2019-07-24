<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>统计制表</v-toolbar-title>
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
        <td class="text-xs-left">{{ props.item.pihao }}</td>
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="text-xs-left">{{ props.item.unit }}</td>
        <td class="text-xs-left">{{ props.item.unit_price }}</td>
        <td class="text-xs-left">{{ props.item.in_price }}</td>
        <td class="text-xs-left">{{ props.item.time2 }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-left">{{ props.item.out_price }}</td>
        <td class="text-xs-left">{{ props.item.person }}</td>
        <td class="text-xs-left">{{ props.item.department }}</td>
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
        text: '出库单号',
        align: 'left',
        sortable: false,
        value: 'id'
      },
      { text: '出库日期', value: 'time1' },
      { text: '规格', value: 'guige' },
      { text: '名称', value: 'name' },
      { text: '批号', value: 'pihao' },
      { text: '数量', value: 'number' },
      { text: '单位', value: 'unit' },
      { text: '进价', value: 'unit_price' },
      { text: '进价金额', value: 'in_price' },
      { text: '有效期', value: 'time2' },
      { text: '零售价', value: 'price' },
      { text: '售价金额', value: 'out_price' },
      { text: '出库人', value: 'person' },
      { text: '出库科室', value: 'department' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      time1: '',
      name: '',
      guige: '',
      pihao: '',
      number: '',
      unit: '',
      unit_price: '',
      in_price: '',
      time2: '',
      price: '',
      out_price: '',
      person: '',
      department: ''
    },
    defaultItem: {
      id: '',
      time1: '',
      name: '',
      guige: '',
      pihao: '',
      number: '',
      unit: '',
      unit_price: '',
      in_price: '',
      time2: '',
      price: '',
      out_price: '',
      person: '',
      department: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '医疗卡信息' : 'Edit Item'
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
          pihao: 'ABC123',
          number: '30',
          unit: '瓶',
          unit_price: '39',
          in_price: '1170',
          time2: '2020/7/31',
          price: '39',
          out_price: '1170',
          person: 'fh',
          department: '西药房'
        },
        {
          id: '1001',
          time1: '2019-7-23 10:50',
          guige: '250ml',
          name: '果糖注射',
          pihao: 'ABC124',
          number: '31',
          unit: '支',
          unit_price: '39.97',
          in_price: '1239.07',
          time2: '2021/7/31',
          price: '39.97',
          out_price: '1239.07',
          person: 'czc',
          department: '西药房'
        },
        {
          id: '1003',
          time1: '2019-7-23 11:00',
          guige: '250ml',
          name: '果糖注射',
          pihao: 'ABC124',
          number: '29',
          unit: '支',
          unit_price: '39.97',
          in_price: '1159.13',
          time2: '2021/7/31',
          price: '39.97',
          out_price: '1159.13',
          person: 'czc',
          department: '西药房'
        },
        {
          id: '1004',
          time1: '2019-7-23 12:00',
          guige: '1kg',
          name: '木香',
          pihao: 'ABC124',
          number: '3',
          unit: 'kg',
          unit_price: '70.00',
          in_price: '210.00',
          price: '87.50',
          out_price: '262.50',
          time2: '2022/9/5',
          person: 'czc',
          department: '中药房'
        },
        {
          id: '1005',
          time1: '2019-7-23 12:00',
          guige: '1kg',
          name: '木香',
          pihao: 'ABC125',
          number: '3',
          unit: 'kg',
          unit_price: '70.00',
          in_price: '210.00',
          price: '87.50',
          out_price: '262.50',
          time2: '2022/9/5',
          person: 'czc',
          department: '中药房'
        },
        {
          id: '1006',
          time1: '2019-7-23 12:00',
          guige: '1kg',
          name: '木香',
          pihao: 'ABC126',
          number: '3',
          unit: 'kg',
          unit_price: '70.00',
          in_price: '210.00',
          price: '87.50',
          out_price: '262.50',
          time2: '2022/9/5',
          person: 'czc',
          department: '中药房'
        },
        {
          id: '1007',
          time1: '2019-7-24 11:00',
          guige: '250ml',
          name: '果糖注射',
          pihao: 'ABC129',
          number: '29',
          unit: '支',
          unit_price: '39.97',
          in_price: '1159.13',
          time2: '2021/7/31',
          price: '39.97',
          out_price: '1159.13',
          person: 'czc',
          department: '西药房'
        },
        {
          id: '1008',
          time1: '2019-7-24 12:00',
          guige: '250ml',
          name: '果糖注射',
          pihao: 'ABC130',
          number: '29',
          unit: '支',
          unit_price: '39.97',
          in_price: '1159.13',
          time2: '2021/7/31',
          price: '39.97',
          out_price: '1159.13',
          person: 'czc',
          department: '西药房'
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
    }

  }
}
</script>
<style>

</style>
