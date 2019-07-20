<template>
  <Card style="width:100%">
    <h1 style="background: white;text-align: center;line-height: 40px;width: 100%">出院病人基本资料登记表</h1>
  <Form :model="formItem" :label-width="80">
    <FormItem label="姓名">
      <Input v-model="formItem.input" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem label="科室">
      <Select v-model="formItem.select">
        <Option value="beijing">骨科</Option>
        <Option value="shanghai">内科</Option>
        <Option value="shenzhen">神经科</Option>
      </Select>
    </FormItem>
    <FormItem label="出入院时间">
      <Row>
        <Col span="11">
          <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
        </Col>
        <Col span="2" style="text-align: center">-</Col>
        <Col span="11">
          <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="性别">
      <RadioGroup v-model="formItem.radio">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="提交报销">
      <i-switch v-model="formItem.switch" size="large">
        <span slot="是">On</span>
        <span slot="否">Off</span>
      </i-switch>
    </FormItem>
    <FormItem label="恢复状况">
      <Slider v-model="formItem.slider" range></Slider>
    </FormItem>
    <FormItem label="备注">
      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem>
      <Button type="primary">提交</Button>
      <Button style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
  </Card>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    }
  }
</script>
