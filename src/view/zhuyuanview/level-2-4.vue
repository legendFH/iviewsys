<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>分户医疗费用日记帐</v-toolbar-title>
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
    <v-dialog v-model="dialog" max-width="500px">
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
                <v-text-field v-model="editedItem.calories" label="日期"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="科目码"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="本日发生数"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.protein" label="出院否"></v-text-field>
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
        { text: '日期', value: 'calories' },
        { text: '科目码', value: 'fat' },
        { text: '本日发生数 ', value: 'carbs' },
        { text: '出院否', value: 'protein' },
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
        return this.editedIndex === -1 ? '床位登记表' : 'Edit Item'
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
            calories: '2019-6-5',
            fat: '1',
            carbs: '0',
            protein: '否'
          },
          {
            name: '0002',
            calories: '2019-6-6',
            fat: '1',
            carbs: '0',
            protein: '否'
          },
          {
            name: '0003',
            calories: '2019-6-9',
            fat: '1',
            carbs: '0',
            protein: '否'
          },
          {
            name: '0004',
            calories: '2019-8-5',
            fat: '1',
            carbs: '0',
            protein: '否'
          },
          {
            name: '0005',
            calories: '2019-2-5',
            fat: '1',
            carbs: '0',
            protein: '否'
          },
          {
            name: '0006',
            calories: '2019-6-4',
            fat: '1',
            carbs: '0',
            protein: '否'
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
