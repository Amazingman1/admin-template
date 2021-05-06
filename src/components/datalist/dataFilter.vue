/* eslint-disable no-unreachable */
/* eslint-disable */
<script>
import * as weapon from '@/utils/weapon.js'
import './dataFilter.scss'
import moment from 'moment'
export default {
  name: 'DataFilter',
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    expandSwitch: {
      type: Boolean,
      default: true
    },
    isShowAll: {
      type: Boolean,
      default: false
    },
    isHedden: {
      type: Boolean,
      default: false
    },
    filterAction: {
      type: null,
      default: ''
    },
    sessionStorageFilterKey: {
      type: String,
      default: ''
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
      value6: '',
      showAll: false,
      usedFilter: [],
      date: '',
      filterForm: {},
      filterAnimateType: false,
      filtersIsShow: true,
      usedFilterIsShow: false,
      emitAvailable: false,
      expand: false
    }
  },
  computed: {
    filterList() {
      const _list = []
      this.filters.forEach(item => {
        _list.push(
          Object.assign(
            {
              value: ''
            },
            item
          )
        )
      })

      return _list
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path !== from.path) {
          this.handleReset(true)
        }
      },
      deep: true
    },
    filterList: {
      handler(newData) {
        var filter = {}
        // console.log(newData, 123);
        newData.forEach((item, index) => {
          if (item.value) {
            if (Array.isArray(item.field)) {
              item.field.forEach((key, index) => {
                filter[key] = item.value[index]
              })
            } else {
              filter[item.field] = item.value
            }
          }
        })
        this.paramsFilter = filter
        if (this.emitAvailable) {
          this.$emit('do-filter', this.paramsFilter)
          this.emitAvailable = false
        }
      },
      deep: true
    }
  },
  created() {},
  beforeMount() {
    var usedFilter
    if ((usedFilter = sessionStorage.getItem(this.sessionStorageFilterKey))) {
      this.usedFilter = JSON.parse(usedFilter)
    }
    for (const index in this.usedFilter) {
      this.$set(
        this.filterForm,
        this.usedFilter[index].prop,
        this.usedFilter[index].value
      )
    }
  },
  methods: {
    handleDateTimeRangeInput(index, arr) {
      var dateFormate = []
      var tem = ''
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          if (item) {
            tem = moment(item).format('YYYY-MM-DD hh:mm:ss')
            dateFormate.push(tem)
          } else {
            this.$set(this.filterList[index], 'value', [])
          }
        })
        this.$set(this.filterList[index], 'value', dateFormate)
      }
      this.$forceUpdate()
    },
    handleDateRangeInput(index, arr) {
      var dateFormate = []
      var tem = ''
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          if (item) {
            tem = moment(item).format('YYYY-MM-DD')
            dateFormate.push(tem)
          } else {
            this.$set(this.filterList[index], 'value', [])
          }
        })
        this.$set(this.filterList[index], 'value', dateFormate)
      } else {
        this.$set(this.filterList[index], 'value', '')
      }
      this.$forceUpdate()
    },
    handleYearInput(index, val) {
      if (val) {
        if (this.filterList[index].dateType === 'year') {
          this.$set(
            this.filterList[index],
            'value',
            new Date(val).getFullYear()
          )
        } else {
          var dateFormate = moment(val).format('YYYY')
          this.$set(this.filterList[index], 'value', dateFormate)
        }
      } else {
        this.$set(this.filterList[index], 'value', '')
      }
      this.$forceUpdate()
    },
    handleDateInput(index, val) {
      if (val) {
        if (this.filterList[index].dateType === 'month') {
          this.$set(this.filterList[index], 'value', [
            new Date(val).getFullYear(),
            new Date(val).getMonth() + 1
          ])
        } else {
          var dateFormate = moment(val).format('YYYY-MM-DD')
          this.$set(this.filterList[index], 'value', dateFormate)
        }
      } else {
        this.$set(this.filterList[index], 'value', '')
      }
      this.$forceUpdate()
    },
    handleFilter(appendFileds = {}) {
      var filter = {}
      this.filterList.forEach((item, index) => {
        if (item.value) {
          if (Array.isArray(item.field)) {
            item.field.forEach((key, index) => {
              filter[key] = item.value[index]
            })
          } else {
            filter[item.field] = item.value
          }
        }
      })
      this.paramsFilter = { ...filter, ...appendFileds }
      this.usedFilterIsShow = true
      this.usedFilter = []
      this.filterList.forEach((item, index) => {
        if (this.filterForm[item.prop] !== '') {
          this.usedFilter.push(item)
        }
        this.filterForm[item.prop] = item.value
      })
      sessionStorage.setItem(
        this.sessionStorageFilterKey,
        JSON.stringify(this.usedFilter)
      )
      this.$emit('do-filter', this.paramsFilter)
    },
    filterShowAll() {
      this.$emit('do-filter-showAll')
      console.log('filterShowAll =====', this.isShowAll)
      this.expand = !this.expand
    },
    handleReset(justReset = false) {
      for (const prop in this.filterForm) {
        this.filterForm[prop] = ''
      }
      this.usedFilterIsShow = false
      this.filterList.forEach((item, index) => {
        console.log(item, 'iten')
        this.$set(item, 'value', '')
        this.$forceUpdate()
      })
      if (!justReset) {
        this.$emit('do-filter', this.paramsFilter)
      }
    },
    handleInput(index, val) {
      this.$set(this.filterList[index], 'value', val)
      this.$forceUpdate()
    },
    handleInputrangemin(index, val) {
      this.$set(this.filterList[index], 'value', val)
      this.$forceUpdate()
    },
    handleInputrangemax(index, val) {
      console.log(index, val, 666)
      this.$set(this.filterList[index], 'value', val)
      this.$forceUpdate()
    },
    handleCascaderSelect(index, val) {
      this.$set(this.filterList[index], 'value', val)
    },
    listToggleShow() {
      this.filterAnimateType = !this.filterAnimateType
      this.filtersIsShow = true
      this.showAll = !this.showAll
    },
    handleHidefilters() {
      this.filterAnimateType = false
    },
    animationEnd1() {
      this.filtersIsShow = this.filterAnimateType
    },
    handelFilterDel(index) {
      this.emitAvailable = true
      this.$set(this.filterList[index], 'value', '')
    }
  },
  render(h) {
    return (
      <div class='data-filter'>
        <div class={['filter-list', { showAll: this.isShowAll }]}>
          <form ref='filterForm'>
            {
              weapon.arrayEach(this.filterList, (item, index) => {
                switch (item.type) {
                  case 'input':
                    return (
                      <div class='filter-item'>
                        <label>{item.label}</label>
                        <el-input
                          class='item-content'
                          clearable={true}
                          name={item.field}
                          value={item.value}
                          size={item.size}
                          placeholder={item.placeholder}
                          on-input={this.handleInput.bind(this, index)}
                        />
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'inputrange':
                    if (item.isSeparated) {
                      return (
                        <div class='filter-item index'>
                          <label>{item.label}</label>
                          <el-input
                            class='item-content'
                            name={item.field}
                            value={item.value}
                            size={item.size}
                            type='number'
                            on-input={this.handleInputrangemax.bind(this, index)}
                          />
                          <span>{item.isSeparated ? '~' : ''}</span>
                        </div>
                      )
                    } else {
                      return (
                        <div class='filter-item index2'>
                          <label>{item.label}</label>
                          <el-input
                            class='item-content'
                            name={item.field}
                            value={item.value}
                            size={item.size}
                            type='number'
                            on-input={this.handleInputrangemin.bind(this, index)}
                          />
                        </div>
                      )
                    }
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'select':
                    return (
                      <div class='filter-item'>
                        <label>{item.label}</label>
                        <el-select
                          class='item-content'
                          clearable
                          on-input={this.handleInput.bind(this, index)}
                          name={item.field}
                          value={item.value}
                          size={item.size}
                          // 2020 7 30 lzf为了实现个搜索功能，加了个属性。
                          filterable={item.filterable}
                          placeholder={item.placeholder || '请选择'}
                        >
                          {item.options
                            ? weapon.arrayEach(item.options, (option, index) => {
                              let label = null
                              let value = null
                              if (typeof (option) === 'object') {
                                label = option.label
                                value = option.value
                              } else {
                                label = option
                                value = option
                              }
                              return (
                                <el-option
                                  label={label}
                                  value={value}
                                  key={value}
                                />
                              )
                            })
                            : ''}
                        </el-select>
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'tree':
                    return (
                      <div class='filter-item'>
                        <label>{item.label}</label>
                        <el-cascader
                          options={item.options}
                          show-all-levels={false}
                          value={item.value}
                          props={item.props}
                          size={item.size}
                          on-input={this.handleCascaderSelect.bind(this, index)}
                        />
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'date':
                    return (
                      <div class='filter-item'>
                        <label>{item.label}</label>
                        <el-date-picker
                          class='item-content'
                          editable={false}
                          type={item.dateType || 'date'}
                          on-input={this.handleDateInput.bind(this, index)}
                          value={item.value}
                          size={item.size}
                          picker-options={item.option || {}}
                          placeholder='选择日期'
                        />
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'year':
                    return (
                      <div class='filter-item'>
                        <label>{item.label}</label>
                        <el-date-picker
                          editable={false}
                          value={item.value}
                          size={item.size}
                          type={item.dateType || 'year'}
                          on-input={this.handleYearInput.bind(this, index)}
                          placeholder='选择年'
                        />
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'daterange':
                    return (
                      <div class='filter-item filter-item-daterange'>
                        <label>{item.label}</label>
                        <el-date-picker
                          class='range-width'
                          editable={false}
                          value={item.value}
                          type='daterange'
                          size={item.size}
                          start-placeholder='开始日期'
                          end-placeholder='结束日期'
                          placeholder='选择日期范围'
                          range-separator=' ~ '
                          on-input={this.handleDateRangeInput.bind(this, index)}
                        />
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'datetimerange':
                    return (
                      <div class='filter-item'>
                        <label>{item.label}</label>
                        <el-date-picker
                          editable={false}
                          value={item.value}
                          type='datetimerange'
                          value-format='yyy-MM-dd hh:mm:ss'
                          start-placeholder='开始时间'
                          end-placeholder='结束时间'
                          placeholder='选择时间范围'
                          range-separator=' 至 '
                          size={item.size}
                          on-input={this.handleDateTimeRangeInput.bind(
                            this,
                            index
                          )}
                        />
                      </div>
                    )
                    // eslint-disable-next-line no-unreachable
                    break

                  default:
                    break
                }
                // return this.finalHtml
              })
            }
          </form>
        </div>
        {this.isHedden ? (
          <div>
            <el-button
              type='primary'
              class='btn-doFilter cz'
              on-click={this.handleReset}
            >
              重置
            </el-button>
            <el-button
              type='primary'
              class='btn-doFilter'
              on-click={() => this.handleFilter()}
            >
              查询
            </el-button>
            <el-button plain class='btn-doFilter' on-click={this.filterShowAll}>
              {!this.isShowAll ? '展开' : '收起'}
            </el-button>

            {this.otherFunc.map(val => (
              <el-button
                type={val.type || 'primary'}
                class='btn-doFilter'
                on-click={val.func}
              >
                {val.text}
              </el-button>
            ))}
            {this.langOtherFunc.map(val => (
              <el-button
                type={val.type || 'primary'}
                class='btn-doFilter-lang'
                on-click={val.funcLang}
              >
                {val.text}
              </el-button>
            ))}
            {this.expandSwitch ? (
              <span
                class='expand g-link'
                style='margin-left: 15px; color: #E6001F;cursor:pointer'
                on-click={this.filterShowAll}
              >
                {this.expand ? '收起' : '展开'}
                <i
                  class={[
                    'fa',
                    !this.expand ? 'fa-angle-down' : 'fa fa-angle-up'
                  ]}
                ></i>
              </span>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div>
            <el-button
              type='primary'
              class='btn-doFilter cz'
              on-click={this.handleReset}
            >
              重置
            </el-button>
            <el-button
              type='primary'
              class='btn-doFilter'
              on-click={() => this.handleFilter()}
            >
              查询
            </el-button>

            {this.otherFunc.map(val => (
              <el-button
                type={val.type || 'primary'}
                class='btn-doFilter'
                on-click={val.func}
              >
                {val.text}
              </el-button>
            ))}
            {this.langOtherFunc.map(val => (
              <el-button
                type={val.type || 'primary'}
                class='btn-doFilter-lang cz btn-doFilter'
                on-click={val.funcLang}
              >
                {val.text}
              </el-button>
            ))}
            {this.expandSwitch ? (
              <span
                class='expand g-link'
                style='margin-left: 15px; color: #E6001F;;cursor:pointer'
                on-click={this.filterShowAll}
              >
                {this.expand ? '收起' : '展开'}
                <i
                  class={[
                    'fa',
                    !this.expand ? 'fa-angle-down' : 'fa fa-angle-up'
                  ]}
                ></i>
              </span>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    )
  }
}
</script>

<style scoped>
</style>
