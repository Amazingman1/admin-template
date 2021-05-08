/* eslint-disable */
import axios from 'axios'
// import CryptoJS from 'crypto-js/crypto-js'
// import { Alert } from 'element-ui'
// import { Toast, Dialog } from 'vant'
// import { EnvConfig } from '../../config/apiconfig'
// import { setValue, getValue, getAppType } from '../../common/js/js-bridge'
import publicPlatformUtil from '../../common/publicplatform/util'

// 获取URL上拼接的单独参数
export const getParam = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).replace(/\$/g, "=").replace(/@/g, "&").match(reg); //获取get参数字窜，与正在匹配
  if (r !== null) {
    return decodeURI(r[2]);
  } else {
    return null; //传递中文参数时候，需要使用encodeURI()进行编码
  }
}
export const system = /iP(ad|hone|od)/.test(navigator.userAgent) ? 'ios' : 'android'

export const getUUID = () => {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  let uuid = s.join('')
  return uuid
}
// 加密
export const encryptToJava = (data, key = 'abcdefgabcdefg33') => {
  try {
    return window.CryptoJS.AES.encrypt(data, window.CryptoJS.enc.Utf8.parse(key), { mode: window.CryptoJS.mode.ECB, padding: window.CryptoJS.pad.Pkcs7 }).toString()
  } catch (e) {
    return ''
  }
}

// 解密
export const decryptToJava = (data, key = 'abcdefgabcdefg33') => {
  try {
    return window.CryptoJS.AES.decrypt(data, window.CryptoJS.enc.Utf8.parse(key), { mode: window.CryptoJS.mode.ECB, padding: window.CryptoJS.pad.Pkcs7 }).toString(window.CryptoJS.enc.Utf8)
  } catch (e) {
    return ''
  }
}

// base64解码
export const encode = (input) => {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = _utf8_encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
}

// base64加密
export const decode = (input) => {
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = _utf8_decode(output);
  return output;
}

// 获取当前时间
export const getCustomerTime = (flag, isMill) => {
  let date = new Date();
  let yy, MM, dd, hh, mm, ss, ms;
  yy = flag ? (date.getFullYear() + '') : (date.getYear() + '').substr(1, 2);
  MM = (date.getMonth() + 1) + '';
  MM = MM.length < 2 ? '0' + MM : MM;
  dd = (date.getDate()) + '';
  dd = dd.length < 2 ? '0' + dd : dd;
  hh = date.getHours() + '';
  hh = hh.length < 2 ? '0' + hh : hh;
  mm = date.getMinutes() + '';
  mm = mm.length < 2 ? '0' + mm : mm;
  ss = date.getSeconds() + '';
  ss = ss.length < 2 ? '0' + ss : ss;
  ms = date.getMilliseconds() + '';
  if (isMill) {
    let _msLength = (ms + '').length;
    if (_msLength === 0) {
      ms == '000';
    } else if (_msLength == 1) {
      ms = '00' + ms;
    } else if (_msLength == 2) {
      ms = '0' + ms;
    }
    return yy + MM + dd + hh + mm + ss + ms;
  }
  return yy + MM + dd + hh + mm + ss;
}
// 弹框支持回调
/* 由于this指向问题，使用前先保存this指向，后续优化 */
export const showAlert = (data) => {
  let success = typeof data.success !== undefined ? data.success : undefined
  Dialog.alert({
    title: data.title,
    message: data.content,
    confirmButtonspan: '我知道了',
    confirmButtonColor: '#1AC297'
  }).then(() => {
    if (data.success) {
      data.success && data.success()
    }
  })
  // return
}

// 使用token换取新sessionKey
export function getNewToken(api, params) {
  return new Promise(async function (resolve, reject) {
    const Request = axios.create({
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    const publicKeyParams = {
      platform: 'publicKey',
      requestType: 'H5',
      productNo: getValue('loginProductNo')
    }
    let baseURL = EnvConfig.interfaceUrl + 'mapi/applyLoginFactor'
    // 先调用公钥接口
    Request.post(baseURL, publicKeyParams).then(function (res) {
      setValue('publicKey', res.data.result.nonce)
      let tokenApi = EnvConfig.interfaceUrl + 'mapi/cf/publicStageMini/tokenLoginEncMUA'
      let param = {
        requestSystem: system,
        productNo: getValue('loginProductNo'),
        appVersion: '1.1.0',
        traceLogId: getUUID(),
        appType: getAppType(),
        loginToken: getValue('loginToken')
      };
      let tokenData = publicPlatformUtil.buildCAParams(JSON.stringify(param))
      // 再调用获取token接口
      Request.post(tokenApi, tokenData).then(function (value) {
        let resResult = {
          result: value.data.result,
          success: value.data.success,
          errorCode: value.data.errorCode,
          errorMsg: value.data.errorMsg,
        }
        resolve(resResult)
      })
    })
  })
}




// 截取参数非解密方法
export const getURLParam = (res) => {
  let url = res ? res : window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = tempArr[0];
      let val = tempArr[1];
      obj[key] = val;
    });
  }
  return obj;
}

/**
 * [fenToyuan]
 * 分转化元的工具函数。
 * */
export const fenToyuan = (val) => {
  val = val || "0";
  var result, re = /^[\+|-]?[0-9]+$/;
  if (typeof(val) != "string") {
      val = val.toString()
  }
  return (re.test(val)) ? (parseFloat(val) / 100).toFixed(2) : "0.00";
}

/**
 * base64 加密
 * @param {*} str
 */
 export const base64enc = (str)=>{
  var val=CryptoJS.enc.Utf8.parse(str);
  return CryptoJS.enc.Base64.stringify(val);
}
/**
 * base64 解密
 * @param {*} str
 */
 export const base64dec = (str)=>{
  var words = CryptoJS.enc.Base64.parse(str);
  return words.toString(CryptoJS.enc.Utf8);
}

export default function (Vue) {
  //添加全局API
  Vue.prototype.$util = {
    decryptToJava,
    encryptToJava,
    getUUID,
    getCustomerTime,
    decode,
    encode,
    showAlert,
    Toasts,
    userTypeMap,
    orderStateFormat,
    getParam,
    getURLParam,
    txnStatus,
    fenToyuan
  }
}
