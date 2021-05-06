<template>
  <section class="component commission-range">
    <data-box :data="dataSet" hiddenIndex>
      <template slot="columns">
        <el-table-column prop="overduePeriodStart" label="逾期阶段起" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>M</span>
            <el-input type="number" v-model="dataSet[scope.$index].overduePeriodStart" :min="0" :max="scope.row.overduePeriodEnd" class="start-end" :disabled="propData.isView"></el-input>
            <span>阶段</span>
          </template>
        </el-table-column>
        <el-table-column prop="overduePeriodEnd" label="逾期阶段止" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>M</span>
            <el-input type="number" v-model="dataSet[scope.$index].overduePeriodEnd" :min="scope.row.overduePeriodStart" max="999" class="start-end" :disabled="propData.isView"></el-input>
            <span>阶段</span>
          </template>
        </el-table-column>
        <el-table-column prop="recoverRateStart" label="回收率起(%)" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <el-input type="number" v-model="dataSet[scope.$index].recoverRateStart" :min="0" :max="scope.row.recoverRateEnd" class="start-end" :disabled="propData.isView"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="recoverRateEnd" label="回收率止(%)" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <el-input type="number" v-model="dataSet[scope.$index].recoverRateEnd" :min="scope.row.recoverRateStart" :max="100" class="start-end" :disabled="propData.isView"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="commissionRate" label="佣金比例(%)" v-if="propData.commissionStrategyType === 'RETURN_RATE'">
          <template slot-scope="scope">
            <el-input type="number" v-model="dataSet[scope.$index].commissionRate" :min="0" :max="100" class="start-end" :disabled="propData.isView"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="commissionAmount" label="佣金" v-if="propData.commissionStrategyType === 'NUMBER'">
          <template slot-scope="scope">
            <el-input type="number" v-model="dataSet[scope.$index].commissionAmount" :min="0" :max="999999999" class="start-end" :disabled="propData.isView"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" :min-width="$helper.getColumnWidth(3)" v-if="!propData.isView">
          <template slot-scope="scope">
            <el-button type="text" @click="addDomain">增加</el-button>
            <el-button v-if="scope.$index !== 0" type="text" @click="removeDomain(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop } from 'vue-property-decorator';
import DataBox from "~/components/common/data-box.vue";
import { Promise } from 'core-js';

@Component({
  components: {
    DataBox,
  }
})
export default class CommissionRange extends Vue {

  @Prop() private propData

  // 初始化数据
  private dataSet: any[] = []
  private scopeIndex: number = 0
  // 控制弹框
  private dialog: any = {
    isOpenRecoveryRate: false
  }

  private mounted() {
    if (this.dataSet.length === 0) {
      this.addDomain()
    }
  }

  /**
   * 添加
   */
  private addDomain() {
    const domain: any = {
      productId: '',
      overduePeriodStart: '',
      overduePeriodEnd: '',
      recoverRateStart: '',
      recoverRateEnd: '',
      commissionRate: '',
      commissionAmount: '',
      operate: '',
    }
    this.dataSet.push(domain)
  }

  /**
   * 移除
   */
  private removeDomain(index) {
    this.dataSet.splice(index, 1)
  }

  /**
   * 刷新数据
   */
  private refresh(dataSet?: any[]) {
    this.dataSet.length = 0
    if (!dataSet || dataSet.length === 0) {
      this.addDomain()
    } else {
      this.dataSet.push(...dataSet)
      console.log(this.dataSet, 1111111)
    }
  }

  /**
   * 校验并获取佣金范围数据列的值
   */
  private getDataSet() {
    const dataSet = this.dataSet
    for (let i = 0; i < dataSet.length; i++) {
      const item = dataSet[i]
      if (this.propData.strategyType === 'ENABLED' && !item.productId) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "行产品类型不能为空"
      }
      if (!item.overduePeriodStart && item.overduePeriodStart !== 0) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "行逾期阶段起始值不能为空"
      }
      if (!item.overduePeriodEnd && item.overduePeriodEnd !== 0) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "行逾期阶段结束值不能为空"
      }
      if (!item.recoverRateStart && item.recoverRateStart !== 0) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "行回收率起始值不能为空"
      }
      if (!item.recoverRateEnd && item.recoverRateEnd !== 0) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "行回收率结束值不能为空"
      }
      if (this.propData.commissionStrategyType === 'RETURN_RATE' && !item.commissiomRate && item.commissiomRate !==0) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "佣金比例不能为空"
      }
      if (this.propData.commissionStrategyType === 'NUMBER' && !item.commissionAmount && item.commissionAmount!== 0) return {
        unpass: true, message: "佣金范围第" + (i + 1) + "佣金不能为空"
      }
    }
    return dataSet
  }
}
</script>

<style lang="less" scoped>
  .start-end {
    width: 100px !important;
    margin: auto 5px;
  }

</style>



