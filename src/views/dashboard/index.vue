<template>
  <div class="app-container">
    <div class="dashboard-container">
      <div class="dashboard-title">快速新建</div>
      <div class="dashboard-contet">
        <div class="tips" @click="goAdd">
          <div class="icon el-icon-school" />
          <div>首次准入企业申请</div>
        </div>
        <div class="tips" @click="goAdd">
          <div class="icon el-icon-school" />
          <div>已加白企业增补人员</div>
        </div>
      </div>
    </div>
    <div class="dash-item">
      <div class="dash-item-con">
        <div class="item-title">数据简报</div>
        <div class="item-con">
          <div class="item-conten">
            <div>政企客户报件数量</div>
            <div>200</div>
          </div>
          <div class="item-conten">
            <div>暂存报件数量</div>
            <div>200</div>
          </div>
          <div class="item-conten">
            <div>退回报件数量</div>
            <div>200</div>
          </div>
          <div class="item-conten">
            <div>审核中报件数量</div>
            <div>200</div>
          </div>
        </div>
      </div>
      <div class="dash-item-con" style="margin-left:20px">
        <div class="item-title">代办事项</div>
        <div class="item-con" style="justify-content:center">待审核报件数量</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  methods: {
    goAdd() {
      this.$router.push({ path: '/add-news-paper/addpaper' })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-title{
  height: 60px;
  line-height: 60px;
}
.dashboard-contet {
  display: flex;
  height: 100px;
  background: #fff;
  align-items: center;
  .tips{
    padding: 10px;
    justify-content: flex-start;
    margin-left: 20px;
    text-align: center;
    // height: 100%;
    :hover{
      cursor:pointer
    }
    .icon{
      font-size: 24px;
    }
  }
}
.dash-item{
  display: flex;
  .item-title{
    height: 60px;
    line-height: 60px;
    background: #f9f9f9;

  }
  .dash-item-con{
    background: #fff;
    min-height: 300px;
    width: 100%;
    .item-con{
      background: #fff;
      display: flex;
      align-items: center;
      height: 100%;
      .item-conten{
        padding: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
