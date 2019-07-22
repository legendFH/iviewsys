<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>疾病诊断国际（ICD-9）编码表</v-toolbar-title>
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
        <v-btn color="primary" dark class="mb-2" v-on="on">新增</v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="ICD-9编码"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.calories" label="拼音码"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="疾病分类码"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="疾病名称"></v-text-field>
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
          text: 'ICD-9编码',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '拼音码', value: 'calories' },
        { text: '疾病分类码', value: 'fat' },
        { text: '疾病名称 ', value: 'carbs' },
        { text: '操作', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',

      },
      defaultItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',

      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '登记表' : 'Edit Item'
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
            name: 'kalikeiSDGSFJHSDFIJ',
            calories: 'SSDFSDFK',
            fat: 'DCKDK',
            carbs: '胃病',
          },
          {
            name: 'kalikSDFDSDFeiDSFJHSDFIJ',
            calories: 'SSDFSDSDFFK',
            fat: 'DCKDFSDK',
            carbs: '疟疾',
          },{
            name: 'kASDSalikeiDSFJHSDFIJ',
            calories: 'SASDSDFSDFK',
            fat: 'DCKDFFFFK',
            carbs: '脑炎',
          },{
            name: 'kalikASDASDeiDSFJHSDFIJ',
            calories: 'SSDFSDFASDK',
            fat: 'DCKDKSAD',
            carbs: '智障',
          },{
            name: 'kalikeiASDADSFJHSDFIJ',
            calories: 'SSDFSDFASDK',
            fat: 'DCKDWERWEK',
            carbs: '血管瘤',
          },{
            name: 'kalikeiDASDSFJHSDFIJ',
            calories: 'SSDFSDFAFFFK',
            fat: 'DCKDKQWE',
            carbs: '癌症',
          },{
            name: 'kalikASDeiDSFJHSDFIJ',
            calories: 'SSDFASDSDFK',
            fat: 'DCKDKGGG',
            carbs: '肠炎',
          },{
            name: 'kalikeiGGDSFJHSDFIJ',
            calories: 'SSDFSGGDFK',
            fat: 'DCKDKGG',
            carbs: '颈椎病',
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
