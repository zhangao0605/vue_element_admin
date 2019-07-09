import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {Message} from 'element-ui'
import {getToken} from './utils/js/token' // getToken from cookie

NProgress.configure({showSpinner: false})// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  NProgress.start()
  if (getToken()) {
    // console.log('有token')
    if (to.path === '/login'||to.path === '/registered'||to.path==='/registered_personal'||to.path==='/registered_enterprise'||to.path==='/reset_password') {
      next({path: '/'})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.username === undefined) {
        store.dispatch('login/GetInfo').then(res => { // 拉取用户信息
          if (from.path == '/' && to.path == '/chain/blockDetails' || from.path == '/login' && to.path == '/chain/blockDetails') {
            next({path: '/chain/chainManagement'})
          } else if (from.path == '/' && to.path == '/chain/transactionDetails' || from.path == '/login' && to.path == '/chain/transactionDetails') {
            next({path: '/chain/chainManagement'})
          } else {
            next()
          }
        }).catch((err) => {
          store.dispatch('login/FedLogOut').then(() => {
            Message.error('请求超时，验证失败，请重新登录！')
            next({path: '/'})
          })
        })
      }
      else {
        if (from.path == '/' && to.path == '/chain/blockDetails' || from.path == '/login' && to.path == '/chain/blockDetails') {
          next({path: '/chain/chainManagement'})
        } else if (from.path == '/' && to.path == '/chain/transactionDetails' || from.path == '/login' && to.path == '/chain/transactionDetails') {
          next({path: '/chain/chainManagement'})
        } else {
          next()
        }

      }
    }
  }else if (to.path == '/registered'||to.path=='/registered_personal'||to.path=='/registered_enterprise'||to.path=='/reset_password') {
    next()
  }  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      let path = '%2Fhome'// 变量path为重新登录后重定向的页面
      next(`/login?redirect=${path}`)
      // next(`/login?redirect=${to.path}`) // 这种写法默认再次登陆后跳到刚刚登出的界面
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
