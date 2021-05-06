<template>
  <section class="component new-add-parameter">
    <el-form class="demo-ruleForm tableInput" :rules="rules" :model="modeldata" ref="modify-form" label-width="110px">
      <el-form-item label="参数名称" prop="paramName" align="left">
        <el-input v-model="modeldata.paramName"></el-input>
      </el-form-item>
      <el-form-item label="参数代码" prop="paramCode" align="left">
        <el-input v-model="modeldata.paramCode"></el-input>
      </el-form-item>
      <el-form-item label="参数值" prop="paramValue" align="left">
        <el-input v-model="modeldata.paramValue"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="description" align="left">
        <el-input v-model="modeldata.description"></el-input>
      </el-form-item>
      <el-form-item label="状态" align="left" prop="paramStatus">
        <el-select v-model="modeldata.paramStatus" placeholder="请选择" clearable>
          <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数是否可修改" align="left" prop="paramSign">
        <el-radio-group v-model="modeldata.paramSign" style="margin-top: 5px">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="modifyCommit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { SystemParamService } from '~/services/management-service/system-param.service';
import { Emit, Prop, Watch } from 'vue-property-decorator';
@Component({
})
export default class ModifyParameter extends Vue {
  @Dependencies(SystemParamService)
  private sysParamService: SystemParamService;

  private modeldata: any = {
    description: '',
    id: '',
    paramCode: '',
    paramName: '',
    paramSign: 0,
    paramStatus: 'ENABLED',
    paramValue: '',
  };
  private rules: any = {
    paramCode: [{ required: true, message: '请输入参数代码' }],
    paramName: [{ required: true, message: '请输入参数名称' }],
    paramStatus: [{ required: true, message: '请选择是否启用' }],
    paramValue: [{ required: true, message: '请输入参数值' }],
    paramSign: [{ required: true, message: '请选择是否可修改' }],
  };

  @Emit('close')
  private cancel(){}


  private modifyCommit() {
    console.log(this.modeldata.paramStatus)
    const form: any = this.$refs['modify-form'];
    form.validate((result) => {
      if (!result) return;
      this.sysParamService.modifySystemParam(this.modeldata).subscribe(
        (data) => {
          this.$message.success('操作成功');
          this.cancel()
        }
      );
    });
  }
}
</script>

<style scoped>
</style>
