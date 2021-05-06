<template>
  <section class="component data-box">
    <div v-if="showTopSlot" class="row between-span">
      <div>
        <slot name="buttons" />
      </div>
      <div>
        <slot name="append" />
      </div>
    </div>
    <div class="table">
      <el-table
        ref="table"
        :row-class-name="rowClassName"
        :show-summary="showsummary"
        :empty-text="emptyText"
        :height="tableHeight()"
        :max-height="maxHeight"
        tooltip-effect="light"
        :data="data"
        border
        :highlight-current-row="selectionRow!=undefined"
        :span-method=" customSpanMethod ? customSpanMethod : spanMethod "
        :stripe="stripe"
        :row-style="rowStyle"
        @current-change="updateSelectionRow"
        @select="updateSelectionList"
        @select-all="updateSelectionList"
        @sort-change="onSortChange"
        @row-click.self="onRowClick"
      >
        <el-table-column v-if="selectionList" type="selection" width="50" />
        <el-table-column v-if="!hiddenIndex" type="index" :label="indexLabel" width="50" />
        <slot name="columns" />
      </el-table>
    </div>
    <div class="row between-span">
      <div class="databox-title">
        <slot name="footer" />
      </div>
      <div class="pageInfoCss">
        <el-pagination
          v-if="showPage&&page&&data&&data.length>0"
          size="small"
          :layout="page.layout"
          :total="page.total"
          :current-page.sync="page.pageIndex"
          :page-size.sync="page.pageSize"
          :page-sizes="page.pageSizeOpts"
          @size-change="pageSizeChange"
          @current-change="pageIndexChange"
        />
      </div>

    </div>
  </section>
</template>
<style>
  .pageInfoCss{
    width: 100%;
    box-sizing: border-box;
     display: flex;
    justify-content: center;
    margin-top: 10px;

  }

  .pageInfoCss .el-input .el-input__inner{
    height: 30px!important;
    line-height: 30px!important;
  }
   .pageInfoCss .el-input .el-input__icon{
    height: 30px!important;
    line-height: 30px!important;
  }
</style>

<script>

export default {
  props: {
    // 数据列表
    data: {
      type: Array,
      default: () => []
    },
    // 分页数据
    page: {
      type: Object,
      default: () => {}
    },
    // 隐藏分页

    showPage: {
      type: Boolean,
      default: false
    },
    // 分页数据
    sort: {
      type: Object,
      default: () => {}
    },
    // 选择列表
    selectionList: {
      type: Array,
      default: () => []
    },
    // 选择项
    selectionRow: {
      type: Object,
      default: () => {}
    },

    maxHeight: {
      type: Number,
      default: 528
    },
    height: {
      type: Number,
      default: 0
    },
    hiddenIndex: {
      type: Boolean,
      default: false
    },

    // 用来判断是否合并单元格
    isSpan: {
      type: Boolean,
      default: false
    },

    indexLabel: {
      type: String,
      default: '序号'
    },
    // 列样式
    rowClassName: {
      type: Function,
      default: () => ''
    },
    // 斑马线
    stripe: {
      type: Boolean,
      default: true
    },

    // 合并行对应的键
    rowSpanKey: {
      type: String,
      default: ''
    },

    showsummary: {
      type: Boolean,
      default: false
    },

    /**
   * 是否展示caseMark
   */
    showCaseMark: { type: Boolean, default: false },

    customSpanMethod: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
  /**
   * 监听绑定数据变化
   */
    onDataChanged: (newVal, oldVal) => {
      if (!this.data.length && this.page) {
        if (this.page.totalPage < this.page.pageIndex && this.page.totalPage > 0) {
          this.page.pageIndex = this.page.totalPage
          setTimeout(() => {
            this.pageConfigChange(this.page)
          }, 500)
        }
      }
    },
    onSelectionRowChange: (val, oldVal) => {
      this.$nextTick(() => {
        this.table.setCurrentRow(val)
      })
    },
    /**
   * 组件初始化
   */
    mounted() {
      this.table = this.$refs['table']
    },
    methods: {
      /**
   *  清除选择项
   */
      clearSelection() {
        this.table.clearSelection()
        this.table.setCurrentRow()
      },

      // 分页信息改变消息

      pageConfigChange(page) { },
      // 更新选择项列表
      updateSelectionList(list) { },
      // 更新当前选择项
      updateSelectionRow(row) { },

      tableHeight() {
        if (this.height === '') {
          return this.maxHeight
        } else {
          return this.height
        }
      },

      showTopSlot() {
        return this.$slots.buttons || this.$slots.append
      },

      emptyText() {
        return this.data ? '暂无数据' : ' '
      },

      /**
   * 页码数量变化回调
   */
      pageSizeChange(value) {
        this.page.pageIndex = 1
        this.page.pageSize = value
        this.pageConfigChange(this.page)
      },

      /**
   * 页码位置变化回调
   */
      pageIndexChange(value) {
        this.page.pageIndex = value
        this.pageConfigChange(this.page)
      },

      /**
   * 排序改变
   */
      onSortChange({ column, prop, order }) {
        if (this.sort) {
          this.sort.update(prop, order)
          this.pageConfigChange(this.page)
        }
      },

      /**
   * 设置行背景色 使用已经配置的CaseMark Enum
   */
      rowStyle({ row }) {
        if (!this.showCaseMark) return null
        if (!row.caseMark) return null
        const marker = []
        // const marker = CaseMarkColor.find(v => v.value === row.caseMark)
        if (!marker) return null
        return {
          backgroundColor: marker.color
        }
      },

      spanMethod({ row, column, rowIndex, columnIndex }) {
        if (!this.rowSpanKey) return
        const columnProperty = this.rowSpanKey
        if (column.property !== columnProperty) return
        // 当前单元格的值
        const currentValue = row[columnProperty]
        const span = {
          rowspan: 0,
          colspan: 0
        }
        const beforRow = rowIndex > 0 ? this.data[rowIndex - 1] : null
        if (beforRow && beforRow[columnProperty] === currentValue) return span

        // 如果当前单元格的值与上一行的对应单元格的值一致，则合并行已经计算过
        span.colspan = 1
        span.rowspan = 1
        let nextRowIndex = rowIndex + 1
        while (nextRowIndex < this.data.length) {
          // 如果下一行对应单元格的值与当前单元格的值一致
          const nextRowValue = this.data[nextRowIndex][columnProperty]
          if (nextRowValue === currentValue) span.rowspan += 1
          nextRowIndex += 1
        }
        return span
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.component.data-box {
  padding: 10px;
  & > * {
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.data-box.component {
  $line-height: 26px;
  .el-input-number {
    line-height: $line-height;
    width: inherit;
    &__decrease,
    &__increase {
      height: calc($line-height - 2px);

      width: 35px;
    }
    &__increase {
      right: 5px;
    }
    &__decrease {
      left: 5px;
    }
  }
}
</style>
