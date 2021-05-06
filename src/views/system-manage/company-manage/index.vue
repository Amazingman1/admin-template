<template>
  <div class="app-container">
    <avue-crud v-model="obj" :data="data" :option="option1" :page.sync="page" @date-change="dateChange">
      <template slot="menuLeft">
        <el-button type="primary">批量分配角色</el-button>
      </template>
      <template slot="option" slot-scope="scope">
        <el-link type="primary" :underline="false" @click="editUser(scope.row)">修改用户</el-link>
        <el-link type="primary" class="link-left" :underline="false" @click="editUser(scope.row)">分配角色</el-link>
        <el-link type="primary" class="link-left" :underline="false" @click="editUser(scope.row)">重制密码</el-link>
        <el-link type="primary" class="link-left" :underline="false" @click="editUser(scope.row)">停用</el-link>
      </template>
    </avue-crud>
  </div>
</template>
<script>

export default {
  data() {
    return {
      obj: {},
      page: {
        total: 20
      },
      data: [
        {
          name: '张三',
          sex: '男',
          date: '1994-02-23 00:00:00'
        }, {
          name: '李四',
          sex: '女',
          date: '1994-02-23 00:00:00'
        }, {
          name: '王五',
          sex: '女',
          date: '1994-02-23 00:00:00'
        }, {
          name: '赵六',
          sex: '男',
          date: '1994-02-23 00:00:00'
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
            search: true,
            width: 260
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
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }, {
            label: '机构类型',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }, {
            label: '状态',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }, {
            label: '电话',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }, {
            label: '邮箱',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }, {
            label: '创建人',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }, {
            label: '创建时间',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
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
    }
  }
}
</script>
