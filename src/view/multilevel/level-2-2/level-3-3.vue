<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>检查项目定价表</v-toolbar-title>
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
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">添加</v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="检查项目代号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.calories" label="名称"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="价格"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="单位"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.protein" label="类型"></v-text-field>
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
          text: '检查项目代号',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '名称', value: 'calories' },
        { text: '价格', value: 'fat' },
        { text: '单位 ', value: 'carbs' },
        { text: '类型', value: 'protein' },
        { text: '操作', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: ''
      },
      defaultItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '添加' : 'Edit Item'
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
            name: '0002',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0003',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0004',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0005',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0006',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0007',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0008',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
          },
          {
            name: '0009',
            calories: '常规检查',
            fat: '78',
            carbs: '检验科',
            protein: '1'
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
