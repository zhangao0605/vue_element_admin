import {login, logout, getInfo} from '@/api/interface'
import {getToken, setToken, removeToken} from '@/utils/js/token'
import {Message} from 'element-ui'

const state = {
  token: getToken(),
  roles: {},
  /*所有的chainids*/
  chainIds: [],
  /*选中chainid意味着导航栏选中那条交易链*/
  select_chainId: 0,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_CHAINOD: (state, id) => {
    state.chainIds = id
  },
  SET_SELECT_CHAINOD: (state, id) => {
    state.select_chainId = id
  }

}

const actions = {
  setChaidId({commit}, id) {
    return commit('SET_CHAINOD', id)
  },
  setSelectChaidId({commit}, id) {
    return commit('SET_SELECT_CHAINOD', id)
  },
  // 登录
  Login({commit}, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        if (response.eCode == 201) {
          Message({
            message: '用户名或密码错误！请确认后再次登录！',
            type: 'error',
            duration: 3 * 1000
          })
        } else {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
        }

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response
        if (data) {
          commit('SET_ROLES', data)
        } else {
          reject('getInfo:')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
  ,

// 登出
  LogOut({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', {})
        commit('SET_CHAINOD', [])
        commit('SET_SELECT_CHAINOD', 0)
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
  ,

// 前端 登出
  FedLogOut({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_TOKEN', '')
      commit('SET_ROLES', {})
      commit('SET_CHAINOD', [])
      commit('SET_SELECT_CHAINOD', 0)
      removeToken()
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
