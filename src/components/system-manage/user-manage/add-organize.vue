<template>
  <!--添加机构-->
  <div class="component add-organize">
    <el-form ref="addOrg" :rules="addOrganizeRules" :model="addOrgModel" label-width="130px">
      <el-form-item label="机构名称" prop="deptName">
        <el-input v-model="addOrgModel.deptName" size="small" />
      </el-form-item>
      <el-form-item label="组织机构类型" prop="deptType">
        <el-select v-model="addOrgModel.deptType" placeholder="请选择" size="small">
          <el-option v-for="{code,name,index} in departmentType" :key="index" :label="name" :value="code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="isSupperAdmin" label="公司名称" prop="companyCode">
        <el-select v-model="addOrgModel.companyCode" size="small">
          <el-option v-for="(item, index) in companyList" :key="index" :label="item.companyName" :value="item.companyCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="addOrgModel.description" type="textarea" :autosize="{ minRows:2, maxRows:4}" :maxlength="500" />
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row type="flex" justify="center">
          <el-button @click="close()">取消</el-button>
          <el-button @click="addOrganizeCommit">确定</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  props: {
    deptId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      departmentType: [{ name: 'ceshi', code: 1 }],
      companyList: '',
      isSupperAdmin: false,
      addOrgModel: {
        companyCode: '',
        deptField: '123',
        deptName: '',
        deptType: '',
        description: '',
        parentId: '1',
        deptStatus: 'ENABLED'
      },
      addOrganizeRules: {
        deptName: { required: true, message: '请输入机构名称', trigger: 'blur' },
        deptType: { required: true, message: '请选择组织机构', trigger: 'change' },
        companyName: {
          required: true,
          message: '请选择公司名称',
          trigger: 'change'
        }

      }
    }
  },

  methods: {

    /**
   * 关闭窗口
   */
    close() {
      const form = this.$refs['addOrg']
      form.resetFields()
      this.$emit('close')
    },

    refresh(adddata) {
      if (!adddata) {
        return
      }
      this.addOrgModel.parentId = adddata.id
      this.addOrgModel.companyCode = adddata.companyCode
      this.addOrgModel.deptType = adddata.deptType
    },
    /**
   * 添加机构确认
   */
    addOrganizeCommit() {
      const form = this.$refs['addOrg']
      form.validate((valid) => {
        if (valid) {
          this.departmentService.createDepartment(this.addOrgModel).subscribe(
            (data) => {
              this.$message.success('添加机构成功')
              this.$emit('refresh')
              this.close()
            }
          )
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.data-grid {
  margin-bottom: 10px;
}

.header {
  border: solid 1px #dee1e5;
  border-bottom: 0px;
  height: 40px;
  line-height: 40px;
}
</style>
