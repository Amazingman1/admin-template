<template>
  <section class="component data-tree-node">
    <div :style="getSubTreeStyle()">
      <div class="node-title" :class="{selected:selected}" @click="onNodeClick">
        <span v-if="!isLeaf" :class="{expanded:expanded}" @click="onExpand">
          <i v-show="loading" class="el-icon-loading" />
          <i v-show="!loading" :class="expanded ? 'el-icon-caret-bottom' :'el-icon-caret-right'" />
        </span>
        <span v-if="showCheckbox">
          <el-checkbox v-model="checked" :indeterminate="indeterminate" @on-change="onChecked" />
        </span>
        <span>{{ data[props.title] }}</span>
        <small v-show="selected && showEdit" class="icon-box">
          <a v-if="hasEdit" href="#" :disabled="disabled" @click="editHandle">
            <svg-icon icon-class="xiugai" />
          </a>
          <a v-if="hasAdd" href="#" :disabled="disabled" @click="addItemHandle">
            <svg-icon icon-class="zengjia" />
          </a>
          <a v-if="hasDelete" href="#" :disabled="disabled" @click="deleteHandle">
            <svg-icon icon-class="guanbi" />
          </a>
        </small>
      </div>
      <div v-show="expanded" v-if="data.children" class="sub-node">
        <data-tree-node v-for="node in data.children" ref="children-node" :key="node.id" :data="node" />
      </div>
    </div>
  </section>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'DataTreeNode',
  components: {
    SvgIcon
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      expanded: false,
      selected: false,
      indeterminate: false,
      loading: false,
      root: {
        propsObject: 'title'
      }
    }
  },

  methods: {
    props() {
      return this.root.propsObject
    },
    checked() {
      return this.data._checked
    },

    // checked(value) {
    //   this.data._checked = value
    // },

    showCheckbox() {
      return this.root.showCheckbox
    },

    /** 是否禁用操作项 */
    disabled() {
      return this.data._disabled || false
    },

    showEdit() {
      return this.root.showEdit
    },

    hasAdd() {
      // return this.root.editConfig.includes(EditType.ADD)
    },

    hasEdit() {
      // return this.root.editConfig.includes(EditType.MODIFY)
    },

    hasDelete() {
      // return this.root.editConfig.includes(EditType.DELETE)
    },

    /**
   * 调用树的编辑方法，向调用者发送edit事件
   */
    editHandle() {
      this.root.emitEdit(this.data)
    },
    /**
   * 点击树添加事件
   */
    addItemHandle() {
      this.root.addEdit(this.data)
    },
    /**
   * 点击树删除事件
   */
    deleteHandle() {
      this.root.deleteEdit(this.data)
    },
    /**
   * 点击当前节点
   */
    currentNode() {
      this.root.clickNode(this.data)
    },

    /**
   * 当前节点更新操作
   * 保证更新顺序
   */
    onChecked(value) {
    // 取消自动关联状态
      this.indeterminate = false
      // step1: 更新子节点
      this.updateChildrenChecked(value)
      // step2: 更新父节点
      this.updateParentChecked(value)

      // 发送节点更新事件
      this.root.emitCurrentCheckedChange(this.data.id, value)
    },

    /**
   * 更新父节点选中状态
   */
    updateParentChecked(value) {
    // 获取父节点
      const parent = this.getParent()

      if (parent) {
      // 获取目标状态
        const targetChecked = parent.data.children.some(x => x._checked === true)
        // 更新半选状态
        parent.indeterminate = targetChecked && !parent.data.children.every(x => x._checked === true)

        // 如果状态发生变化则更新父节点
        if (parent.checked !== targetChecked) {
          parent.checked = targetChecked
          parent.updateParentChecked()
        }
      }
    },

    /**
   * 更新子节点选中状态
   */
    updateChildrenChecked(value) {
      if (this.data.children && this.data.children.length) {
      // 获取子节点组件
        const nodes = this.$refs['children-node']
        // 通知子组件更新
        nodes.forEach(item => {
          item.checked = value
          // 发送节点更新事件
          this.root.emitCurrentCheckedChange(item.data.id, value)
          item.updateChildrenChecked(value)
        })
      }
    },

    /**
   * 是否叶子节点 或者 懒加载模式
   */
    isLeaf() {
      if (this.root.loadData !== undefined) {
        if (this.data.loading) {
          return !this.HasChildren
        } else {
          return false
        }
      } else {
        return !this.HasChildren
      }
    },

    /**
   * 是否有children数据
   */
    HasChildren() {
      return this.data.children
    },

    getSubTreeStyle() {
      return {
        marginLeft: this.isLeaf ? '15px' : '10px',
        marginTop: '3px'
      }
    },

    /**
   * 节点展开处理
   */
    onExpand() {
      if (!this.expanded) {
        if (this.root.loadData !== undefined && !this.data.loading) {
          // 将加载后的子数据给当前节点
          this.loading = true
          const load = this.root.loadData(this.data)
          if (load) {
            (Promise).then(data => {
              this.data.children = data
              this.data.loading = true
              this.loading = false
            })
          } else {
            this.loading = false
          }
        }
      }
      this.expanded = !this.expanded
    },

    /**
   * 节点选择处理
   */
    onNodeClick() {
      this.selected = true
      this.root.selected = this
    },

    getParent(target = 'data-tree-node') {
      let parent = this.$parent

      // 向上寻找根节点元素
      while (parent && parent.$options && parent.$options.name !== target) {
        parent = parent.$parent
      }

      return parent
    },

    created() {
      this.root = this.getParent('data-tree')
      this.expanded = this.data.expanded
    },

    mounted() {
      this.root.registerNode(this, this.data)
      this.checked = !!this.data._checked
      if (this.data._selected) this.onNodeClick()
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.component.data-tree-node {
  text-align: left;
  font-size: 14px;

  .node-title {
    &:hover {
      cursor: pointer;
    }
    &.selected {
      background-color: #d5e8fc;
    }
  }
  .icon-box {
    padding-left: 10px;
    > a {
      margin: 0 2px;
    }
  }
}
</style>
