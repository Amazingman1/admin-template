<template>
  <div class="fom-tale">
    <div class="header">
      政企项目申请表
    </div>
    <div class="form-body">
      <div class="form-body-item">
        <div class="item">客户单位申报人/联系人姓名</div>
        <div class="item">【#填充业务申请人姓名#】</div>
      </div>
      <div class="form-body-item">
        <div class="item">企业注册名称</div>
        <div class="item">【#填充企业名称#】</div>
      </div>
      <div class="form-body-item">
        <div class="item">实际办公地址</div>
        <div class="item">【#填充企业经营地址#】</div>
      </div>
    </div>
    <div class="form-body bt">
      <div class="form-body-item">
        <div class="item">申报人/联系人联系方式</div>
        <div class="item">【#填充申请人联系电话#】</div>
      </div>
      <div class="form-body-item">
        <div class="item">申报人/联系人职务</div>
        <div class="item">【#填充申请人职务#】</div>
      </div>
      <div class="form-body-item">
        <div class="item">合约期内员工离职后缴费方案</div>
        <div class="item">【#填充缴费方案#】</div>
      </div>
    </div>
    <div class="form-footer bt">
      <p>特此声明:</p>
      <p>1、本人保证所填写的资料及提供证明文件全部真实有效，保证所填写资料1如有变更及时通知甜橙融资租赁（上海）有限公司及其合作方；同意甜橙融资租赁（上海）有限公司
        向有关单位查证、收集、处理及保留相关资料。</p>
      <p>2、不论通过与否，本单位同意甜橙融资租赁（上海）有限公司及其合作方保留其申请相关提交文件。</p>
      <div class="form-footer-text">
        <div>申报人/联系人签署:</div>
        <div>客户单位企业公章:</div>
        <div>申报日期: <span class="text">年</span><span class="text">月</span><span class="text">日</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$boderColor: #EBEEF5;

.bt{
  border-top: solid 1px $boderColor;
}
.fom-tale{
  .header{
    text-align: center;
    padding: 20px 0;
    border: solid 1px $boderColor ;
  }
  .form-body{
    display: flex;
    .form-body-item{
      display: flex;
      width: 100%;
      .item{
        flex: 1;
        text-align: center;
        padding: 20px 10px;
        border-left: solid 1px $boderColor;
        border-right: solid 1px $boderColor;
      }
    }
  }
  .form-footer{
    padding: 20px 20px 10px 20px;
    border-left: solid 1px $boderColor;
    border-right: solid 1px $boderColor;
    .form-footer-text{
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .text{
        margin-left: 20px;
      }
    }
  }
}
</style>
