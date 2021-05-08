/* eslint-disable */
import { JSEncrypt } from './jsencrypt'
import { GibberishAES } from './gibberish-aes'
import {MD5} from './crypto-js.js';
import { getValue, getAppType } from '../js/js-bridge'
import { getUUID, system } from '../js/util';
export default {
  RSA() {
    return {
      generateMixed: function () {
        var num = ''
        for (var i = 0; i < 16; i++) {
          var id = Math.floor(Math.random() * 10)
          num += id
        }
        return num
      },

      AES_EncodeForCA: function (plain_text, key) {
        GibberishAES.size(128);
        return GibberishAES.aesEncrypt(plain_text, key);
      },

      h5CommonRsa: function (publicKey, randomKey) {
        var RSAUtils = new JSEncrypt()
        RSAUtils.setPublicKey(publicKey)
        var ekey = RSAUtils.encrypt(randomKey)
        return ekey;
      },
      // 还需要一个MD5的函数,
      h5MD5: function (text) {
        // console.log(CryptoJS, 'CryptoJS');
        var sign = MD5(text).toString().toUpperCase()
        return sign
      },

      AES_Decrypt: function (plain_text, key) {
        GibberishAES_.size(128);
        return GibberishAES_.aesDecrypt(plain_text, key);
      },
      RSA_Encode: function (key) {
        return RSAUtils.encrypt(key);
      },
      RSA_decode: function (text) {
        return RSAUtils.decrypt(text);
      }
    }
  },
  // 参数加密
  buildCAParams(paramStr) {
    console.log(paramStr)
    let rsa = rsa || new this.RSA();
    // return
    // 生成随机数 16位的随机数key；
    let rk = rsa.generateMixed();

    // 将从开发平台请求回来的公钥获取 这个存储方式待定
    let publicKey = getValue('publicKey')
    // console.log('传给开放平台traceLogId参数:')

    // 使用 h5CommonRsa 方法 使用公钥和随机数进行加密
    let erk = rsa.h5CommonRsa(publicKey, rk);
    // 使用 AES_EncodeForCA 对入参字符串 和随机数进行加密 并去除换行符
    let edata = rsa.AES_EncodeForCA(paramStr, rk).replace(/\n/g, '');
    // 使用 h5MD5 方法加密一个参数字符串。
    let sign = rsa.h5MD5(paramStr);
    // 生成最终的入参
    let finalParam = {
      'data': edata,
      'key': erk,
      'sign': sign,
      'productNo': getValue('loginProductNo'),
      'requestSystem': system,
      'sessionKey': getValue('loginSessionKey'),
      'traceLogId': getUUID(),
      'appType': getAppType(),
    }
    console.log('传给开放平台traceLogId参数:' + finalParam.traceLogId)
    // 将拼装的参数返回出去
    return finalParam
  }
}
