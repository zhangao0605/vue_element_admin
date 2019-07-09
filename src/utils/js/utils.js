import {getuserchains} from '../../api/interface'
import moment from 'moment'
import CryptoJS from "crypto-js"
export default {
  install(Vue, opt) {
    Vue.prototype.tableHeaderColor = function ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color: #409EFF;color: #fff;font-weight: 500;'
      }
    }
    Vue.prototype.timestampToTime = function (timestamp) {
      let Y, M, D, h, m, s
      let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + '-';
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      D = date.getDate() + ' ';
      h = date.getHours() + ':';
      m = date.getMinutes() + ':';
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
    Vue.prototype.passwordEncryption = function (e) {
      let cipherText =CryptoJS.HmacSHA1(e, '87krsC!IPF@OBRPEOh#Uat9C').toString(CryptoJS.enc.Hex);
      return cipherText;
      // Decrypt 解密
      // let bytes = CryptoJS.AES.decrypt(cipherText, "87krsC!IPF@OBRPEOh#Uat9C");
      // let originalText = bytes.toString(CryptoJS.enc.Utf8);
      // console.log(originalText);
    }
    Vue.prototype.time_change = function (e) {
      // console.log(e)
      let time=''
      if(e == '' || e == null || e == undefined){

        time= ''

      }else {

        time = moment(e* 1000).format( 'YYYY-MM-DD HH:mm:ss')

      }
      // console.log(time)
      return time
    }
  }
}
