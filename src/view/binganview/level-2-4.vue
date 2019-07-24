<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="输入您的姓名"></Input>
    </FormItem>
    <FormItem label="床号" >
      <Input  placeholder="输入您的床号"></Input>
    </FormItem>
    <FormItem label="X光号">
      <Input  placeholder="输入X光号"></Input>
    </FormItem>
    <FormItem label="联系邮箱" prop="mail">
      <Input v-model="formValidate.mail" placeholder="输入邮箱"></Input>
    </FormItem>
    <FormItem label="科别" prop="city">
      <Select v-model="formValidate.city" placeholder="选择科别">
        <Option value="beijing">内科</Option>
        <Option value="shanghai">外科</Option>
        <Option value="shenzhen">神经科</Option>
      </Select>
    </FormItem>
    <FormItem label="入院时间">
      <Row>
        <Col span="11">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="2" style="text-align: center">-</Col>
        <Col span="11">
          <FormItem prop="time">
            <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="入院情况" prop="interest">
      <CheckboxGroup v-model="formValidate.interest">
        <Checkbox label="健康"></Checkbox>
        <Checkbox label="轻微症状"></Checkbox>
        <Checkbox label="一般症状"></Checkbox>
        <Checkbox label="严重症状"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="治疗经过" prop="desc">
      <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          gender: [
            { required: true, message: 'Please select gender', trigger: 'change' }
          ],
          interest: [
            { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
            { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          date: [
            { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
          ],
          time: [
            { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
          ],
          desc: [
            { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
