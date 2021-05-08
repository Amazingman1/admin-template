<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick" />
      </el-aside>
      <el-main style="padding:0px">
        <!-- <avue-crud v-model="obj" class="crud" :data="loadData" :option="loadOption" /> -->
        <el-table
          :data="loadData"
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="name" label="角色名称" min-width="150" />
          <el-table-column prop="description" label="角色描述" min-width="150" />
          <el-table-column prop="roleStatus" label="状态" min-width="150" />
          <el-table-column prop="createdBy" label="创建人" min-width="150" />
          <!-- <el-table-column prop="createdAt" label="创建时间" min-width="150" /> -->
          <!-- <el-table-column prop="updatedBy" label="更新人" min-width="150" /> -->
          <!-- <el-table-column prop="updatedAt" label="更新时间" min-width="150" /> -->
        </el-table>
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
      ]
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
.crud {
  .el-card{
      .el-card__body{
    .avue-crud__menu {
     min-height:  0 !important;
    }
  }
  }

}
</style>
