<template>
  <el-form ref="form" :model="form" label-width="180px" size="small">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="业务申请人姓名">
          <el-input v-model="form.user" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请人职务">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="申请人联系电话">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户经理姓名">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="客户经理联系电话">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      options: []
    }
  }
}
</script>

<style>

</style>
