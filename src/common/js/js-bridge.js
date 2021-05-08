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

