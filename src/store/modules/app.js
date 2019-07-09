import {getLanguage} from '@/i18n/langs/index'
import Cookies from 'js-cookie'

const state = {
  language: getLanguage(),
  resturantName: '1',
  blockData: {},
  transactionData: {},
  upload_url:'http://' + window.location.host+'/v1/thkadmin/file/upload',
  // upload_url: 'http://192.168.1.108:8200/v1/thkadmin/file/upload',
  registered_phone: '',
  registered_email: '',
  /*记录节点信息用于比较*/
  jilu:'',
}
const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_NAME: (state, name) => {
    state.resturantName = name
  },
  SET_BLOCK: (state, data) => {
    state.blockData = data
  },
  SET_TRANSACTION: (state, data) => {
    state.transactionData = data
  },
  SET_UPLOAD_URL: (state, data) => {
    state.upload_url = data
  },
  SET_REGISTERED_PHONE: (state, data) => {
    state.registered_phone = data
  },
  SET_REGISTERED_EMAIL: (state, data) => {
    state.registered_email = data
  },
  SET_JILU: (state, data) => {
    state.jilu = data
  },
}
const actions = {
  setLanguage({commit}, language) {
    commit('SET_LANGUAGE', language)
  },
  modifyAName({commit}, name) {
    return commit('SET_NAME', name)
  },
  setBlockData({commit}, data) {
    return commit('SET_BLOCK', data)
  },
  setTransactionData({commit}, data) {
    return commit('SET_TRANSACTION', data)
  },
  setUploadUrl({commit}, data) {
    return commit('SET_UPLOAD_URL', data)
  },
  setRegisteredPhone({commit}, data) {
    return commit('SET_REGISTERED_PHONE', data)
  },
  setRegisteredEmail({commit}, data) {
    return commit('SET_REGISTERED_EMAIL', data)
  },
  setjilu({commit}, data) {
    return commit('SET_JILU', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
