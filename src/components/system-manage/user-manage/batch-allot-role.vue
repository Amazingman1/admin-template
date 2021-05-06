<template>
  <!-- 批量分配角色 -->
  <section class="component batch-allot-role">
    <data-form :model="model" @onSearch="refreshData" ref="data-form" :page="pageService">
      <template slot="inputs">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="model.roleName"></el-input>
        </el-form-item>
      </template>
    </data-form>
    <!--    <data-box :data="dataSet" @onPageChange="refreshData" :page="pageService" :selectionList.sync="selectionRow" ref="data-box">-->
    <!--      <template slot="columns">-->
    <el-table :data="dataSet" style="width: 100%" stripe border>
      <el-table-column label="" width="50">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="radio" @change.native="getCurrentRow(scope.row.id)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!--数据列区域-->
      <el-table-column prop="roleName" label="角色名称" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="角色描述" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination class="pages" @size-change="pageSizeChange" @current-change="pageNoChange" :current-page="pageNo"
                   :page-pageSize="[5, 10, 15, 20]" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!--      </template>-->
    <!--    </data-box>-->
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-button @click="close">取消</el-button>
      <el-button @click="confirm">确定</el-button>
    </el-row>
  </section>
</template>

<script lang="ts">
  // import Vue from 'vue';

  import {Component, Vue, Watch, Emit, Prop} from "vue-property-decorator";
  // import Component from 'vue-class-component';
  import DataForm from '~/components/common/data-form.vue';
  import DataBox from '~/components/common/data-box.vue';
  import {Dependencies} from '~/core/decorator';
  import {PageService} from '~/utils/page.service';
  import {UserService} from '~/services/management-service/user.service';
  import {RoleService} from '~/services/management-service/role.service';

  @Component({
    components: {
      DataForm,
      DataBox,
    },
  })
  export default class BatchAllotRole extends Vue {
    @Dependencies(PageService)
    private pageService: PageService;
    @Dependencies(UserService)
    private userService: UserService;
    @Dependencies(RoleService)
    private roleService: RoleService;
    @Prop()
    private userList: any;
    @Prop()
    private companyCode: any;
    @Prop()
    private refRe: any;
    private pageNo: number = 0
    private total: number = 0

    private pageSize: number = 10

    private radio:string = ''
    private model: any = {
      roleName: '',
      companyCode: this.companyCode,
      roleStatus: 'ENABLED',
    };
    private selectionRow: any = [];
    private dataSet:any = [];

    @Emit('refreshList')
    public refreshList() {
    }

    @Emit('close')
    public close() {
    }

    private refresh() {
      this.model.roleName = '';
      this.refreshData();
      this.selectionRow = [];
    }


    private mounted() {

    }

    private getCurrentRow(id) {
      console.log(id,'----')
      this.radio = id

    }

    private confirm() {
      // if(this.selectionRow.length === 0){
      //   this.$message.error('请选择角色')
      //   return
      // }
      if (this.radio === '') {
        this.$message.info('请选择角色');
        return;
      }
      const radioArr: any[] = []
      radioArr.push(this.radio)
      // const roleIds = this.selectionRow.map((row) => row.id);
      const roleIds = radioArr;
      const userIds = this.userList.map((v) => v.id);
      this.userService.batchAllotRole({roleIds, userIds}).subscribe(
        (data) => {
          this.$message.success('分配成功');
          this.close();
          this.refreshList();
        }
      );
    }

    private refreshData() {
      this.roleService.getAllRoles(this.model).subscribe((data) => {
          console.log(data)
          this.dataSet = data.content;
          this.radio = ''
          this.total = data.numberOfElements
        }
      );
    }
// 切换条数
    private pageSizeChange(val) {
      this.pageSize = val
      this.refreshData()

    }
    // 切换页码
    private pageNoChange(val) {
      this.pageNo = val
      this.refreshData()

    }
  }
</script>
<style>
  .pages{
    text-align: center;
    padding: 20px 0;
  }
 .pages .el-pagination__editor.el-input .el-input__inner{
   height: 30px!important;
   line-height: 30px!important;
 }
  .pages .el-input .el-input__inner {
    height: 30px!important;
    line-height: 30px!important;
  }
  .pages .el-dialog  .el-input .el-input__inner.el-input__icon{
    height: 30px!important;
    line-height: 30px!important;
  }

</style>

<style lang="less" scoped>
</style>
