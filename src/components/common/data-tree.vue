<template>
  <div class="component data-tree">
    <template v-for="node of data">
      <data-tree-node v-if="node" :key="node.id" :data="node" />
    </template>
  </div>
</template>

<script>
import DataTreeNode from '@/components/common/data-tree-node'
export default {
  name: 'DataTree',
  components: {
    DataTreeNode
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {}
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    editConfig: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nodeMap: new Map(),
      currentNode: ''
    }
  },
  methods: {
    propsObject() {
      let propObj = {
        title: 'title'
      }
      if (this.props) {
        propObj = { ...propObj, ...this.props }
      }
      return propObj
    },
    registerNode(node, data) {
      this.nodeMap.set(node, data)
    },
    /**
     * 选择当前选中项
     */
    selected(node) {
      if (this.currentNode !== node) {
        // 清空历史选中项
        if (this.currentNode) {
          this.currentNode.selected = false
        }
        this.currentNode = node
        this.emitSelectChange(node.data)
      }
    },

    /**
     * 获取选中key
     */
    getCheckedKeys() {
      return Array.from(this.nodeMap.entries())
        .filter(([node, data]) => node.checked)
        .map(([node, data]) => data.id)
    },
    /**
     * 展开树的第一层节点
     */
    expandedFirstNode() {
      const it = Array[0] || []
      const key = it[0] || {}
      key.expanded = true
    }
  }

}
</script>
<style scoped>
</style>
