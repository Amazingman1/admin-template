<template>
  <!--机构与用户管理-->
  <div class="pageCss ">
    <section class="page user-manage">
      <div class="contentCss c-margin">
        <div class="row">
          <div class="col-span-2 org-tree">
            <div class="add-org">
              <el-button size="small" @click="onAdd">添加机构</el-button>
            </div>
            <data-tree ref="orgTree" :props="{title:'deptName'}" show-edit :data="departmentData" @edit="onEdit" @add="onAdd" @delete="onDelete" @select-change="onChange" />
          </div>
          <div class="col-span-10">
            <!-- <data-form :model="userModel" @onSearch="refreshData">
              <template slot="inputs">
                <el-form-item label="姓名" prop="realName">
                  <el-input v-model="userModel.realName" />
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="userModel.userName" />
                </el-form-item>
                <el-form-item label="状态" prop="userStatus">
                  <el-select v-model="userModel.userStatus" size="small" clearable="">
                    <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code" />
                  </el-select>
                </el-form-item>
              </template>
            </data-form> -->
            <!-- <data-box ref="data-box" :data="userDataSet" :selection-list.sync="selectionList" @onPageChange="refreshData">
              <template slot="buttons">
                <el-button size="small" @click="addUserClick">新增用户</el-button>
                <el-button size="small" @click="batchRoleClick">批量分配角色</el-button>
              </template>
              <template slot="columns">
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="dialog.modify=true,userObj=scope.row">修改用户</el-button>
                    <el-button type="text" @click="dialog.roleAllot=true,userObj=scope.row">分配角色</el-button>
                    <el-button type="text" size="small" @click="resetClick(scope)">重置密码</el-button>
                    <el-button v-if="scope.row.userStatus==='DISABLED'||scope.row.userStatus==='FREEZE'" type="text" size="small" @click="EnablingUser(scope.row.id)">启用
                    </el-button>
                    <el-button v-if="scope.row.userStatus==='ENABLED'" type="text" size="small" @click="EnablingUser(scope.row.id)">停用
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="realName" label="姓名" show-overflow-tooltip />
                <el-table-column prop="userName" label="用户名" show-overflow-tooltip />
                <el-table-column prop="deptName" label="机构" show-overflow-tooltip />
                <el-table-column prop="deptType" label="机构类型" :formatter="(row) => $filter.dictConvert(row.deptType,'DepartmentType')" />
                <el-table-column prop="userStatus" label="状态" :formatter="(row) => $filter.dictConvert(row.userStatus,'CommonState')" :min-width="$helper.getColumnWidth(2)" />
                <el-table-column prop="phone" label="电话" show-overflow-tooltip />
                <el-table-column prop="userEmail" label="邮箱" show-overflow-tooltip />
                <el-table-column prop="createdBy" label="创建人" show-overflow-tooltip />
                <el-table-column prop="createdAt" label="创建时间" :formatter="(row) => $filter.dateTimeFormat(row.createdAt)" show-overflow-tooltip />
              </template>
            </data-box> -->
          </div>
        </div>
        <!--批量分配角色-->
        <!-- <el-dialog v-dialogDrag title="批量分配角色" :center="true" :visible.sync="dialog.batchRole" width="40%" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['batch-allot-role'].refresh())">
          <batch-allot-role ref="batch-allot-role" :company-code="companyCode" :user-list="selectionList" @refreshList="refreshData" @close="dialog.batchRole = false" />
        </el-dialog> -->
        <!--分配角色-->
        <!-- <el-dialog v-dialogDrag title="分配角色" :center="true" :visible.sync="dialog.roleAllot" width="40%" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['allot-role'].refreshData())">
          <allot-role ref="allot-role" :company-code="companyCode" :user="userObj" @refreshList="refreshData" @close="dialog.roleAllot = false" />
        </el-dialog> -->
        <!--修改用户-->
        <!-- <el-dialog v-dialogDrag title="修改用户" :center="true" :visible.sync="dialog.modify" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['modify-user'].refresh(userObj))">
          <modify-user ref="modify-user" :user="userObj" :dept-id="deptId" @refreshList="refreshData" @close="dialog.modify = false" @refresh="refreshData" />
        </el-dialog> -->
        <!--新增用户-->
        <!-- <el-dialog v-dialogDrag title="新增用户" width="1000px" :visible.sync="dialog.addUser" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @open="getdeptId" @close="dialog.addUser = false">
          <add-user ref="dept" :dept-id="deptId" :password="userObj.password" @close="dialog.addUser=false" @refresh="refreshData" />
        </el-dialog> -->
        <!--添加机构-->
        <el-dialog title="添加机构" :visible.sync="dialog.addOrganizeFlag" width="450px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @open="dialogOpen" @close="dialog.addOrganizeFlag = false">
          <add-organize ref="add-dept" :dept-id="deptId" @close="dialog.addOrganizeFlag=false" @refresh="getDepartmentList()" />
        </el-dialog>
        <!--修改机构-->
        <!-- <el-dialog v-dialogDrag title="修改机构" :visible.sync="dialog.editOrganizeFlag" width="450px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @open="getOragnize" @close="dialog.editOrganizeFlag = false">
          <modify-organize ref="edit" :edit-data="editdata" @refresh="getDepartmentList()" @close="dialog.editOrganizeFlag=false" />
        </el-dialog> -->

        <!--        删除机构-->
        <!-- <el-dialog :visible.sync="delDialogVisible" title="" width="30%" class="dialogPadding" :before-close="handleClose">
          <div class="dialogPadding-p">
            <i class="el-icon-warning" style="color: #E0A13D;margin-right: 5px" />
            <p>此操作将永久删除该文件, 是否继续?</p>

          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button @click="resDel">确 定</el-button>
          </span>
        </el-dialog> -->
      </div>
    </section>

  </div>
</template>

<script>
// import { DepartmentService } from "~/services/management-service/department.service";
// import { UserService } from "~/services/management-service/user.service";
// import { LoginService } from "~/services/management-service/login.service";
// import DataForm from "~/components/common/data-form.vue";
// import DataBox from "~/components/common/data-box.vue";
// import BatchAllotRole from "~/components/system-manage/user-manage/batch-allot-role.vue";
// import AllotRole from "~/components/system-manage/user-manage/allot-role.vue";
// import FacilityManage from "~/components/system-manage/user-manage/facility-manage.vue";
// import DepartmentTree from "~/components/system-manage/department-tree.vue";
// import ModifyUser from "~/components/system-manage/user-manage/modify-user.vue";
// import AddUser from "~/components/system-manage/user-manage/add-user.vue"; // 新增用户
import AddOrganize from '@/components/system-manage/user-manage/add-organize'
// import ModifyOrganize from "~/components/system-manage/user-manage/modify-organize.vue";
// import BatchCollectorLevel from "~/components/system-manage/user-manage/batch-collector-level.vue";
// import BatchFacility from "~/components/system-manage/user-manage/batch-facility.vue";
import DataTree from '@/components/common/data-tree.vue'

export default {
  components: {
    // ModifyUser,
    // DepartmentTree,
    // FacilityManage,
    // AllotRole,
    // BatchAllotRole,
    // DataForm,
    // DataBox,
    // AddUser,
    AddOrganize,
    // ModifyOrganize,
    // BatchCollectorLevel,
    // BatchFacility,
    DataTree
  },
  data() {
    return {
      departmentData: [{
        id: 1,
        pid: -1,
        title: 'Level one 1',
        children: [{
          id: 4,
          pid: 1,
          title: 'Level two 1-1',
          children: [{
            id: 9,
            pid: 4,
            title: 'Level three 1-1-1'
          }, {
            id: 10,
            pid: 4,
            title: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        pid: -1,
        title: 'Level one 2',
        children: [{
          id: 5,
          pid: 2,
          title: 'Level two 2-1'
        }, {
          id: 6,
          pid: 2,
          title: 'Level two 2-2'
        }]
      }, {
        id: 3,
        pid: -1,
        title: 'Level one 3',
        children: [{
          id: 7,
          pid: 3,
          title: 'Level two 3-1'
        }, {
          id: 8,
          pid: 3,
          title: 'Level two 3-2'
        }]
      }],
      isRouterAlive: true,
      userDataSet: [],
      userModel: {
        userName: '',
        realName: '',
        userStatus: '',
        deptCode: ''
      },
      userObj: {},
      companyCode: '',
      deptId: '1',

      dialog: {
        modify: false,
        batchRole: false,
        roleAllot: false,
        facility: false,
        batchFacility: false,
        addUser: false,
        editOrganizeFlag: false,
        addOrganizeFlag: false,
        batchLevel: false,
        editdata: {},
        selectionList: [],
        userList: [],
        status: 0,
        dept: '',
        defaultParams: {
          deptCode: ''
        },
        pid: '',
        deptCode: '',
        openModel: {
          userIds: [],
          caseSwitch: ''
        },
        delDialogVisible: false,
        delList: ''
      }
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    provide() {
      return {
        reload: this.reload
      }
    },

    refresh(formName) {
      this.$nextTick(() => {
        const form = this.$refs[formName]
        form.refresh()
      })
    },
    handleClose() {
      this.delDialogVisible = false
    },
    // 确认删除
    resDel() {
      this.departmentService
        .deleteDepartment([this.delList])
        .subscribe((data) => {
          this.getDepartmentList()
          this.$message.success('删除成功!')
          this.delDialogVisible = false
        })
    },
    /**
  * 修改机构open事件(获取机构)
   */
    getOragnize() {
      this.$nextTick(() => {
        const edit = this.$refs['edit']
        edit.refresh()
      })
    },

    /**
,   * 新增用户点击事件
   */
    addUserClick() {
      if (!this.dept) {
        this.$message.info('请先选择部门')
        return
      }
      this.dialog.addUser = true
    },

    EnablingUser(id) {
      this.userService
        .modifyUserEnable({
          userId: id
        })
        .subscribe((data) => {
          this.$message.success('操作成功')
          this.refreshData()
        })
    },

    /**
,   * 新增用户open事件
   */
    getdeptId() {
      this.$nextTick(() => {
        const dept = this.$refs['dept']
        dept.refresh(this.dept)
      })
    },

    dialogOpen() {
      this.$nextTick(() => {
        const addUser = this.$refs['add-dept']
        if (this.dept) {
          addUser.refresh(this.dept)
        } else {
          const dataTree = this.departmentData.find((v) => v.companyCode)
          addUser.refresh(dataTree)
        }
      })
    },

    /**
,   * 重置密码
   */
    resetClick(scope) {
      this.$confirm(`您确定要对用户${scope.row.userName}重置密码吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.userService
            .modifyUserPassword({
              userId: scope.row.id
            })
            .subscribe((data) => {
              this.$message.success('重置密码成功')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },

    /**
   * 批量分配角色
   */
    batchRoleClick() {
      if (this.selectionList.length === 0) {
        this.$alert('请选择要分配角色的用户', '提示', {
          confirmButtonText: '确定'
        })
      } else {
      // this.reload()
        this.dialog.batchRole = true
      }
    },

    /**
  * 批量设备管理
   */
    batchDeviceManage() {
      if (this.selectionList.length === 0) {
        this.$message('请选择要操作的用户')
      } else {
        this.dialog.batchFacility = true
      }
    },

    /**
  * 批量开启分案
   */
    batchOpenClick() {
      if (this.selectionList.length === 0) {
        this.$alert('请选择要批量开启分案的用户', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.openModel.userIds = this.selectionList.map((v) => v.id)
        this.openModel.caseSwitch = 'ENABLED'
        this.userService.batchCaseSwitch(this.openModel).subscribe((data) => {
          this.$message.success('开启成功!')
          this.refreshData()
        })
      }
    },

    /**
  * 批量关闭分案
   */
    batchCloseClick() {
      if (this.selectionList.length === 0) {
        this.$alert('请选择要批量关闭分案的用户', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.openModel.userIds = this.selectionList.map((v) => v.id)
        this.openModel.caseSwitch = 'DISABLED'
        this.userService.batchCaseSwitch(this.openModel).subscribe((data) => {
          this.$message.success('关闭成功!')
          this.refreshData()
        })
      }
    },

    /**
  * 批量更改催收员等级
   */
    batchLevelClick() {
      if (this.selectionList.length === 0) {
        this.$alert('请选择要批量修改调查员等级的用户', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.dialog.batchLevel = true
      }
    },

    refreshData() {
      if (!this.userModel.deptCode) {
        const dataTree = this.departmentData.find((v) => v.deptCode)
        this.userModel.deptCode = dataTree.deptCode
      }
      // this.userService
      //   .getAllUsers(this.userModel, this.pageService)
      //   .subscribe((data) => {
      //     console.log(data)
      //     this.userDataSet = data
      //     this.companyCode = data[0] ? data[0].companyCode : ''
      //   })
    },

    /**
  * 点击获取机构id
   */
    onChange(value) {
      this.userModel.deptCode = value.deptCode
      this.deptId = value.id
      this.dept = value
      this.refreshData()
    },

    onEdit(value) {
      this.dialog.editOrganizeFlag = true
      this.editdata = value
    },

    onAdd(value) {
      this.userModel.deptCode = value.deptCode
      this.dialog.addOrganizeFlag = true
    },

    /**
,   * 移除机构
   */
    onDelete(value) {
      this.delDialogVisible = true
      this.delList = value.id
    },

    clearData() {
      this.selectionList.length = 0
      this.dept = ''
      this.userObj = {}
    },

    mounted() {
      this.getDepartmentList()
      this.getCompanyList()
      this.refreshData()
    }
  }
}
</script>
<style>
.dialogPadding .el-dialog__body {
  padding: 0 20px !important;
}
.dialogPadding .el-dialog__header {
  text-align: left;
}
.dialogPadding {
  margin-top: 100px;
}
</style>

<style lang="scss" scoped>
.page.user-manage {
  .el-dialog__body {
    padding: 0 20px !important;
  }

  .col-span-2 {
    padding: 0;
  }

  .add-org {
    padding: 10px 20px;
    text-align: right;
    border-bottom: solid 1px #e4e4e4;
  }

  .org-tree {
    border: solid 1px #e4e4e4;
    min-height: 600px;
  }

  .dialogPadding {
    .dialogPadding-p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 15px;
    }
  }
}
</style>
