<template>
  <!--系统设置-委外佣金策略-->
  <section class="page outsource-commission">
    <data-form :model="model" @onSearch="refreshData" autoSearch :page="pageService">
      <template slot="inputs">
        <el-form-item label="策略名称" prop="strategyName">
          <el-input v-model.trim="model.strategyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="佣金类型" prop="commissionStrategyType">
          <el-select v-model="model.commissionStrategyType" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommissionStrategyType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="commonState">
          <el-select v-model="model.commonState" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService">
      <template slot="buttons">
        <el-button @click="dialog.openAddStrategy=true,dialogType = 'ADD', rowData=null">新增</el-button>
      </template>
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-button @click="dialogType='EDIT',rowData=scope.row,dialog.openAddStrategy=true" type="text">编辑</el-button>
            <el-button @click="dialogType='VIEW',rowData=scope.row,dialog.openAddStrategy=true" type="text">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="strategyName" label="佣金策略名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="commissionStrategyType" label="佣金类型" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.commissionStrategyType,'CommissionStrategyType')">
        </el-table-column>
        <el-table-column prop="commonState" label="状态" :formatter="(row) => $filter.dictConvert(row.commonState,'CommonState')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="updateRealName" label="编辑人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间" :formatter="(row) => $filter.dateTimeFormat(row.updateTime)"  :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
      </template>
    </data-box>

    <!--修改/新增委外佣金策略-->
    <el-dialog v-dialogDrag title="委外佣金策略"  @close="dialog.openAddStrategy = false" :visible.sync="dialog.openAddStrategy" :close-on-click-modal="false" :show-close="false" width="1200px" @open="() => this.$nextTick(() => this.$refs['add-strategy'].refresh())">
      <add-strategy ref="add-strategy" @close="dialog.openAddStrategy=false" @refreshData="refreshData" :dialogType="dialogType" :rowData="rowData"></add-strategy>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import AddStrategy from "~/components/system-manage/outsource-commission/add-strategy.vue";
import { State, Getter } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { CommissionStrategyService } from "~/services/domain-service/commission-strategy.service";
import { SortService } from '~/utils/sort.service';

// @Auth(1002)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox, 
    AddStrategy
  }
})
export default class OutSourceCommission extends Vue {
  @Dependencies(CommissionStrategyService) private commissionStrategyService: CommissionStrategyService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;

  // 默认弹框是增加
  private dialogType: string = "ADD"
  // 数据列表
  private dataSet: any[] = [];
  // 当前行数据
  private rowData: any = null
  // 弹框控制
  private dialog: any = {
    openAddStrategy: false,
  };

  private model: any = {
    strategyName: '',
    commissionStrategyType: '',
    commonState: ''
  };
  
  private refreshData() {
    this.commissionStrategyService.getCommissionStrategyList(this.model, this.pageService).subscribe(
      data => this.dataSet = data
    );
  }

  private mounted() {
    this.refreshData();
  }
}
</script>

<style lang="less" >

</style>
