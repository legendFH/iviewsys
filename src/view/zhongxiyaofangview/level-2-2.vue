<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>出库管理</v-toolbar-title>
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
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.department}}</td>
        <td class="text-xs-left">{{ props.item.money }}</td>
        <td class="text-xs-left">{{ props.item.time2 }}</td>
        <td class="text-xs-left">{{ props.item.person }}</td>
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
        <v-btn color="primary" dark class="mb-2" v-on="on">出库</v-btn>

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
                <v-text-field v-model="editedItem.time1" label="出库时间"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.id" label="单据号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.department" label="科室"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.money" label="金额"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.time2" label="记账时间"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.person" label="记账人"></v-text-field>
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
        text: '序号',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: '出库时间', value: 'time1' },
      { text: '单据号', value: 'id' },
      { text: '科室', value: 'department' },
      { text: '金额(元)', value: 'money' },
      { text: '记账时间', value: 'time2' },
      { text: '记账人', value: 'person' },
      { text: '操作', value: 'name', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      time1: '',
      id: '',
      department: '',
      money: '',
      time2: '',
      person: ''
    },
    defaultItem: {
      name: '',
      time1: '',
      id: '',
      department: '',
      money: '',
      time2: '',
      person: ''
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
          name: '1000',
          time1: '2019-7-22 09:45',
          id: 'A123',
          department: '西药房',
          money: '200',
          time2: '2019-7-22 09:45',
          person: '托尼'
        },
        {
          name: '1001',
          time1: '2019-7-22 09:50',
          id: 'A124',
          department: '西药房',
          money: '2255',
          time2: '2019-7-22 09:50',
          person: '黑寡妇'
        },
        {
          name: '1002',
          time1: '2019-7-22 09:50',
          id: 'A124',
          department: '西药房',
          money: '2255',
          time2: '2019-7-22 09:50',
          person: '黑寡妇'
        },
        {
          name: '1003',
          time1: '2019-7-22 10:20',
          id: 'A125',
          department: '西药房',
          money: '2255',
          time2: '2019-7-22 10:50',
          person: '索尔'
        },
        {
          name: '1003',
          time1: '2019-7-22 10:20',
          id: 'A125',
          department: '中药房',
          money: '2255',
          time2: '2019-7-22 10:50',
          person: '浩克'
        },
        {
          name: '1003',
          time1: '2019-7-22 11:00',
          id: 'A125',
          department: '西药房',
          money: '2255',
          time2: '2019-7-22 11:05',
          person: '队长'
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
