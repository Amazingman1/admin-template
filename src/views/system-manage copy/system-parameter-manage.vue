<template>
  <!--系统参数管理-->
  <div class="pageCss">

    <!--    <div class="contentCss c-margin">-->


  <section class=" system-parameter-manage">
    <div class="contentCss c-margin">
    <data-form :model="queryModel" @onSearch="refreshData" autoSearch :page="pageService">
      <!--输入区域-->
      <template slot="inputs">
        <el-form-item label="参数名称" prop="paramName">
          <el-input v-model="queryModel.paramName"></el-input>
        </el-form-item>
        <el-form-item label="参数代码" prop="paramCode">
          <el-input v-model="queryModel.paramCode"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="paramValue">
          <el-input v-model="queryModel.paramValue"></el-input>
        </el-form-item>
        <el-form-item label="参数状态" prop="paramStatus">
          <el-select v-model="queryModel.paramStatus" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    </div>
    <div class="contentCss c-margin">
    <data-box  :data="sysParamDataSet" :page="pageService"  @onPageChange="refreshData">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(1)">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyParam(scope)" v-if="scope.row.paramSign === 'ENABLED'">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="paramCode" label="参数代码" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="paramName" label="参数名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="paramValue" label="参数值" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="paramSign" label="参数是否可修改" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.paramSign,'CommonFlag')">
          <template slot-scope="scope">
            <span v-if="scope.row.paramSign === 'ENABLED'">是</span>
            <span v-if="scope.row.paramSign === 'DISABLED'">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="paramStatus" label="参数状态" :formatter="(row) => $filter.dictConvert(row.paramStatus,'CommonState')" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="description" label="说明" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="updatedBy" label="更新人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" :formatter="(row) => $filter.dateTimeFormat(row.updatedAt)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>
    </div>
    <!-- 修改参数 -->
    <el-dialog v-dialogDrag title='修改系统参数' width="500px" :visible.sync="dialog.modifysysparamterDialog" :close-on-click-modal="false" :close-on-press-escape="false" :center="true" >
      <modify-parameter :modifyData="modifyData" ref="modify-parameter" @close="dialog.modifysysparamterDialog=false;refreshData()" @refreshList="refreshData"></modify-parameter>
    </el-dialog>
    <!-- 新增参数 -->
    <el-dialog v-dialogDrag title="新增系统参数" width="500px" :visible.sync="dialog.addsysparamterDialog" :close-on-click-modal="false" :close-on-press-escape="false" :center="true">
      <modify-parameter :modifyData="modifyData" ref="modify-parameter" @close="dialog.addsysparamterDialog=false;refreshData()" @refreshList="refreshData"></modify-parameter>
    </el-dialog>
  </section>
<!--    </div>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { State, Getter } from 'vuex-class';
import { PageService } from '~/utils/page.service';
import { SystemParamService } from '~/services/management-service/system-param.service';
import ModifyParameter from '~/components/system-manage/param-manage/modify-parameter.vue';

// @Auth(15)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    ModifyParameter,
  },
})
export default class SystemParameterManage extends Vue {
  @Dependencies(SystemParamService)
  private sysParamService: SystemParamService;
  @Dependencies(PageService)
  private pageService: PageService;

  private queryModel: any = {
    paramName: '',
    paramCode: '',
    paramValue: '',
    paramStatus: '',
  };
  private sysParamDataSet: any[] = [];
  private dialog: any = {
    modifysysparamterDialog: false,
    addsysparamterDialog:false
  };
  private modifyData: any = {};

  public refreshData() {
    this.sysParamService
      .getSystemParams(this.queryModel, this.pageService)
      .subscribe(
        (data) => {
          this.sysParamDataSet = data;
        }
      );
  }

  private mounted() {
    this.refreshData();
  }

  /**
   * 新增系统参数
   */
  private addParam() {
    this.dialog.addsysparamterDialog = true;
  }

  /**
   * 修改系统参数
   */
  private modifyParam(scope) {
    this.modifyData = scope.row;
    this.dialog.modifysysparamterDialog = true;
  }
}
</script>

<style lang="less">
</style>
