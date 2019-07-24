<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>挂号</v-toolbar-title>
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
        <td class="text-xs-left">{{ props.item.piaoju }}</td>
        <td class="text-xs-left">{{ props.item.leibie }}</td>
        <td class="text-xs-left">{{ props.item.keshi }}</td>
        <td class="text-xs-left">{{ props.item.jiuzhen }}</td>
        <td class="text-xs-left">{{ props.item.doctor }}</td>
        <td class="text-xs-left">{{ props.item.mon }}</td>
        <td class="text-xs-left">{{ props.item.tuifei }}</td>
        <td class="text-xs-left">{{ props.item.time1 }}</td>
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
         <v-btn color="primary" dark class="mb-2" v-on="on">挂号</v-btn>

       </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="就诊号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.calories" label="卡号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="姓名"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="性别"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.protein" label="年龄"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fee" label="电话"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.piaoju" label="票据号"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.leibie" label="挂号类别"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.keshi" label="挂号科室"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.jiuzhen" label="是否就诊"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.doctor" label="门诊医生"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.mon" label="金额"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.tuifei" label="是否退费"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.time1" label="就诊时间"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.person" label="操作员"></v-text-field>
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
          text: '就诊号',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '卡号', value: 'calories' },
        { text: '姓名', value: 'fat' },
        { text: '性别', value: 'carbs' },
        { text: '年龄', value: 'protein' },
        { text: '电话', value: 'fee' },
        { text: '票据号', value: 'piaoju' },
        { text: '挂号类别', value: 'leibie' },
        { text: '挂号科室', value: 'keshi' },
        { text: '是否就诊', value: 'jiuzhen' },
        { text: '门诊医生', value: 'doctor' },
        { text: '金额', value: 'mon' },
        { text: '是否退费', value: 'tuifei' },
        { text: '就诊时间', value: 'time1' },
        { text: '操作员', value: 'person' },




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
        fee:'',
        piaoju:'',
        leibie:'',
        keshi:'',
        jiuzhen:'',
        doctor:'',
        mon:'',
        tuifei:'',
        time1:'',
        person:'',

      },
      defaultItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        fee:'',
        piaoju:'',
        leibie:'',
        keshi:'',
        jiuzhen:'',
        doctor:'',
        mon:'',
        tuifei:'',
        time1:'',
        person:'',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '挂号信息' : 'Edit Item'
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
            name: '20011',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '567',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '879789',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '54678',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '1532',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '20074556',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '200456',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '200212',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '200564',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '2003',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
          },
          {
            name: '20056',
            calories: '54531324156',
            fat: '罗杰斯',
            carbs: '男',
            protein: '24',
            fee:'10086',
            piaoju:'DHFV-522',
            leibie:'急诊室',
            keshi:'急诊',
            jiuzhen:'否',
            doctor:'思维因',
            mon:'11',
            tuifei:'否',
            time1:'2019-6-5',
            person:'约德尔',
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
