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
        </div>
        <div>基础信息</div>
        <div class="form-content">
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
        </div>
      </div>
      <div class="hearder">
        <div>企业白名单</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      form: {},
      options: []
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
