<template>
  <!--新增用户-->
  <div class="pages">
    <el-form :rules="rules" :model="addParams" ref="add-form" label-width="100px" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="addParams.realName" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="userName">
            <el-input type="email" v-model="addParams.userName" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属机构">
            <el-cascader v-model="deptIds" :options="departmentData" :props="{value:'id',label:'deptName'}" change-on-select :show-all-levels="false" @change="orgChange" style="width: 100%"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构类型" prop="deptType">
            <el-select v-model="addParams.deptType" placeholder="请选择" size="small" disabled style="width: 100%">
              <el-option v-for="{code,name,index} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
<!--        <el-col :span="12">-->
<!--          <el-form-item label="身份证号" prop="idCard">-->
<!--            <el-input v-model="addParams.idCard" size="small" :maxlength="25"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>
      <el-row>
<!--        <el-col :span="12">-->
<!--          <el-form-item label="组织机构类型" prop="deptType">-->
<!--            <el-select v-model="addParams.deptType" placeholder="请选择" size="small" disabled>-->
<!--              <el-option v-for="{code,name,index} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="状态" prop="userStatus">
            <el-select v-model="addParams.userStatus" size="small" style="width: 100%">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addParams.phone" size="small" :maxlength="13"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item label="是否调查员" min-width="140px" prop="isInvestigator">-->
<!--            <el-select v-model="addParams.isInvestigator" placeholder="请选择" size="small">-->
<!--              <el-option v-for="{code,name,index} in $dict.getDictData('CommonFlag')" :key="index" :label="name" :value="code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item label="调查员等级" min-width="140px">-->
<!--            <el-select v-model="addParams.userLevel" placeholder="请选择" size="small">-->
<!--              <el-option v-for="{code,name,index} in $dict.getDictData('UserLevel')" :key="index" :label="name" :value="code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row>

        <el-col :span="12">
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="addParams.userEmail" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="坐席号" prop="phone">
            <el-input v-model="addParams.zbCno" size="small" :maxlength="13"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="confirm-button">
      <el-button @click="addUserCancel">取消</el-button>
      <el-button @click="addUserCommit">确定</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State, Mutation, Getter, namespace } from 'vuex-class';
import { UserService } from '~/services/management-service/user.service';
import { DepartmentService } from '~/services/management-service/department.service';
import { Emit, Prop } from 'vue-property-decorator';
const systemManageModule = namespace('system-manage');

@Component({
  components: {},
})
export default class AddUser extends Vue {
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;
  @Prop()
  private deptId: any;
  @Prop()
  private password: any;
  @State
  private companyList: any;
  @State
  private departmentList: any;
  @systemManageModule.State
  private orgInfo;
  @Getter
  private departmentData;
  @State
  private userData;

  private addParams: any = {
    userEmail: '',
    userLevel: 'C',
    userStatus: 'ENABLED',
    caseSwitch: 'ENABLED',
    userName: '',
    realName: '',
    companyCode: '',
    deptId: '',
    password: '',
    deptType: '',
    isInvestigator:'NO',
    idCard:'',
    zbCno:''
  };
  private typeList: any = [];
  private userDatas: any = '';
  private companyNames: any = [];
  private deptIds: any = [];
  private isIcon: boolean = false;
  private rules: any = {
    realName: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      {
        message: '请输入汉字或英文字母',
        trigger: 'blur',
        pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/,
      },
    ],
    userName: [
      { required: true, message: '请输入账户', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
      { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' },
    ],
    // idCard: [
    //   {
    //     required: true,
    //     message: '请输入正确的身份证号',
    //     trigger: 'blur',
    //     pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
    //   },
    // ],
    phone:  {
      message: "请输入正确的电话号码",
      trigger: "blur",
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/
    },
    userEmail: [
      { required: false, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
      { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' },
      {message: "请输入正确的邮箱", trigger: "blur", pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/}
    ],
    // isInvestigator:{required: true ,message: '请选择是否调查员'}
  };

  public refresh(dept) {
    this.addParams.companyCode = dept.companyCode;
    this.addParams.deptType = dept.deptType;
    this.addParams.deptId = dept.id;
    this.addParams.department = dept;
    this.deptIds = [];
    this.getDeptIds(dept.id);
  }

  /**
   * 机构改变
   */
  private orgChange() {
    if (this.deptIds.length < 1) {
      return;
    }

    const deptId = this.deptIds[this.deptIds.length - 1];
    const deptModel: any = this.departmentList.find((x) => x.id === deptId);
    this.addParams.department = deptModel;
    this.addParams.deptType = deptModel.deptType;
    this.addParams.deptId = deptModel.id;
  }

  private getDeptIds(id: string) {
    const dept = this.departmentList.find((x) => x.id === id);
    if (dept) {
      this.deptIds.unshift(id);
      if (dept.parentId) {
        this.getDeptIds(dept.parentId);
      }
    }
  }

  /**
   * 新增用户确认
   */
  private addUserCommit() {
    const addForm: any = this.$refs['add-form'];
    addForm.validate((valid) => {
      if (!valid) return false;
      this.addParams.password = this.password;
      this.userService.createUser(this.addParams).subscribe(
        (data) => {
          //   重置form表单xr
          const addForm: any = this.$refs['add-form'];
          addForm.resetFields();
          this.addParams.deptId = '';
          this.deptIds = [];
          //   关闭dialog
          this.$emit('close');
          this.$message.success('新增用户成功!');
          //   刷新databox
          this.$emit('refresh');
        },
      );
    });
  }
  /**
   * 新增用户取消
   */
  private addUserCancel() {
    //   重置form表单
    const addForm: any = this.$refs['add-form'];
    addForm.resetFields();
    this.addParams.deptId = '';
    this.deptIds = [];
    //   关闭dialog
    this.$emit('close');
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.data-grid {
  margin-bottom: 10px;
}

.header {
  border: solid 1px #dee1e5;
  border-bottom: 0px;
  height: 40px;
  line-height: 40px;
}
</style>
