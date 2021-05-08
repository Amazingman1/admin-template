<template>
  <div class="app-container">
    <DataList
      ref="datalist"
      :total="total"
    >
      <el-button size="small" type="primary">新增白名单</el-button>
      <el-button size="small" type="primary">下载白名单模板</el-button>
      <el-button size="small" type="primary">导入白名单数据</el-button>
      <div class="tips">
        <span class="tips-text">温馨提示：小于18岁，大于65岁的客户无法申请办单，请知悉!</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="listData"
        highlight-current-row
        border
        style="width: 100%;"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="操作" width="160" align="left">
          <template slot-scope="scope">
            <el-button size="medium" type="text" @click="handleEdit(scope.row),dialog.modify = true">删 除</el-button>
            <el-button size="medium" type="text" @click="handleDetail(scope.row),dialog.module = true">编 辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="申请人姓名" min-width="150" />
        <el-table-column prop="description" label="申请人手机号" min-width="150" />
        <el-table-column prop="roleStatus" label="申请人身份证号码" min-width="150" />
        <el-table-column prop="createdBy" label="月返红包(元）" min-width="150" />
        <el-table-column prop="createdAt" label="授信使用额度(元)" min-width="150" />
        <el-table-column prop="updatedBy" label="分期期数" min-width="150" />
        <el-table-column prop="updatedAt" label="是否绑卡" min-width="150" />
        <el-table-column prop="updatedAt" label="申请人年龄（周岁）" min-width="150" />
        <el-table-column prop="updatedAt" label="备注" min-width="150" />
      </el-table>
    </DataList>
  </div>
</template>

<script>
import DataList from '@/components/datalist/DataList'

export default {
  components: {
    DataList

  },
  data() {
    return {
      listLoading: false,
      roleObj: false,
      total: 1,
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
    filterShowAll() {
      this.isShowAll = !this.isShowAll
    },
    handleRefresh(filters) {
      // this.getLists(filters)
    },
    openDialog() {
      this.roleObj = null
      this.dialog.modify = true
    },
    handleEdit(row) {
      this.roleObj = row
      // this.dialog.modify = true
    },
    handleDetail() {},
    handleDelete() {}
  }
}
</script>

<style lang="scss" scoped>
.tips{
  padding: 10px 0;
  font-size: 16px;
  .tips-text{
    display: inline-block;
    background-color: #EFFAFE;
    padding: 10px;
    border-radius: 5px;
    border:solid 1px #59B5ef;
  }
}
</style>
