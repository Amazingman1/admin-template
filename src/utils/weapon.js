/* eslint-disable */
export function render_list(list, fn) {
  var vnode = []
  try {
    if (list.length === 0) {
      return vnode
    }
    list.forEach((item, index) => {
      vnode.push(fn(item, index))
    })
  } catch (e) {
      console.log(e);
  }
  return vnode
}
export function render_obj(obj, fn) {
  var piece = []
  for (var prop in obj) {
    piece.push(fn(prop, obj[prop]))
  }
  return piece
}
export function getNodeByPath(nodeTree, path) {
  var tem = nodeTree
  for (var i in path) {
    if (i === 0) {
      tem = tem[path[i]]
    } else {
      tem = tem.children[path[i]]
    }
    console.log(tem)
  }
  return tem
}
export function sizeToNum(sizeStr) {
  return parseFloat(sizeStr.replace('px', ''))
}
export function strToNum(str, num) {
  var number = num || 0
  var value = parseFloat(str)
  return parseFloat(value.toFixed(number))
}
export function paseToNodeTree(_data, fields, openIds) {
  var data = _data
  if (!data || data.length === 0) {
    return []
  }
  var defaultFields = {
    id: 'id',
    pId: 'pId',
    url: 'url'
  }
  var fields = Object.assign({}, defaultFields, fields)
  var path_store = {}
  var url_index = {}
  /* 筛选出一级节点*/
  var findAllroot = function(group, nodesAll, fields) {
    var rootNodes = {}
    for (var key in group) {
      var test = true
      for (var i = 0; i < nodesAll.length; i++) {
        var isSelf = false
        for (var j = 0; j < group[key].length; j++) {
          isSelf = group[key][j][fields.id] == nodesAll[i][fields.id]
          if (isSelf) break
        }
        if (isSelf) continue
        test = test && 'path_' + nodesAll[i][fields.id] != key
      }
      if (test) {
        rootNodes[key + ''] = group[key]
      }
    }
    return rootNodes
  }
  /* 修改添加节点属性*/
  var vNodeRender = function(dataList, vNodeGroup, path) {
    for (var index = 0; index < dataList.length; index++) {
      var item = dataList[index]
      if (path) {
        if (path.length == 0) {
          dataList[index].isLeaf = false
          path_store['path_' + dataList[index][fields.id]] = [index]
          if (dataList[index][fields.url]) {
            url_index[dataList[index][fields.url]] = [index]
          }
          dataList[index].level = path.length + 1
          dataList[index].nodePath = [index]
        } else {
          dataList[index].isLeaf = !hasChild(dataList[index], vNodeGroup)
          dataList[index].level = path.length + 1
          path_store['path_' + dataList[index][fields.id]] = path.concat(index)
          url_index[dataList[index][fields.url]] = path.concat(index)
          dataList[index].nodePath = path.concat(index)
        }
      }
    }
  }
  /* 设置展开至顶级节点*/
  var openToRoot = function(nodeTree, ids) {
    ids.forEach((id, index) => {
      var tem = nodeTree
      var path = path_store['path_' + id]
      if (path) {
        path.forEach((item, index) => {
          if (index == 0) {
            tem = tem[item]
          } else {
            tem = tem.children[item]
          }
          tem.open = true
        })
      }
    })
  }
  /* 把节点以parentId分组*/
  var getNodeGroup = function(nodeList) {
    var group = {}
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].open = false
      group['path_' + nodeList[i][fields.pId]] = []
    }
    for (var j = 0; j < nodeList.length; j++) {
      group['path_' + nodeList[j][fields.pId]].push(nodeList[j])
    }
    return group
  }
  var hasChild = function(node, vNodeGroup) {
    if (vNodeGroup) {
      return vNodeGroup.hasOwnProperty('path_' + node[fields.id])
    } else {
      return false
    }
  }
  var main = function(data) {
    if (!data || data.length == 0) {
      return []
    }
    var _this = this
    var rootList = []
    var vNode = []
    var vNodeGroup = {}
    vNodeGroup = getNodeGroup(data)
    // 获取一级节点
    rootList = findAllroot(vNodeGroup, data, fields)
    // 挂载一级级节点
    for (var prop in rootList) {
      vNodeRender(rootList[prop], vNodeGroup, [])
      vNode = vNode.concat(rootList[prop])
    }
    // 删除一级节点，因为一级节点已经进入虚拟DOM树了
    for (var prop in rootList) {
      delete vNodeGroup[prop]
    }
    var usedNode = []
    /* 第一层循环用于保证分组列表里面的每一组都在整个的节点集合中寻找它的父级，
		循环退出的条件是，分组列表里的每一项在当前的路径记录都没有对应的父节点记录*/
    do {
      usedNode = []
      for (var prop in vNodeGroup) {
        // 如果
        if (path_store.hasOwnProperty(prop)) {
          vNodeRender(vNodeGroup[prop], vNodeGroup, path_store[prop])
          var targetNode = getByPath(vNode, path_store[prop])
          usedNode.push(prop)
          if (targetNode) {
            targetNode.children = vNodeGroup[prop]
          }
        }
      }
      usedNode.forEach(function(item) {
        delete vNodeGroup[item]
      })
    } while (vNodeGroup.legnth > 0)
    return { nodeTree: vNode, nodePath: path_store, urlIndex: url_index }
  }
  return main(data)
}
export function condition(cd, fn) {
  return fn(cd)
}
export function fn(_fn) {
  return _fn()
}
export function unique(array) {
  console.log('uni 1', array)
  var n = {}
  var r = []
  var len = array.length
  var val; var type
  for (var i = 0; i < array.length; i++) {
    val = array[i]
    type = typeof val
    if (!n[val]) {
      n[val] = [type]
      r.push(val)
    } else if (n[val].indexOf(type) < 0) {
      n[val].push(type)
      r.push(val)
    }
  }
  console.log('unique', r)
  return r
}
export function arrayEach(arr, fn) {
  var vnode = []
  var node = {}
  arr.forEach((item, index) => {
    node = fn(item, index)
    vnode.push(node)
  })
  return vnode
}
export function getByPath(nodeTree, path) {
  if (!path) {
    return {}
  }
  try {
    var tem = nodeTree
    path.forEach(function(item, index) {
      if (index == 0) {
        if (tem.hasOwnProperty(item)) {
          tem = tem[item]
        }
      } else {
        tem = tem.children[item]
      }
    })
    return tem
  } catch (e) {
    console.log(e)
    return {}
  }
}
export function getParents(nodeTree, path) {
  var parents = []
  var _path = []
  if (path.length < 2) {
    return []
  }
  path.forEach(function(item) {
    _path.push(item)
    parents.push(getByPath(nodeTree, _path))
  })
  return parents
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function formatTime(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

export function getNeeded(obj1, obj2) {
  for (var prop in obj1) {
    if (obj2.hasOwnProperty(prop)) {
      obj1[prop] = obj2[prop]
    }
  }
}

export function formatYMDHMD(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatLineChart(title, data) {
  return {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: data.map(function(item) {
        return item[0]
      })
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    toolbox: {
      left: 'center',
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [{
      startValue: '2014-06-01'
    }, {
      type: 'inside'
    }],
    visualMap: {
      top: 10,
      right: 10,
      pieces: [{
        gt: 0,
        lte: 50,
        color: '#096'
      }, {
        gt: 50,
        lte: 100,
        color: '#ffde33'
      }, {
        gt: 100,
        lte: 150,
        color: '#ff9933'
      }, {
        gt: 150,
        lte: 200,
        color: '#cc0033'
      }, {
        gt: 200,
        lte: 300,
        color: '#660099'
      }, {
        gt: 300,
        color: '#7e0023'
      }],
      outOfRange: {
        color: '#999'
      }
    },
    series: {
      name: title,
      type: 'line',
      data: data.map(function(item) {
        return item[1]
      }),
      markLine: {
        silent: true,
        data: [{
          yAxis: 50
        }, {
          yAxis: 100
        }, {
          yAxis: 150
        }, {
          yAxis: 200
        }, {
          yAxis: 300
        }]
      }
    }
  }
}

// 减法函数
export function subtr(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  // last modify by deeka
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
