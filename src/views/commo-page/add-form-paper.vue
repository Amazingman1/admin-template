<template>
  <div class="app-container">
    <div style="background:#fff;padding: 10px">
      <div>创建报件表单</div>

      <div class="form-content">
        <NewForm />
        <el-table
          v-loading="listLoading"
          :data="listData"
          highlight-current-row
          border
          style="width: 100%;"
        >
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="roleName" label="申请人姓名" min-width="150" />
          <el-table-column prop="description" label="申请人手机号" min-width="150" />
          <el-table-column prop="roleStatus" label="申请人身份证号码" min-width="150" />
          <el-table-column prop="createdBy" label="月返红包(元）" min-width="150" />
          <el-table-column prop="createdAt" label="授信使用额度(元)" min-width="150" />
          <el-table-column prop="updatedBy" label="分期期数" min-width="150" />
          <el-table-column prop="updatedAt" label="备注" min-width="150" />
        </el-table>
      </div>
      <div class="operate-buttons mb20">
        <el-button type="primary" size="small">退出编辑</el-button>
        <el-button type="primary" size="small">打印表单</el-button>
        <el-button type="primary" size="small" @click="next">下一步</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import NewForm from './components/newForm'
export default {
  components: {
    NewForm
  },
  data() {
    return {
      checked: true,
      listLoading: false,
      form: {},
      options: [],
      listData: [{
        roleName: '管理元',
        description: '测试管理元',
        roleStatus: 1,
        createdBy: '部门经理',
        createdAt: '2021-04-30',
        updatedBy: '项目经理',
        updatedAt: '2021-05-01'
      }]
    }
  },
  methods: {
    next() {
      // this.$router.push({ path: '/add-news-paper/addpaper' })
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
