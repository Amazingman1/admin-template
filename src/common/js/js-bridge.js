//  存储值
export const setValue = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

//  获取值
export const getValue = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

//  获取AppType 目前写死 88 模仿小程序
export const getAppType = () => {
  return '88'
}

//  在翼支付内部设置头
export const setTitle = (name) => {
  window.BestpayHtml5.APP.setTitleBar({
    title: {
      text: name, // 标题内容
      fontColor: '#060606' // 标题字体的颜色
    },
    showTopRightButton: false, // 显示、隐藏右上角的按钮。为true时，rightButton为必传项
    hide: false, // 整个titleBar的显示、隐藏
    disableCloseButton: true, // 关闭按钮的显示、隐藏
    backgroundColor: '#ffffff', // 整条title的背景色,
    backButtonColor: '#060606', // 左上角返回按钮颜色，
    closeButtonColor: '#060606', //  关闭按钮颜色,
    scrollAfterColor: '#060606' //  滑动后的颜色
  }, (obj) => { }, (obj) => { }, (obj) => { })
}
//  配置左上角关闭按钮是否可见
export const setCloseButtonVisible = function(isVisible) {
  window.BestpayHtml5.APP.setTitleBar({
    title: {
      text: '', // 标题内容
      fontColor: '#060606' // 标题字体的颜色
    },
    disableCloseButton: isVisible, // 关闭按钮的显示、隐藏
    backgroundColor: '#ffffff', // 整条title的背景色,
    backButtonColor: '#060606', // 左上角返回按钮颜色，
    closeButtonColor: '#060606', //  关闭按钮颜色,
    scrollAfterColor: '#060606' //  滑动后的颜色
  }, (obj) => { }, (obj) => { }, (obj) => { })
}
//  设置右上角事件
export const setTopRightBar = function(obj) {
  window.BestpayHtml5.APP.setTitleBar({
    title: {
      text: obj.title, // 标题内容
      fontColor: '#060606' // 标题字体的颜色
    },
    showTopRightButton: true, // 显示、隐藏右上角的按钮。为true时，rightButton为必传项
    rightButton: {
      text: obj.value, // 右上角的button的内容，类型为text
      fontColor: '#060606', // 右上角字体的颜色
      type: obj.type, // 右上角按钮的类型，text文本类型，pic只支持网络图片，必传字段
      imgUrl: '', // 网络图片的地址,
      onclick: 'rightButtonClick' // 返回按钮点击事件，方法引用,不支持匿名方法
    },
    hide: false, // 整个titleBar的显示、隐藏
    disableCloseButton: true, // 关闭按钮的显示、隐藏
    backgroundColor: '#ffffff', // 整条title的背景色,
    backButtonColor: '#060606', // 左上角返回按钮颜色，
    closeButtonColor: '#060606', // 关闭按钮颜色,
    scrollAfterColor: '#060606' // 滑动后的颜色
  }, (obj) => {}, (obj) => {}, (obj) => {})
}
// 退出应用
export const exitApp = function() {
  if (typeof window.BestpayHtml5 === 'undefined') { return }
  window.BestpayHtml5.APP.exitSubApp({}, function(obj) {
  }, function(obj) {
  }, function(obj) {
  })
}

// 在翼支付app内部获取登录手机号码
export const getProductNo = () => {
  return new Promise((resolve, reject) => {
    window.BestpayHtml5.User.getProductNo({},
      ({ productNo }) => {
        resolve(productNo)
      },
      err => reject(err))
  })
}
// 在翼支付内部获取sessionKey
export const getSessionKey = () => {
  return new Promise((resolve, reject) => {
    window.BestpayHtml5.User.getSessionKey({},
      ({ sessionKey }) => {
        resolve(sessionKey)
      },
      err => reject(err))
  })
}

// 监听返回事件
export const setKeyEventListener = (obj) => {
  window.BestpayHtml5.APP.setTitleBar({
    title: {
      text: '', // 标题内容
      fontColor: '#060606' // 标题字体的颜色
    },
    showTopRightButton: true, // 显示、隐藏右上角的按钮。为true时，rightButton为必传项
    backButton: {
      fontColor: '#060606', // 左上角返回按钮的颜色
      override: true, // 是否截断左上角返回及物理按钮返回
      onclick: 'backButtonClick' // 返回按钮点击事件,方法引用,不使用匿名方法
    },
    hide: false, // 整个titleBar的显示、隐藏
    disableCloseButton: true, // 关闭按钮的显示、隐藏
    backgroundColor: '#ffffff', // 整条title的背景色,
    backButtonColor: '#060606', // 左上角返回按钮颜色，
    closeButtonColor: '#060606', // 关闭按钮颜色,
    scrollAfterColor: '#060606' // 滑动后的颜色
  }, (obj) => {}, (obj) => {}, (obj) => {})
}

