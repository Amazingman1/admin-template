<template>
  <div class="app-container">
    <DataList
      ref="datalist"
      :filters="filterList"
      :is-show-all="isShowAll"
      :is-hedden="isHedden"
      :total="total"
      :other-func="otherFunc"
      @data-showAll="filterShowAll"
      @data-refresh="handleRefresh"
    >
      <el-table
        v-loading="listLoading"
        :data="listData"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="操作" width="260" align="left">
          <template slot-scope="scope">
            <el-button size="medium" type="text" @click="handleEdit(scope.row),dialog.modify = true">修改</el-button>
            <el-button size="medium" type="text" @click="handleDetail(scope.row),dialog.module = true">设置权限</el-button>
            <el-button size="medium" type="text" @click="handleDelete(scope.row),dialog.list = true">用户列表</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="150" />
        <el-table-column prop="description" label="角色描述" min-width="150" />
        <el-table-column prop="roleStatus" label="状态" min-width="150" />
        <el-table-column prop="createdBy" label="创建人" min-width="150" />
        <el-table-column prop="createdAt" label="创建时间" min-width="150" />
        <el-table-column prop="updatedBy" label="更新人" min-width="150" />
        <el-table-column prop="updatedAt" label="更新时间" min-width="150" />
      </el-table>
    </DataList>
    <!-- 角色修改 -->
    <el-dialog
      :title="roleObj?'修改角色':'新增角色'"
      :center="true"
      :visible.sync="dialog.modify"
      width="600px"
    >
      <modify-role
        ref="modify-role"
        :role-data="roleObj"
        @close="dialog.modify = false"
      />
    </el-dialog>
    <!-- 权限设置 -->
    <el-dialog
      title="角色模块权限"
      :center="true"
      :visible.sync="dialog.module"
      width="1200px"
    >
      <module-permission
        ref="module-permission"
        @close="dialog.module = false"
      />
    </el-dialog>
    <!-- 用户列表 -->
    <el-dialog
      title="用户列表"
      :center="true"
      :visible.sync="dialog.list"
      width="900px"
    >
      <!-- <modify-role
        ref="modify-role"
        :role-data="roleObj"
        @close="dialog.modify = false"
        @refreshList="refreshData"
      /> -->
    </el-dialog>
  </div>
</template>

<script>
import DataList from '@/components/datalist/DataList'
import ModifyRole from '@/components/system-manage/role-mangae/modify-role'
import ModulePermission from '@/components/system-manage/role-mangae/module-permission'
// import UserList from '@/components/system-manage/role-mangae/user-list'
export default {
  components: {
    DataList,
    ModifyRole,
    ModulePermission
    // UserList
  },
  data() {
    return {
      isShowAll: false,
      isHedden: false,
      listLoading: false,
      dialog: {
        modify: false,
        module: false,
        list: false
      },
      roleObj: false,
      otherFunc: [{ text: '+ 新增角色', func: this.openDialog }],
      total: 1,
      listData: [{
        roleName: '管理元',
        description: '测试管理元',
        roleStatus: 1,
        createdBy: '部门经理',
        createdAt: '2021-04-30',
        updatedBy: '项目经理',
        updatedAt: '2021-05-01'
      }],
      filterList: [
        {
          label: '角色名称',
          type: 'input',
          field: 'roleName',
          size: 'small'
        },
        {
          label: '角色状态',
          type: 'select',
          field: 'roleStatus',
          size: 'small',
          options: [
            { label: '启用', value: '0' },
            { label: '停用', value: '1' },
            { label: '冻结', value: '2' }
          ]
        }
      ]
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

<style>

</style>
