<template>
  <div class="table">
    <Card style="width:100%">
      <h1 style="background: white;text-align: center;line-height: 40px;width: 100%">病案首页</h1>
      <table style="width: 100%">
        <tr>
          <td style="width: 100px"> 病案号</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">第几次入院</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px"> 放射</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">治疗</td>
          <td><Input type="text"></Input></td>
        </tr>
        <tr>
          <td>科别</td>
          <td><Input type="text"></Input></td>
          <td>床号</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px"> 抽血</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">实例病例</td>
          <td><Input type="text"></Input></td>
        </tr>
        <tr>
          <td style="width: 100px"> 主治医师</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">出院否</td>
          <td><Input type="text"></Input></td>
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
          <td style="width: 100px"> 病案号</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">并发症</td>
          <td><Input type="text"></Input></td>
        </tr>
        <tr>
          <td>工作单位</td>
          <td><Input type="text"></Input></td>
          <td>电话</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px">检查</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">中药</td>
          <td><Input type="text"></Input></td>
        </tr>
        <tr>
          <td>籍贯</td>
          <td><Input type="text"></Input></td>
          <td>邮政编码</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px"> 病案号</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">第几次入院</td>
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
          <td style="width: 100px"> 病案号</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">成功次数</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px">抢救次数</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">尸检</td>
          <td><Input type="text"></Input></td>
        </tr>

        <tr>
          <td>个人分担</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px">血型</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">随诊</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px"> 床位</td>
          <td><Input type="text"></Input></td>
          <td style="width: 100px;">西药</td>
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
