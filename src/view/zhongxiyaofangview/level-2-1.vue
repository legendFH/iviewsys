<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>入库管理</v-toolbar-title>
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
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.time1 }}</td>
        <td class="text-xs-left">{{ props.item.department}}</td>
        <td class="text-xs-left">{{ props.item.money }}</td>
        <td class="text-xs-left">{{ props.item.person }}</td>
        <td class="text-xs-left">{{ props.item.flag }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:pageText="props">
        第{{ parseInt(props.pageStop /props.itemsLength) +1}}页，共{{ Math.ceil(props.itemsLength /5)}}页 {{ props.itemsLength }}条数据
        <!--        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}-->
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">入库</v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="单号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.time1" label="入库时间"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.department" label="供应商"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.money" label="金额"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.person" label="记账人"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.flag" label="类型"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  data: () => ({
    searchName: '',
    dialog: false,
    headers: [
      {
        text: '单号',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: '入库时间', value: 'time1' },
      { text: '供应商', value: 'department' },
      { text: '金额(元)', value: 'money' },
      { text: '记账人', value: 'person' },
      { text: '类型', value: 'flag' },
      { text: '操作', value: 'name', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      time1: '',
      department: '',
      money: '',
      person: '',
      flag: ''
    },
    defaultItem: {
      name: '',
      time1: '',
      department: '',
      money: '',
      person: '',
      flag: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '入库信息' : 'Edit Item'
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
          name: '10000',
          time1: '2019-7-22',
          department: 'IBM公司',
          money: '2523',
          person: '弗瑞',
          flag: '正常入库'
        },
        {
          name: '10001',
          time1: '2019-7-22',
          department: '史塔克公司',
          money: '252272',
          person: '托尼',
          flag: '正常入库'
        },
        {
          name: '10002',
          time1: '2019-7-22',
          department: 'IBM公司',
          money: '5272778',
          person: '罗斯福',
          flag: '正常入库'
        },
        {
          name: '10003',
          time1: '2019-7-22',
          department: '史塔克公司',
          money: '5272',
          person: '班纳',
          flag: '正常入库'
        },
        {
          name: '10004',
          time1: '2019-7-22',
          department: '史塔克公司',
          money: '75272',
          person: '索尔',
          flag: '正常入库'
        },
        {
          name: '10005',
          time1: '2019-7-22',
          department: '史塔克公司',
          money: '727',
          person: '浩克',
          flag: '正常入库'
        },
        {
          name: '10006',
          time1: '2019-7-22',
          department: '史塔克公司',
          money: '57572',
          person: '黑寡妇',
          flag: '正常入库'
        },
        {
          name: '10007',
          time1: '2019-7-22',
          department: '史塔克公司',
          money: '456875',
          person: '鹰眼',
          flag: '正常入库'
        },
        {
          name: '10008',
          time1: '2019-7-23',
          department: '史塔克公司',
          money: '758775',
          person: '小蜘蛛',
          flag: '正常入库'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('确认删除?') && this.desserts.splice(index, 1)
      this.$Message.success('删除成功')
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
