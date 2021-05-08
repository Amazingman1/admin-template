<template>
  <el-dialog :title="title" center :visible.sync="addSettle" :close-on-click-modal="false" :show-close="false" width="500px">
    <!-- 分配角色 -->
    <el-form ref="form" :model="form" label-width="100px" size="small">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item>
        <el-button size="small">取 消</el-button>
        <el-button type="primary" size="small">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataSet" style="width: 100%" stripe border>
      <!--数据列区域-->
      <el-table-column label="" width="50">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.row.id" @change.native="getCurrentRow(scope.row.id)">
                        &nbsp;
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip />
      <el-table-column
        prop="description"
        label="角色描述"
        show-overflow-tooltip
      />
    </el-table>
    <el-pagination
      class="pages"
      :current-page="pageNo"
      :page-page-size="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="pageSizeChange"
      @current-change="pageNoChange"
    />
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
      form: {},
      pageNo: 1,
      pageSize: 10,
      radio: null,
      dataSet: [
        { id: '11', roleName: '超级管理员', description: '测试' },
        { id: '2', roleName: '一级管理员', description: '测试滑腻' }
      ],
      total: 0,
      addSettle: false
    }
  },
  methods: {
    show() {
      this.addSettle = true
    },
    getCurrentRow() {},
    pageSizeChange() {},
    pageNoChange() {},
    close() {
      this.addSettle = false
    },
    confirm() {}
  }
}
</script>
