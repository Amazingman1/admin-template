<template>
  <section class="component add-settle">
    <el-form :rules="rules" :model="model" ref="add-settle" label-width="150px">
      <el-form-item label="策略名称" prop="strategyName">
        <el-input type="input" v-model="model.strategyName" :disabled="isDisable"></el-input>
      </el-form-item>
      <el-form-item label="受托方" prop="outsourceId">
        <el-select v-model="model.outsourceId" placeholder="请选择" clearable :disabled="isDisable">
          <el-option v-for="item in outSourceList" :key="item.id" :label="item.outsName" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="佣金策略" prop="commissionId">
        <el-select v-model="model.commissionId" placeholder="请选择" clearable :disabled="isDisable">
          <el-option v-for="item in commissionSet" :key="item.id" :label="item.strategyName" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="commonState">
        <el-select v-model="model.commonState" placeholder="请选择" clearable :disabled="isDisable">
          <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="0px" align="center">
        <el-button @click="cancle">取消</el-button>
        <el-button @click="commit">确定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Emit, Prop, Watch } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
import { OutsourceSettleService } from "~/services/management-service/outsource-settle.service";

@Component({
  components: {}
})
export default class AddSettle extends Vue {
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;
  @State private outSourceList;

  @Prop({ required: true, type: String }) private dialogType;
  @Prop({ default: []}) private commissionSet;
  @Prop() private rowData;

  private model: any = {
    outsourceId: '',
    outsourceName: '',
    strategyName: '',
    commonState: 'ENABLED',
    commissionName: '',
    commissionId: '',
    id: ''
  };
  private rules: any = {
    outsourceId: [{ required: true, message: "该项不能为空", trigger: "blur" }],
    strategyName: [
      { required: true, message: "该项不能为空", trigger: "blur" }
    ],
    commonState: [{ required: true, message: "该项不能为空", trigger: "blur" }],
    commissionName: [
      { required: true, message: "该项不能为空", trigger: "blur" }
    ],
    strategyId: [{ required: true, message: "该项不能为空", trigger: "change" }]
  };

  @Emit("refreshData")
  private refreshData() {}
  @Emit("close")
  private emitClose() {}

  @Watch("model.outsourceId", {deep: true})
  private outsourceChange(event) {
    const out = this.outSourceList.find(v => v.id === this.model.outsourceId)
    this.model.outsourceName = out ? out.outsName : ''
  }
  @Watch("model.commissionName", {deep: true})
  private commissionChange() {
    const commission = this.commissionSet.find(v => v.id === this.model.commissionId)
    this.model.commissionName = commission ? commission.strategyName : ''
  }

  /**
   * 确认
   */
  private commit() {
    // 查看直接结束
    if (this.dialogType === "VIEW") {
      this.emitClose();
      return
    }
    const form: any = this.$refs['add-settle']
    const action = this.dialogType === "ADD" ? 'addSettlementStrategy' : 'updateSettlementStrategy'
    form.validate(v => {
      if (!v) return
      this.outsourceSettleService[action](this.model).subscribe(
        () => {
          this.$message.success("操作成功!");
          form.resetFields();
          this.refreshData();
          this.emitClose();
        }
      );
    })
  }

  /**
   * 取消
   */
  private cancle() {
    this.emitClose();
  }

  /**
   * 表单重置
   */
  private refresh() {
    if (this.dialogType === "ADD") {
      this.model.outsourceId = ''
      this.model.strategyName = ''
      this.model.commonState = 'ENABLED'
      this.model.commissionId = ''
      this.model.id = ''
    } else {
      this.model.outsourceId = this.rowData.outsourceId
      this.model.strategyName = this.rowData.strategyName
      this.model.commonState = this.rowData.commonState
      this.model.commissionId = this.rowData.commissionId
      this.model.id = this.rowData.id
    }
  }

  /**
   * 是否可编辑
   */
  private get isDisable() {
    return this.dialogType === "VIEW"
  }
}
</script>

<style lang="less" scoped>

</style>
