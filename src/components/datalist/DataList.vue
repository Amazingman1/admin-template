<template>
  <div class="data-list clearfix">
    <data-filter
      v-if="filters.length!=0"
      ref="datafilter"
      :filters="filters"
      :is-show-all="isShowAll"
      :is-hedden="isHedden"
      :expand-switch="expandSwitch"
      :other-func="otherFunc"
      :lang-other-func="langOtherFunc"
      @do-filter-showAll="doFilterShowAll"
      @do-filter="doFilter"
    />
    <slot />
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="pageNum"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import DataFilter from './dataFilter.vue'
export default {
  name: 'DataList',
  components: {
    [DataFilter.name]: DataFilter
  },
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    isShowAll: {
      type: Boolean,
      default: false
    },
    isHedden: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Object,
      default() {
        return {
          PAGE_SIZE: 'pageSize',
          PAGE_NUMBER: 'pageNum'
        }
      }
    },
    total: {
      type: Number,
      default: 0
    },
    otherFunc: {
      type: Array,
      default: () => []
    },
    langOtherFunc: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageNum: 1,
      defaultPageSize: 10,
      pageSize: this.defaultPageSize,
      pageSizes: [5, 10, 20, 30],
      paramsFilter: {},
      expandSwitch: false,
      // 定义防抖定时器回执
      debounceTimer: null,
      // 定义防抖开关
      debounceFlag: true
    }
  },
  computed: {},
  watch: {
    $route: {
      handler(to, from) {
        if (to.path !== from.path) {
          this.paramsFilter = {}
        }
        this.handleRoute(to)
      },
      deep: true
    }
  },
  created() {
    this.handleRoute(this.$route)
  },
  mounted() {
    this.getclientwidth()
    var _this = this
    window.onresize = function() {
      _this.getclientwidth()
    }
  },
  methods: {
    sortQuery(appendFileds = {}) {
      this.$refs.datafilter.handleFilter(appendFileds)
    },
    getclientwidth() {
      if (this.filters.length > 4 && document.body.clientWidth >= 1100) {
        this.expandSwitch = true
      } else if (this.filters.length > 3 && document.body.clientWidth < 1180) {
        this.expandSwitch = true
      } else {
        this.expandSwitch = false
      }
    },
    setRoutePage() {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      })
    },
    refresh() {
      var data = Object.assign(
        {
          pageSize: this.pageSize,
          pageNo: this.pageNum
        },
        this.paramsFilter
      )
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNo
      delete data.pageSizes
      delete data.pageNo

      this._refresh(data)
    },
    doFilter(paramsFilter) {
      this.paramsFilter = paramsFilter
      var data = Object.assign(
        {
          pageSize: this.pageSize,
          pageNo: 1
        },
        this.paramsFilter
      )
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNo
      delete data.pageSizes
      delete data.pageNo
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, {
          pageNum: 1
        })
      })

      this._refresh(data)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, {
          pageNum: this.$route.query.pageNum,
          pageSize: val
        })
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, {
          pageNum: val,
          pageSize: this.$route.query.pageSize
        })
      })
    },
    handleRoute(route) {
      if (this.uuid && this.activeUUid && this.uuid !== this.activeUUid) {
        return
      }
      var pgsizeSting = this.pageSizes.toString()
      var page = Object.assign(
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        route.query
      )
      page.pageNum = Number(page.pageNum)
      if (!page.pageNum || typeof (page.pageNum) !== 'number') {
        page.pageNum = this.pageNum
      } else {
        this.pageNum = Number(page.pageNum)
      }
      if (!page.pageSize || typeof (page.pageNum) !== 'number') {
        if (pgsizeSting.indexOf(page.pageSize) === -1) {
          page.pageSize = this.defaultPageSize
          this.$router.replace({
            name: route.name,
            query: Object.assign({}, this.$route.query, {
              pageSize: page.pageSize,
              pageNum: page.pageNum
            })
          })
          return false
        } else {
          this.pageSize = Number(page.pageSize)
        }
      } else {
        this.pageSize = Number(page.pageSize)
      }
      if (isNaN(route.query.pageSize) || isNaN(route.query.pageNum)) {
        this.$router.replace({
          name: route.name,
          query: Object.assign({}, this.$route.query, {
            pageSize: page.pageSize,
            pageNum: page.pageNum || 1
          })
        })
        return false
      }

      var data = Object.assign(
        {
          pageSize: page.pageSize,
          pageNo: page.pageNum
        },
        this.paramsFilter
      )
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNo
      delete data.pageSizes
      delete data.pageNo
      this._refresh(data)
    },
    // 刷新接口-防抖版
    _refresh(data) {
      clearTimeout(this.debounceTimer)
      if (this.debounceFlag) {
        this.$emit('data-refresh', data)
        this.debounceFlag = false
      }
      this.debounceTimer = setTimeout(() => {
        this.debounceFlag = true
      }, 500)
    },
    executeFilt() {
      this.$refs.datafilter.handleFilter()
      this.$refs.datafilter.isShowAll()
    },
    doFilterShowAll() {
      this.$emit('data-showAll')
    }
  }
}
</script>

<style>
</style>
