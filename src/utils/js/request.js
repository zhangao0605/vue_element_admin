import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../../store'
import {getToken} from '@/utils/js/token'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://' + window.location.host,
  // baseURL: 'http://192.168.1.108:8200',
  // baseURL: 'http://dahan.thinkey.xyz',
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 10000 // 请求超时时间
})

// // request拦截器
service.interceptors.request.use(
  config => {
    let token = 'Bearer ' + getToken()
    config.headers['content-type'] = 'application/json; charset=utf-8'
    if (store.getters.token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
/**
 * 下面的注释为通过在response里，自定义code来标示请求状态
 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
 * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.data.eCode === undefined || response.data.eCode === '' || response.data.eCode === 201 || response.data.eCode === 0 || response.data.eCode === 1) {/*这里的指如果不存在直接进入error方法*/
      return response.data
    } else {
      // 100001:超时token; 100002:为空;  100003:Token 过期了无效;
      if (res.eCode === 100001 || res.eCode === 100002 || res.eCode === 100003) {
        store.dispatch('login/FedLogOut').then(() => {
          // location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    }
  },
  error => {
    let msg = ''
    if (error == 'Error: timeout of 5000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = error.message
    }
    Message({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
