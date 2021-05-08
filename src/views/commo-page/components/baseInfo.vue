<template>
  <el-form ref="form" :model="form" label-width="180px" size="small">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="企业名称">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="社会统一信用代码">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="所属省份">
          <el-select v-model="form.name" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属城市">
          <el-select v-model="form.name" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="是否返点">
          <el-switch v-model="form.delivery" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否贴息">
          <el-switch v-model="form.delivery" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="员工离职后缴费方案">
          <el-select v-model="form.name" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="延期标识">
          <el-select v-model="form.name" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="预计办理终端类型">
          <el-select v-model="form.name" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="短信关闭标识">
          <el-switch v-model="form.delivery" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="缴费规则">
          <el-radio-group v-model="form.resource">
            <el-radio label="预付" />
            <el-radio label="后付" />
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="缴费对象">
          <el-radio-group v-model="form.resource">
            <el-radio label="个人" />
            <el-radio label="企业" />
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="个人报销证明">
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
