<template>
  <section class="component add-strategy">
    <el-form :model="model" :rules="rules" ref="add-strategy" label-width="120px">
      <el-form-item label="佣金策略名称" prop="strategyName">
        <el-input type="input" v-model="model.strategyName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="commonState">
        <el-select v-model="model.commonState" placeholder="请选择" :disabled="isView">
          <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="佣金类型" prop="commissionStrategyType">
        <el-select v-model="model.commissionStrategyType" placeholder="请选择" :disabled="isView">
          <el-option v-for="{index,name,code} in $dict.getDictData('CommissionStrategyType')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="策略设置" prop="strategyType">
        <el-select v-model="model.strategyType" placeholder="请选择"  :disabled="isView">
          <el-option label="区分产品类型" value="ENABLED"></el-option>
          <el-option label="不区分产品类型" value="DISABLED"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="佣金范围">
        <commission-range ref="commission-range" :propData="propData"></commission-range>
      </el-form-item>
    </el-form>

    <div class="operate-buttons">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CompanyService } from '~/services/management-service/company.service';
import { Emit, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import CommissionRange from "~/components/system-manage/outsource-commission/commission-range.vue";
import { CommissionStrategyService } from "~/services/domain-service/commission-strategy.service";
import { Object } from 'core-js';

@Component({
  components: {
    CommissionRange
  },
})
export default class AddStrategy extends Vue {
  @Dependencies(CompanyService)
  private companyService: CompanyService;
  @Dependencies(CommissionStrategyService) private commissionStrategyService: CommissionStrategyService;

  @Prop({required: true, default: 'ADD'})
  private dialogType: string
  @Prop()
  private rowData: any

  
  
  private productTypeSet: any[] = []

  private model: any = {
    strategyName: '',
    commonState: 'ENABLED',
    commissionStrategyType: 'NUMBER',
    strategyType: 'ENABLED',
  }; 

  private rules: any = {
    strategyName: [{ required: true, message: '佣金比例不能为空', trigger: 'blur' }],
    commonState: [{ required: true, message: '请选择状态', trigger: 'change' }],
    commissionStrategyType: [{ required: true, message: '请选择佣金类型', trigger: 'change' }],
    strategyType: [{required: true, message: '请选择策略设置', trigger: 'change'}]
  };

  private get propData() {
    return {
      commissionStrategyType: this.model.commissionStrategyType,
      strategyType: this.model.strategyType,
      productTypeSet: this.productTypeSet,
      isView: this.isView
    }
  }

  @Emit('refreshData')
  private refreshData() { }
  @Emit('close')
  private close() {}

  private mounted() {
    this.selectProductList();
  }

  /**
   * 获取产品类型下拉列表
   */
  private selectProductList() {
    this.commissionStrategyService.selectProductList().subscribe(
      data => this.productTypeSet = data
    )
  }

  /**
   * 确定
   */
  private submit() {
    if (this.dialogType === "VIEW") {
      this.close()
      return
    }
    const form: any = this.$refs["add-strategy"]
    form.validate((valid) => {
      if (!valid) return
      // 校验佣金范围
      const comp: any = this.$refs["commission-range"]
      const compData = comp.getDataSet()
      if(compData.unpass) {
        this.$message.error(compData.message)
        return
      }
      let action: string = ''
      let params: any = null
      if (this.dialogType === "ADD") {
        action = "insertCommissionStrategy"
        params = {...this.model, ...{commissionStrategyDetailModelList: compData}}
      }
      if (this.dialogType === "EDIT") {
        action = "editCommissionStrategy"
        params = {...this.model, ...{commissionStrategyDetailModelList: compData}, ...{id: this.rowData.id}}
      }
      this.commissionStrategyService[action](params).subscribe(
        data => {
          this.refreshData()
          this.close()
          this.$message.success("操作成功")
        }
      )
    })
  }

  /**
   * 取消
   */
  private cancel() {
    const form: any = this.$refs["add-strategy"]
    form.resetFields()
    const comForm: any = this.$refs["commission-range"]
    comForm.refresh()
    this.close()
  }

  /**
   * 弹框打开时初始化页面信息
   */
  private refresh() {
    const comForm: any = this.$refs["commission-range"]
    if (!this.rowData) {
      comForm.refresh()
      return
    } 
    this.model.strategyName = this.rowData.strategyName
    this.model.commonState = this.rowData.commonState
    this.model.commissionStrategyType = this.rowData.commissionStrategyType
    this.commissionStrategyService.getCommissionDetailsById({id: this.rowData.id}).subscribe(
      data => {
        this.model.strategyType = data.find(v => v.productId) ? "ENABLED" : "DISABLED"
        comForm.refresh(data)
      }
    )
  }

  private get isView() {
    return this.dialogType === "VIEW"
  }
}
</script>

<style lang="less" scoped>
</style>
