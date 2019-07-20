<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>已出院病人资料管理</v-toolbar-title>
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
        <td class="text-xs-left">{{ props.item.calories }}</td>
        <td class="text-xs-left">{{ props.item.fat }}</td>
        <td class="text-xs-left">{{ props.item.carbs }}</td>
        <td class="text-xs-left">{{ props.item.protein }}</td>
        <td class="text-xs-left">{{ props.item.fee }}</td>
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
    <v-dialog v-model="dialog" max-width="500px">
     <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">录入</v-btn>

      </template>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="住院号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.calories" label="入院日期"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="姓名"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="已交金额"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.protein" label="支出金额"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fee" label="是否出院"></v-text-field>
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
          text: '住院号',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '入院日期', value: 'calories' },
        { text: '姓名', value: 'fat' },
        { text: '已交金额 ', value: 'carbs' },
        { text: '支出金额', value: 'protein' },
        { text: '是否出院', value: 'fee' },
        { text: '操作', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        fee:''
      },
      defaultItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        fee:''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '收费登记表' : 'Edit Item'
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
            name: '0001',
            calories: '2019-6-6',
            fat: '罗杰斯',
            carbs: '2000',
            protein: '2400',
            fee:'是'
          },
          {
            name: '0002',
            calories: '2019-8-6',
            fat: '斯嘉丽',
            carbs: '2050',
            protein: '3400',
            fee:'是'
          },
          {
            name: '0003',
            calories: '2018-6-6',
            fat: '洛基',
            carbs: '200',
            protein: '400',
            fee:'是'
          },
          {
            name: '0004',
            calories: '2005-6-6',
            fat: '索尔',
            carbs: '2500',
            protein: '2400',
            fee:'是'
          },
          {
            name: '0005',
            calories: '2019-6-5',
            fat: '浩克',
            carbs: '2200',
            protein: '2400',
            fee:'是'
          },
          {
            name: '0006',
            calories: '2015-6-6',
            fat: '罗杰斯',
            carbs: '2000',
            protein: '2400',
            fee:'是'
          },
          {
            name: '0007',
            calories: '2019-3-6',
            fat: '罗杰斯',
            carbs: '2000',
            protein: '2400',
            fee:'是'
          },
          {
            name: '0008',
            calories: '2015-6-6',
            fat: '罗杰斯',
            carbs: '2000',
            protein: '2400',
            fee:'是'
          },
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
        this.$Message.success('删除成功');
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      searchByName() {
        this.tableData = this.tableData.filter(item => {
          if (item.stuname === this.searchName) {
            return item
          }
        })},

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.$Message.success('操作成功');
        } else {
          this.desserts.push(this.editedItem)
          this.$Message.success('操作成功');
        }
        this.close()
      }

    }
  }
</script>
<style>

</style>
