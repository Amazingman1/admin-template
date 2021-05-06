<template>
  <div>
    <el-dialog :title="title" center :visible.sync="addSettle" :close-on-click-modal="false" :show-close="false" width="500px">
      <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" size="small">
        <el-form-item label="机构名称" prop="pass">
          <el-input v-model="ruleForm.pass" />
        </el-form-item>
        <el-form-item label="组织结构类型" prop="checkPass">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="addSettle = false">取消</el-button>
          <el-button type="primary" size="small" @click="resetForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      addSettle: false,
      title: '添加部门'
    }
  },
  methods: {
    show() {
      this.addSettle = true
    },
    submitForm() {},
    resetForm() {}
  }
}
</script>

<style>

</style>
