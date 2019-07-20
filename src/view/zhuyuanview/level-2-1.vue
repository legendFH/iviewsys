<template>
  <div class="table">
    <Card style="width:100%">
    <h1 style="background: white;text-align: center;line-height: 40px;width: 100%">入院病人基本资料登记表</h1>
    <table style="width: 100%">
      <tr>
        <td style="width: 100px"> 卡号</td>
        <td><Input type="text"></Input></td>
        <td style="width: 100px;">住院号</td>
        <td><Input type="text"></Input></td>
        <td style="width: 100px">费别</td>
        <td><select name="" id="">
          <option value="">自费</option>
          <option value="">代缴费</option>
        </select></td>
        <td style="width: 100px">入院日期</td>
        <td><Input type="date"></Input></td>
      </tr>
      <tr>
        <td>科别</td>
        <td><Input type="text"></Input></td>
        <td>床号</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>入院方式</td>
        <td><select name="" id="">
          <option value="">普通入院</option>
          <option value="">转院</option>
        </select></td>
        <td>疾病诊断</td>
        <td><Input type="text"></Input></td>
        <td>ICD-9编码</td>
        <td><Input type="text"></Input></td>

      </tr>

      <tr>
        <td>
          姓名
        </td>
        <td><Input type="text"></Input></td>
        <td>性别</td>
        <td><select name="" id="">
          <option value="">男</option>
          <option value="">女</option>
        </select></td>
        <td>出生日期</td>
        <td><Input type="date"></Input></td>
        <td>婚姻</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>职业</td>
        <td><Input type="text"></Input></td>
        <td>职称</td>
        <td><Input type="text"></Input></td>
        <td>民族</td>
        <td><Input type="text"></Input></td>
        <td>国籍</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>身份证号</td>
        <td><Input type="text"></Input></td>
        <td>其他证件</td>
        <td><Input type="text"></Input></td>
        <td>医疗证号</td>
        <td><Input type="text"></Input></td>
        <td>电话</td>
        <td><Input type="text"></Input></td>
        <td style="width: 100px">家庭电话</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>现住地址</td>
        <td><Input type="text"></Input></td>
        <td>户口地址</td>
        <td><Input type="text"></Input></td>

      </tr>
      <tr>
        <td>工作单位</td>
        <td><Input type="text"></Input></td>
        <td>电话</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>籍贯</td>
        <td><Input type="text"></Input></td>
        <td>邮政编码</td>
        <td><Input type="text"></Input></td>
      </tr>

      <tr>
        <td>联系人</td>
        <td><Input type="text"></Input></td>
        <td>关系</td>
        <td><Input type="text"></Input></td>
        <td>电话</td>
        <td><Input type="text"></Input></td>
        <td>联系人地址</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>出院日期</td>
        <td><Input type="text"></Input></td>
      </tr>

      <tr>
        <td>个人分担</td>
        <td><Input type="text"></Input></td>
      </tr>
      <tr>
        <td>缴费方式</td>
        <td>
          <select name="" id="">
            <option value="">现金</option>
            <option value="">银行卡</option>
          </select>
        </td>
        <td>预交款</td>
        <td><Input type="text"></Input></td>
        <td>卡号</td>
        <td><Input type="text"></Input></td>
      </tr>
    </table>
      <br>

    <div style="background: white;width: 100%;align-self: center;align-items: center;align-content: center;justify-items: center;justify-content: center">
      <Button type="primary" long>提交</Button>
    </div>
    </Card>
  </div>

</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>
<style scoped>
  .table{
    background: white;
    width: 100%;
    font-size: 0.7em;
    margin-left: 30px;
    padding-right: 30px;
  }
  .table tr{
    height: 30px;
  }
  .table tr td{
    width: auto;
    padding-left: 10px;
    text-align:center;
    text-justify:distribute-all-lines;
    text-align-last:justify
  }
</style>
