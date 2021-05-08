<template>
  <div class="app-container">
    <div style="background:#fff;padding: 10px">
      <div>创建报件信息</div>
      <div class="hearder">
        <div>企业信息</div>
        <div>
          <el-checkbox v-model="checked">资料已齐备</el-checkbox>
        </div>
      </div>
      <div class="content">
        <div>基础信息</div>
        <div class="form-content">
          <BaseInfo />
        </div>
        <div>联系人信息</div>
        <div class="form-content">
          <UserInfo />
        </div>
      </div>
      <div class="hearder">
        <div>企业白名单</div>
      </div>
      <div class="form-content">
        <NameList />
      </div>
      <div class="operate-buttons mb20">
        <el-button type="primary" size="small">退出编辑</el-button>
        <el-button type="primary" size="small">保存信息</el-button>
        <el-button type="primary" size="small" @click="next">下一步</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import BaseInfo from './components/baseInfo'
import UserInfo from './components/userInfo'
import NameList from './components/companyWihtNameList'
export default {
  components: {
    BaseInfo,
    UserInfo,
    NameList
  },
  data() {
    return {
      checked: true,
      form: {},
      options: []
    }
  },
  methods: {
    next() {
      this.$router.push({ path: '/add-news-paper/add-form-paper' })
    }
  }
}
</script>

<style lang="scss" scoped>
.hearder{
  display: flex;
  justify-content: space-between;
  border-bottom: solid 2px #ccc;
  padding: 10px;
}
.content{
  padding: 20px;
  .form-content{
    padding: 10px;
  }
}
</style>
