<template>
  <div>
    <DataList
      ref="datalist"
      :filters="filterList"
      :is-show-all="isShowAll"
      :is-hedden="isHedden"
      :total="total"
      :other-func="otherFunc"
      @data-showAll="filterShowAll"
      @data-refresh="handleRefresh"
    >
      <el-table
        v-loading="listLoading"
        :data="listData"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="操作" width="260" align="left">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.onoff == 0"
              size="medium"
              type="text"
              @click="handleStatus(scope.row,1)"
            >停用</el-button>
            <el-button
              v-if="scope.row.onoff == 1"
              size="medium"
              type="text"
              @click="handleStatus(scope.row,0)"
            >启用</el-button>
            <el-button v-if="scope.row.onoff == 1" size="medium" type="text" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="medium" type="text" @click="handleDetail(scope.row)">设置权限</el-button>
            <el-button size="medium" type="text" @click="handleDelete(scope.row)">用户列表</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="150" />
        <el-table-column prop="period" label="角色描述" min-width="150" />
        <el-table-column prop="remark" label="状态" min-width="150" />
        <el-table-column prop="createName" label="创建人" min-width="150" />
        <el-table-column prop="totalFinance" label="创建时间" min-width="150" />
        <el-table-column prop="onoff" :formatter="statusfn" label="更新人" min-width="150" />
        <el-table-column prop="level" label="更新时间" min-width="150" />

      </el-table>
    </DataList>
  </div>
</template>

<script>
import DataList from '@/components/datalist/DataList'
export default {
  components: {
    DataList
  },
  data() {
    return {
      listData: [{
        roleName: ''
      }]
    }
  }
}
</script>

<style>

</style>
