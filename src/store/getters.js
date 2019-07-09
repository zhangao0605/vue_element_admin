const getters = {

  language: state => state.app.language,
  resturantName: state => state.app.resturantName,
  blockData: state => state.app.blockData,
  transactionData: state => state.app.transactionData,
  upload_url: state => state.app.upload_url,
  registered_phone: state => state.app.registered_phone,
  registered_email: state => state.app.registered_email,
  // jilu: state => state.app.jilu,


  /*登录信息部分*/
  token: state => state.login.token,
  roles: state => state.login.roles,
  chainIds: state => state.login.chainIds,
  select_chainId: state => state.login.select_chainId,
}
export default getters
