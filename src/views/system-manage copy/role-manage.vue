<template>
  <!--角色管理-->
  <div class="dashboard-container">
    <section class=" role-manage">
      <div class="contentCss c-margin">
        <data-form :model="roleModel" @onSearch="refreshData" :page="pageService">
          <template slot="inputs">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleModel.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色状态" prop="roleStatus">
              <el-select v-model="roleModel.roleStatus" placeholder="请选择" clearable>
                <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name"
                           :value="code"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </data-form>
      </div>
      <div class="contentCss c-margin">
        <data-box :data="roleDataSet"  :page="pageService"  @onPageChange="refreshData">
          <template slot="buttons">
            <el-button @click="roleObj = null,dialog.modify = true">新增角色</el-button>
          </template>
          <template slot="columns">
            <!--数据列区域-->
            <el-table-column label="操作" :min-width="$helper.getOperateWidth(3)">
              <template slot-scope="scope">
                <el-button type="text" @click="roleObj = scope.row,dialog.modify = true">修改</el-button>
                <el-button type="text" @click="dialog.module = true, roleObj = scope.row">设置权限</el-button>
                <el-button type="text" @click="dialog.list = true, roleObj = scope.row">用户列表</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="description" label="角色描述" :min-width="$helper.getColumnWidth(5)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="roleStatus" label="状态"
                             :formatter="(row) => $filter.dictConvert(row.roleStatus,'CommonState')"
                             :min-width="$helper.getColumnWidth(2)">
            </el-table-column>
            <el-table-column prop="createdBy" label="创建人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" :formatter="(row) => $filter.dateTimeFormat(row.createdAt)" :min-width="$helper.getColumnWidth(6)">
            </el-table-column>
            <el-table-column prop="updatedBy" label="更新人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="updatedAt" label="更新时间" :formatter="(row) => $filter.dateTimeFormat(row.updatedAt)" :min-width="$helper.getColumnWidth(6)">
            </el-table-column>
          </template>
        </data-box>
      </div>
      <!--用户列表弹框-->
      <el-dialog v-dialogDrag title="用户列表" :center="true" :visible.sync="dialog.list" width="900px"
                 @open="$nextTick(()=>$refs['user-list'].refresh(roleObj.id))">
        <user-list ref="user-list"></user-list>
      </el-dialog>

      <!--新增/修改角色弹出框-->
      <el-dialog v-dialogDrag :title="roleObj?'修改角色':'新增角色'" :center="true" :visible.sync="dialog.modify" width="600px"
                 @open="$nextTick(() => $refs['modify-role'].reset())">
        <modify-role :roleData="roleObj" @close="dialog.modify = false" @refreshList="refreshData"
                     ref="modify-role"></modify-role>
      </el-dialog>

      <!--角色模块权限弹出框-->
      <el-dialog v-dialogDrag title="角色模块权限" :center="true" :visible.sync="dialog.module" width="1200px"
                 @open="$nextTick(()=>$refs['module-permission'].refresh(roleObj))">
        <module-permission ref="module-permission" @close="dialog.module = false"
                           @refreshList="refreshData"></module-permission>
      </el-dialog>

    </section>
  </div>
  <!--  </div>-->

</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Auth, Layout, Dependencies} from '~/core/decorator';
  import {RoleService} from '~/services/management-service/role.service';
  import {PageService} from '~/utils/page.service';
  import DataForm from '~/components/common/data-form.vue';
  import DataBox from '~/components/common/data-box.vue';
  import ModifyRole from '~/components/system-manage/role-mangae/modify-role.vue';
  import ModulePermission from '~/components/system-manage/role-mangae/module-permission.vue';
  import UserList from '~/components/system-manage/role-mangae/user-list.vue';
  import {State, Getter, Action, namespace} from 'vuex-class';
  import de from "element-ui/src/locale/lang/de";

  const systemManage = namespace("system-manage")

  // @Auth(854)
  @Layout('workspace')
  @Component({
    components: {
      ModulePermission,
      ModifyRole,
      UserList,
      DataForm,
      DataBox,
    },
  })
  export default class RoleManage extends Vue {
    @Dependencies(RoleService)
    private roleService: RoleService;
    @Dependencies(PageService)
    private pageService: PageService;
    @systemManage.Action
    private updateResource;
    private roleModel: any = {
      roleName: '',
      roleStatus: '',
    };
    private roleDataSet = null;
    private roleObj: any = {};
    private dialog: any = {
      modify: false,
      module: false,
      list: false,
    };


    private mounted() {
      this.refreshData();
      this.updateResource()
    }

    private refreshData() {
      this.roleService.getAllRoles(this.roleModel, this.pageService).subscribe(
        (data) => {
          this.roleDataSet = data;
        }
      );

    }


  }
</script>

<style lang="less">
</style>
