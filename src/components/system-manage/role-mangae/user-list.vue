<template>
  <div>
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
    <div class="operate-buttons">
      <el-button type="primary" size="small">保 存</el-button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
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

</style>
