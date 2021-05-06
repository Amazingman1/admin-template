<template>
  <!--待分配案件管理-->
  <section class="page outsource-settle">
    <data-form :model="queryModel"  @onSearch="refreshData" autoSearch>
      <!--输入区域-->
      <template slot="inputs">
        <el-form-item label="策略名称" prop="strategyName" clearable>
          <el-input v-model="queryModel.strategyName" ></el-input>
        </el-form-item>
        <el-form-item label="受托方" prop="outsourceId">
          <el-select v-model="queryModel.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="item in outSourceList" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="commonState">
          <el-select v-model="queryModel.commonState" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService">
      <template slot="buttons">
        <el-button @click="dialog.addSettle=true, dialog.type='ADD'">新增</el-button>
      </template>
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(2)">
          <template slot-scope="scope">
            <el-button @click="dialog.addSettle=true, dialog.type='EDIT', rowData=scope.row" type="text">编辑</el-button>
            <el-button @click="dialog.addSettle=true, dialog.type='VIEW', rowData=scope.row" type="text">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="strategyName" label="策略名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="outsourceName" label="受托方" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="commonState" label="状态" :formatter="(row) => $filter.dictConvert(row.commonState,'CommonState')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dateTimeFormat(row.createTime)">
        </el-table-column>
        <el-table-column prop="updateRealName" label="编辑人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dateTimeFormat(row.updateTime)">
        </el-table-column>
      </template>
    </data-box>

    <!--新增/修改/查看策略-->
    <el-dialog v-dialogDrag :title="title" center @close="dialog.addSettle = false" :visible.sync="dialog.addSettle" :close-on-click-modal="false" :show-close="false" width="500px" @open="() => this.$nextTick(()=>this.$refs['add-settle'].refresh())">
      <add-settle @close="dialog.addSettle=false" @refreshData="refreshData" ref="add-settle" :dialogType="dialog.type" :commissionSet="commissionSet" :rowData="rowData"></add-settle>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import NumberRange from "~/components/common/number-range.vue";
import AddSettle from "~/components/system-manage/outsource-settle/add-settle.vue";
import { State, Getter } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { SystemParamService } from "~/services/management-service/system-param.service";
import { OutsourceSettleService } from "~/services/management-service/outsource-settle.service";
import { PrincipalService } from "~/services/domain-service/principal.service";
import { OutsourceSettleManageService } from "~/services/domain-service/outsource-settle-manage.service";
import { CommissionStrategyService } from "~/services/domain-service/commission-strategy.service";

// @Auth(1002)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    AddSettle
  }
})
export default class OutSourceSettle extends Vue {
  @Dependencies(SystemParamService) private sysParamService: SystemParamService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(OutsourceSettleService) private outsourceSettleService: OutsourceSettleService;
  @Dependencies(PrincipalService) private PrincipalService: PrincipalService;
  @Dependencies(OutsourceSettleManageService)
  private outsourceSettleManageService: OutsourceSettleManageService; 
  @Dependencies(CommissionStrategyService)
  private commissionStrategyService: CommissionStrategyService;
  @State private outSourceList;

  // dialog信息
  private dialog: any = {
    addSettle: false,
    type: "ADD",
    buttonType: new Map([["ADD", "新增委外结算策略"],["EDIT", "编辑委外结算策略"],["VIEW", "查看委外结算策略"]])
  };

  private queryModel: any = {
    strategyName: '',
    outsourceId: '',
    commonState: '',
  };
  // 数据列表
  private dataSet: any[] = []
  // 选中数据
  private rowData: any[] = []
  // 佣金策略
  private commissionSet: any[] = []

  private mounted() {
    this.refreshData()
    this.getCommissionName()
  }

  private get title() {
    return this.dialog.buttonType.get(this.dialog.type)
  }

  private refreshData() {
    this.outsourceSettleService.getSettlementStrategyPageList(this.queryModel, this.pageService).subscribe(
      data => this.dataSet = data
    );
  }

  /**
   * 获取佣金策略
   */
  private getCommissionName() {
    this.commissionStrategyService.selectCommissionStrategyList().subscribe(
      data => this.commissionSet = data
    )
  }

}
</script>

<style lang="less" scoped>

</style>
