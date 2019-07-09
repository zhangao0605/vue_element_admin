import request from '@/utils/js/request'

export function login(username, password) {
  return request({
    url: '/v1/publicChainThkadmin/user/login',
    method: 'post',
    data: {
      "account": username,
      "password": password,
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/v1/publicChainThkadmin/user/getuserbytoken',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: 'v1/publicChainThkadmin/user/loginout',
    method: 'get'
  })
}

/*首页获取数据*/
export function getuserchains(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/getuserchains',
    method: 'get',
    params: {
      'userId': e
    }
  })
}

/*区块链管理获取链信息*/
export function getMainChainStat(e) {
  return request({
    url: '/v1/publicChainThkadmin/block/getMainChainStat',
    method: 'post',
    data: {
      chainId: e
    }
  })
}

/*区块链管理获取区块信息*/
export function getNewBlock(e) {
  return request({
    url: '/v1/publicChainThkadmin/block/getNewBlock',
    method: 'post',
    data: {
      chainId: e
    }
  })
}

/*区块链管理获取交易信息*/
export function getBlockTxs(e) {
  return request({
    url: '/v1/publicChainThkadmin/chain/getBlockTxs',
    method: 'get',
    params: {
      "chainId": e
    }
  })
}

/*节点管理获取公司信息*/
export function getCompany(e) {
  return request({
    url: '/v1/publicChainThkadmin/chain/getCompany',
    method: 'post',
    data: e
  })
}

/*节点管理获取节点信息*/
export function getNodeInfo(a, b, c, d) {
  return request({
    url: '/v1/publicChainThkadmin/chain/getNodeInfo',
    method: 'post',
    data: {
      "chainId": b,
      "companyId": d,
      "companyName": a,
      "runStatus": c
    }
  })
}

/*数据管理获取表格数据*/
export function getDataTable(params) {
  return request({
    url: '/v1/publicChainThkadmin/order',
    method: 'get',
    params
  })
}

/*账户管理获取企业管理数据*/
export function getuserchains_1(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/getuserchains',
    method: 'get',
    params: {
      'userId': e
    }
  })
}

/*账户管理获取管理员管理数据*/
export function getuserByUserId(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/getuserByUserId',
    method: 'get',
    params: {
      'userId': e
    }
  })
}

/*交易详情获取所属区块和区块哈希*/
export function getTransactionByHash(e, q) {
  return request({
    url: '/v1/publicChainThkadmin/chain/getTransactionByHash',
    method: 'get',
    params: {
      'chainId': e,
      'hash': q
    }
  })
}

/*获取当前区块下的交易详情*/
export function getBlockTxsByHeight(e, q) {
  return request({
    url: '/v1/publicChainThkadmin/chain/getBlockTxsByHeight',
    method: 'get',
    params: {
      'chainId': e,
      'height': q
    }
  })
}
/*上传文件*/
export function uploadFile(e) {
  let data=new FormData()
  data.append('file',e)
  return request({
    url: '/v1/publicChainThkadmin/file/upload ',
    method: 'post',
    data:data
  })
}

/*个人注册获取验证码*/
export function getVerificationCode(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/action/getVerificationCode',
    method: 'get',
    params:{
      'phone':e
    }
  })
}
/*个人注册提交信息*/
export function registerByPhone(e,q) {
  return request({
    url: '/v1/publicChainThkadmin/user/action/registerByPhone',
    method: 'post',
    data:{
      'code':e,
      'phone':q,
    }
  })
}

/*企业注册提交信息*/
export function registerByEmail(e, q,w) {
  return request({
    url: '/v1/publicChainThkadmin/user/action/registerByEmail',
    method: 'post',
    data: {
      'code': e,
      'phone': q,
      'email': w,
    }
  })
}
/*个人基本信息提交*/
export function savePersonalDetails(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/action/savePersonalDetails',
    method: 'post',
    data:e
  })
}
/*获取地域信息*/
export function getAllAreaInfo() {
  return request({
    url: '/v1/publicChainThkadmin/user/action/getAllAreaInfo',
    method: 'get',
    params: {
    }
  })
}

/*获取职业信息*/
export function getProfessions() {
  return request({
    url: '/v1/publicChainThkadmin/user/action/getProfessions',
    method: 'get',
    params: {}
  })
}
/*企业用户路径截取获取企业相关信息*/
export function getRegisterEmailByUrl(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/action/getRegisterEmailByUrl',
    method: 'get',
    params: {
      'rcode':e
    }
  })
}

/*企业类型获取*/
export function getAllCompanyType() {
  return request({
    url: '/v1/publicChainThkadmin/user/action/getAllCompanyType',
    method: 'get',
    params: {

    }
  })
}
// thkadmin
/*提交企业信息完成注册*/
export function saveCompanyDetails(e) {
  return request({
    url: '/v1/publicChainThkadmin/user/action/saveCompanyDetails',
    method: 'post',
    data:e
  })
}
/*获取节点*/
export function getAllNodeInfo(e) {
  return request({
    url: '/v1/publicChainThkadmin/node/getAllNodeInfo',
    method: 'get',
    params:e
  })
}
