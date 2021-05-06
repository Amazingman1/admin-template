<template>
    <!-- 分配角色 -->
    <section class="component allot-role">
        <data-form :model="model" @onSearch="refreshData" ref="data-form" :page="pageService">
            <template slot="inputs">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="model.roleName"></el-input>
                </el-form-item>
            </template>
        </data-form>
        <!--    <data-box :data="dataSet"   @onPageChange="refreshData" :page="pageService" :selectionList.sync="selectionRow" ref="data-box">-->
        <el-table :data="dataSet" style="width: 100%" stripe border>
            <!--      <template slot="columns">-->
            <!--数据列区域-->
            <el-table-column label="" width="50">
                <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model="radio" @change.native="getCurrentRow(scope.row.id,)">
                        &nbsp;
                    </el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="description" label="角色描述" :min-width="$helper.getColumnWidth(4)"
                             show-overflow-tooltip>
            </el-table-column>
            <!--      </template>-->
        </el-table>
        <el-pagination class="pages" @size-change="pageSizeChange" @current-change="pageNoChange" :current-page="pageNo"
                       :page-pageSize="[5, 10, 15, 20]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!--    </data-box>-->
        <el-row type="flex" justify="center" style="margin-top:20px">
            <el-button @click="close">取消</el-button>
            <el-button @click="confirm">确定</el-button>
        </el-row>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import DataForm from '~/components/common/data-form.vue';
    import DataBox from '~/components/common/data-box.vue';
    import {Dependencies} from '~/core/decorator';
    import {PageService} from '~/utils/page.service';
    import {UserService} from '~/services/management-service/user.service';
    import {RoleService} from '~/services/management-service/role.service';
    import {Emit, Prop} from 'vue-property-decorator';

    @Component({
        components: {
            DataForm,
            DataBox,
        },
    })
    export default class AllotRole extends Vue {
        @Dependencies(PageService)
        private pageService: PageService;
        @Dependencies(UserService)
        private userService: UserService;
        @Dependencies(RoleService)
        private roleService: RoleService;
        @Prop()
        private user: any;
        @Prop()
        private companyCode: any;
        private model: any = {
            roleName: '',
            companyCode: this.companyCode,
            roleStatus: 'ENABLED',
        };
        private selectionRow: any = [];
        // 设置角色对象
        private roleSetModel: any = {
            roleIds: [],
            userId: '',
            caseSwitch: '',
            userIds: [],
            userLevel: 'A',
        };
        private dataSet: any = null;
        private pageNo: number = 0
        private total: number = 0

        private pageSize: number = 10
        private radio = ''
        private radioArr: any = []
        private templateRadio: string = ''

        @Emit('refreshList')
        public refreshList() {
        }

        @Emit('close')
        public close() {
            // const databox: any = this.$refs['data-box'];
            // databox.clearSelection();
            this.model.roleName = '';
        }

        private getTemplateRow() {

        }

        private mounted() {
            this.refreshData()
            // this.getCurrentRow()
        }

        // 刷新数据
        private refreshData() {
            this.selectionRow = [];
            this.roleService.getAllRoles(this.model).subscribe((data) => {
                    this.dataSet = data.content;
                    this.total = data.numberOfElements
                    this.user.roleIds.forEach((v, index) => {
                        this.selectionRow.push(data.content.find((value) => value.id === v));

                    });
                this.radio =''
                this.radio = this.selectionRow[0].id
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

        // 那到id
        private getCurrentRow(id, index) {
            console.log(index)
            this.radio = id

        }
        // 确定分配角色
        private confirm() {
            console.log(this.radio)
            if (this.radio === '') {
                this.$message.info('请选择角色');
                return;
            }
            this.radioArr = []
            this.radioArr.push(this.radio)
            this.roleSetModel.userId = this.user.id;
            this.roleSetModel.roleIds = this.radioArr;
            // this.roleSetModel.roleIds = this.selectionRow.map((x) => x.id);
            this.roleSetModel.userIds = [this.user.id];
            this.roleSetModel.caseSwitch = this.user.caseSwitch;
            this.userService.batchAllotRole(this.roleSetModel).subscribe(
                (data) => {
                    this.$message.success('分配成功');
                    this.close();
                    this.refreshList();
                }
            );
        }
    }
</script>

<style lang="less" scoped>
</style>
