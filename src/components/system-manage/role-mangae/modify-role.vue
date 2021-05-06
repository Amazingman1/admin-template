<template>
  <!--角色管理-新增/修改角色-->
  <section class="component modify-role">
    <el-form ref="form" :model="addModel" :rules="rules" label-width="90px" class="tableInput">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addModel.roleName" :maxlength="20" style="width: 80%" />
      </el-form-item>
      <!-- <el-form-item v-show="isSupperAdmin" label="公司名称" prop="companyCode">
        <el-select v-model="addModel.companyCode" size="small" :disabled="!isSupperAdmin" style="width: 80%">
          <el-option v-for="item in companyList" :key="item.companyCode" :label="item.companyName" :value="item.companyCode" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="状态" align="left" prop="roleStatus">
        <el-select v-model="addModel.roleStatus" style="width: 80%">
          <el-option v-for="{index,name,code} in sattusList" :key="index" :label="name" :value="code" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-col :span="24">
          <el-input v-model="addModel.description" type="textarea" :rows="3" :maxlength="500" style="width: 80%" />
        </el-col>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="closeDloag">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    roleData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleStatus: [{ required: true, message: '请选择角状态', trigger: 'change' }],
        description: [{
          max: 500,
          message: '描述不能超过500字符',
          trigger: 'blur'
        }]
      },
      isSupperAdmin: '',
      sattusList: [],
      addModel: {
        roleName: '',
        roleStatus: 'ENABLED',
        description: '',
        companyCode: '',
        id: ''
      }
    }
  },
  methods: {
    closeDloag() {
      this.$emit('close')
    },
    reset() {
      const from = this.$refs['form']
      from.resetFields()
      if (this.roleData) {
        this.addModel.id = this.roleData.id
        this.addModel.roleName = this.roleData.roleName
        this.addModel.roleStatus = this.roleData.roleStatus
        this.addModel.companyCode = this.roleData.companyCode
        this.addModel.description = this.roleData.description
      } else {
        this.addModel.id = ''
      }
    },

    /**
   * 提交验证并并与数据库交互
   */
    commit() {
      const Form = this.$refs['form']
      Form.validate(valid => {
        if (!valid) return
        this.addModel.id ? this.updateRole() : this.addRole()
      })
    },

    /**
   * 新增角色
   */
    addRole() {
      if (!this.isSupperAdmin) {
        this.addModel.companyCode = this.userData.companyCode
      }
      this.RoleService.createRole(this.addModel).subscribe(
        (data) => {
          this.$message.success('新增成功!')
          this.refreshList()
          this.close()
        }
      )
      return true
    },

    /**
   * 修改角色
   */
    updateRole() {
      this.RoleService.updateRole(this.addModel).subscribe(
        (data) => {
          this.$message.success('修改成功!')
          this.refreshList()
          this.close()
        }
      )
      return true
    },
    refreshList() {}
  }
}
</script>

<style lang="scss" scoped>
</style>
