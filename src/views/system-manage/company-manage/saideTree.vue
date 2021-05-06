<template>
  <div class="app-container">
    <div style="display: flex;justify-content: flex-end; margin-bottom:10px">
      <el-button type="primary" size="mini" @click="addItemHandle"> 添加部门 </el-button>
    </div>
    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      class="filter-tree"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span style="margin-left:10px">
          <a href="#" style="margin-left:10px" @click="editHandle(data)">
            <svg-icon icon-class="xiugai" />
          </a>
          <a href="#" style="margin-left:10px" @click="addItemHandle(data)">
            <svg-icon icon-class="zengjia" />
          </a>
          <a href="#" style="margin-left:10px" @click="deleteHandle(data)">
            <svg-icon icon-class="guanbi" />
          </a>
        </span>
      </span>
    </el-tree>
    <AddDepate ref="AddDepate" />

  </div>
</template>

<script>
import AddDepate from './components/addDepatenMent'

// let id = 1000
export default {
  components: {
    AddDepate
  },
  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    editHandle() {},
    addItemHandle(data) {
      console.log(data, '添加部门')
      this.$refs['AddDepate'].show()
    },
    deleteHandle() {},
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
