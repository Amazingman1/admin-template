<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick" />
      </el-aside>
      <el-main style="padding:0">
        <avue-crud v-model="obj" :data="loadData" :option="loadOption" />
      </el-main>
    </el-container>
    <div class="operate-buttons">
      <el-button type="primary" size="small">保 存</el-button>

    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      obj: {},
      treeData: [{
        value: 0,
        label: '一级部门',
        children: [
          {
            value: 1,
            label: '一级部门1'
          }
        ]
      }],
      treeOption: {
        defaultExpandAll: true,
        filter: false,
        formOption: {
          labelWidth: 100,
          column: [{
            label: '自定义项',
            prop: 'test'
          }]
        },
        props: {
          labelText: '标题',
          label: 'label',
          value: 'value',
          children: 'children'
        }
      },
      loadData: [],
      loadData1: [
        {
          name: '张三',
          sex: '男'
        }
      ],
      loadData2: [
        {
          name: '李四2',
          sex: '女'
        }
      ],
      loadOption: {
        page: false,
        addBtn: false,
        menu: false,
        refreshBtn: false,
        dateDefault: false,
        columnBtn: false,

        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '性别',
            prop: 'sex'
          }
        ]
      }
    }
  },
  created() {
    this.loadData = this.loadData1
  },
  methods: {
    nodeClick(data) {
      if (data.value === 0) {
        this.loadData = this.loadData1
      } else if (data.value === 1) {
        this.loadData = this.loadData2
      }
      this.$message.success(JSON.stringify(data))
    }
  }
}
</script>
<style lang="scss" scoped>
.avue-crud__menu {
  min-height: 0px !important;
}
</style>
