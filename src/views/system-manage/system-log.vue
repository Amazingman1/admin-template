<template>
  <!--系统日志-->
  <div class="pageCss">
  <section class="page system-log">
    <div class="contentCss c-margin">
    <data-form :model="systemLogModel" @onSearch="refreshData" :page="pageService">
      <!--输入区域-->
      <template slot="inputs">
        <el-form-item label="操作人" prop="userRealName">
          <el-input v-model="systemLogModel.userRealName"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" prop="operatorTime">
         <el-date-picker type="daterange" :editable="false" v-model="systemLogModel.operatorTime" placeholder="选择日期时间" clearable style="width: 200px!important;height: 40px!important;line-height: 40px;
">
          </el-date-picker>
        </el-form-item>
      </template>
    </data-form>
    </div>
    <!--数据列区域-->
    <div class="contentCss c-margin">
    <data-box :data="systemLogDataSet"  :page="pageService" @onPageChange="refreshData">
      <template slot="columns">
        <el-table-column prop="remark" label="描述" :min-width="$helper.getColumnWidth(12)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorRealName" label="操作人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="createdAt" label="操作时间" :formatter="(row) => $filter.dateTimeFormat(row.createdAt)" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="exeTime" label="请求执行时长(毫秒)" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="exeMethod" label="执行方法" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
      </template>
      <!--按钮区域-->
    </data-box>
    </div>
  </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { SystemLogService } from "~/services/management-service/system-log.service";
import { PageService } from "~/utils/page.service";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import { State, Getter } from "vuex-class";

// @Auth(16)
@Layout("workspace")
@Component({
  components: {
    DataBox,
    DataForm
  }
})
export default class SystemLog extends Vue {
  @Dependencies(SystemLogService) private systemLogService: SystemLogService;
  @Dependencies(PageService) private pageService: PageService;
  private systemLogModel: any = {
    userRealName: "",
    operatorTime: []
  };
  private systemLogDataSet: any = [];

  public refreshData() {
    console.log(this.systemLogModel, 9999);

    this.systemLogService
      .getAllSystemLogs(this.systemLogModel, this.pageService)
      .subscribe(
        data => {
          this.systemLogDataSet = data;
        }
      );
  }
  private mounted() {
    this.refreshData();
    
  }
}
</script>


<style lang="less">

.block {
  .el-range-separator {
    line-height: 15px !important;
  }
}
</style>

