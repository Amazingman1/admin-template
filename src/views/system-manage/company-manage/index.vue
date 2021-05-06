<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="said-tree">
          <div class="said-tree-con">
            <SaidTree />
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <avue-crud v-model="obj" :data="data" :option="option1" :page.sync="page" @selectionChange="dateChange">
          <template slot="menuLeft">
            <el-button type="primary" size="small">批量分配角色</el-button>
          </template>
          <template slot="option" slot-scope="scope">
            <el-link type="primary" :underline="false" @click="editUser(scope.row)">修改用户</el-link>
            <el-link type="primary" class="link-left" :underline="false" @click="editUser(scope.row)">分配角色</el-link>
            <el-link type="primary" class="link-left" :underline="false" @click="editUser(scope.row)">重制密码</el-link>
            <el-link type="primary" class="link-left" :underline="false" @click="editUser(scope.row)">停用</el-link>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SaidTree from './saideTree'

export default {
  components: {
    SaidTree
  },
  data() {
    return {
      obj: {},
      page: {
        total: 20
      },
      departmentData: [{
        id: 1,
        title: 'Level one 1',
        children: [{
          id: 4,
          title: 'Level two 1-1',
          children: [{
            id: 9,
            title: 'Level three 1-1-1'
          }, {
            id: 10,
            title: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        title: 'Level one 2',
        children: [{
          id: 5,
          title: 'Level two 2-1'
        }, {
          id: 6,
          title: 'Level two 2-2'
        }]
      }, {
        id: 3,
        title: 'Level one 3',
        children: [{
          id: 7,
          title: 'Level two 3-1'
        }, {
          id: 8,
          title: 'Level two 3-2'
        }]
      }],
      data: [
        {
          name: '张三',
          sex: '男',
          date: '1994-02-23 00:00:00',
          date1: '1994-02-23 00:00:00',
          date2: '1994-02-23 00:00:00',
          date3: '1994-02-23 00:00:00',
          date4: '1994-02-23 00:00:00'
        }, {
          name: '李四',
          sex: '女',
          date: '1994-02-23 00:00:00',
          date1: '1994-02-23 00:00:00',
          date2: '1994-02-23 00:00:00',
          date3: '1994-02-23 00:00:00',
          date4: '1994-02-23 00:00:00'
        }, {
          name: '王五',
          sex: '女',
          date: '1994-02-23 00:00:00',
          date1: '1994-02-23 00:00:00',
          date2: '1994-02-23 00:00:00',
          date3: '1994-02-23 00:00:00',
          date4: '1994-02-23 00:00:00'
        }, {
          name: '赵六',
          sex: '男',
          date: '1994-02-23 00:00:00',
          date1: '1994-02-23 00:00:00',
          date2: '1994-02-23 00:00:00',
          date3: '1994-02-23 00:00:00',
          date4: '1994-02-23 00:00:00'
        }
      ],
      option1: {
        menu: false,
        selection: true,
        page: true,
        align: 'center',
        refreshBtn: false,
        searchMenuSpan: 6,
        columnBtn: false,
        addBtnText: '新增用户',
        menuAlign: 'center',
        column: [
          {
            label: '操作',
            prop: 'option',
            // search: true,
            width: 260,
            addDisplay: false
          },
          {
            label: '姓名',
            prop: 'name',
            search: true
          },
          {
            label: '用户名',
            prop: 'sex',
            search: true
          }, {
            label: '机构',
            prop: 'date',
            addDisplay: false
          }, {
            label: '机构类型',
            prop: 'date',
            type: 'date1',
            addDisplay: false
          }, {
            label: '状态',
            prop: 'date2',
            type: 'select',
            search: true,
            addDisplay: false,
            dicData: [
              {
                label: '停用',
                value: 1
              }, {
                label: '启用',
                value: 0
              }, {
                label: '冻结',
                value: -1
              }
            ]
          }, {
            label: '电话',
            prop: 'date3',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            addDisplay: false
          }, {
            label: '邮箱',
            prop: 'date4',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            addDisplay: false
          }, {
            label: '创建人',
            prop: 'date5',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            addDisplay: false
          }, {
            label: '创建时间',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            addDisplay: false
          }
        ]
      }
    }
  },
  methods: {
    dateChange(date) {
      this.$message.success(date)
    },
    tip() {
      this.$message.success('自定义按钮')
    },
    editUser(row) {
      console.log(row, '用户')
    },
    onAdd() {},
    onEdit() {},
    onChange() {},
    onDelete() {}
  }
}
</script>
<style lang="scss" scoped>
.said-tree{
  background-color: #fff;
  // padding: 10px;
  // border: solid 1px #e4e4e4;
  min-height: 700px;
  .said-tree-con{
    min-height: 700px;
    border: solid 1px #e4e4e4;

  }
}
</style>
