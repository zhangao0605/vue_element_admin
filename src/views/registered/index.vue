<template>
  <div class="re_bg">
    <span class="logo"></span>
    <div class="re_con">

      <div><h3 class="re_con_title">账户注册</h3></div>
      <el-steps :active="1" align-center>
        <el-step title="创建账户"></el-step>
        <el-step title="设置身份信息"></el-step>
        <el-step title="等待审核"></el-step>
      </el-steps>
      <div class="re_table">
        <div class="re_table_left" @click="table_swith(1)" :class="is_choose===1?table_choose:table_choose_no">
          <span class=" re_icon iconfont el-icon-icon_account"></span>个人用户
        </div>
        <div class="re_table_right" @click="table_swith(2)" :class="is_choose===2?table_choose:table_choose_no">
          <span class=" re_icon iconfont el-icon-icon_account"></span>企业用户
        </div>
      </div>
      <div class="re_edit_info" v-show="is_choose===1">
        <el-form label-width="100px">
          <el-form-item label="国籍/地区" prop="region">
            <el-select v-model="select_1" style="width: 30%;" placeholder="请选择">
              <el-option label="中国大陆" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" class="aaa">
            <el-select  v-model="select_2" style="width: 30%;" placeholder="请选择">
              <el-option label="86" value="1"></el-option>
            </el-select>
            <el-input @input="handleInput(1)" v-model="phoneNumber" style="width: 65%;margin-left: 5%"></el-input>
          </el-form-item>
          <el-form-item label="短信校验码">
            <el-input v-model="smsNumber" maxlength="4" @input="handleInput(2)"  style="width: 50%;"></el-input>
            <el-button :disabled="but_get" style="float: right;top: 7px;position: relative;width:100px" type="primary"
                       size="small" @click="get_code()">{{verificationCode}} <span v-show="but_get">秒后重试</span>
            </el-button>
          </el-form-item>
        </el-form>
        <el-button class="re_edit_sure" :loading="loading" type="primary" @click="submit_per_info()">
          下一步
        </el-button>
      </div>
      <div class="re_edit_info" v-show="is_choose===2">
        <el-form label-width="100px">
          <el-form-item label="账号名" prop="region">
            <el-input v-model="userName" style="width: 100%;" placeholder="请输入正确电子邮箱名作为用户名以及验证方式"></el-input>
          </el-form-item>
          <el-form-item label="手机号" class="aaa">
            <el-select v-model="select_2" style="width: 30%;" placeholder="请选择">
              <el-option label="86" value="1"></el-option>
            </el-select>
            <el-input v-model="phoneNumber_1" @input="handleInput(3)"  style="width: 65%;margin-left: 5%"></el-input>
          </el-form-item>
          <el-form-item label="短信校验码">
            <el-input v-model="smsNumber_1" @input="handleInput(4)"  style="width: 50%"></el-input>
            <el-button :disabled="but_get_1" style="float: right;margin-top:7px;position: relative;"
                       @click="get_code_1()" type="primary" size="small">
              {{verificationCode_1}}<span v-show="but_get_1">秒后重试</span>
            </el-button>
          </el-form-item>
        </el-form>
        <div class="re_edit_tishi">
          注：手机号验证仅作为防止恶意注册的验证使用，不作为账户绑定手机使用
        </div>
        <el-button class="re_edit_sure" :loading="loading" type="primary" style="top: 14px" @click="submit_company_information()">
          下一步
        </el-button>
      </div>

    </div>
    <div class="re_alert" v-show="alert_show">

    </div>
    <div class="re_alert_div" v-show="alert_show">
      <div class="re_alert_div_1">
        <div class="re_alert_div_left">
          <i class="el-icon-message"></i>
        </div>
        <div class="re_alert_div_right">
          验证邮件已发送到邮箱 {{userName}}
          请在24小时内点击邮件中的链接继续注册。
        </div>
      </div>
      <div class="re_alert_div_2" @click="no_email()">
        没有收到邮件？
      </div>
    </div>

  </div>
</template>

<script>
  import {registerByPhone, getVerificationCode,registerByEmail} from '../../api/interface'

  export default {
    name: "index",
    data() {
      return {
        phoneNumber: '',
        phoneNumber_1: '',
        smsNumber: '',
        smsNumber_1: '',
        userName: '',
        table_choose: 'table_choose',
        table_choose_no: 'table_normal',
        is_choose: 1,
        select_1: '中国大陆',
        select_2: 86,
        loading: false,
        alert_show: false,
        verificationCode: '获取验证码',
        verificationCode_1: '获取验证码',
        but_get: false,
        but_get_1: false,
      }
    }, methods: {
      table_swith(e) {
        this.is_choose = e
      },
      no_email() {
        this.alert_show = false
      },
      /*只能输入数字*/
      handleInput(e){
        let r = /[^\d]/g;
        if(e===1){
          if (r.test(this.phoneNumber)) {
            this.phoneNumber = "";
          } else {
          }
        }else if(e===2){
          if (r.test(this.smsNumber)) {
            this.smsNumber = "";
          } else {
          }
        }else if(e===3){
          if (r.test(this.phoneNumber_1)) {
            this.phoneNumber_1 = "";
          } else {
          }
        }else if(e===4){
          if (r.test(this.smsNumber_1)) {
            this.smsNumber_1 = "";
          } else {
          }
        }

      },
      /*获取个人验证码*/
      get_code() {
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.phoneNumber == '') {
          this.$message.error('手机号为必填项请输入正确手机号！');
        } else if (!myreg.test(this.phoneNumber)) {
          this.$message.error('请输入正确手机号！');
        } else {
          getVerificationCode(this.phoneNumber).then(response => {
            if (response.eCode === 0) {
              this.but_get = true
              this.verificationCode = 5
              let _this = this
              let time_clear = setInterval(function () {
                if (_this.verificationCode === 1) {
                  _this.verificationCode = '获取验证码'
                  _this.but_get = false
                  clearInterval(time_clear)
                } else {
                  _this.verificationCode -= 1
                }
              }, 1000)
            } else if (response.eCode === 201||response.eCode === 1) {
              this.$message.error(response.eMsg)
            }
          })

        }

      },
      /*获取企业验证码*/
      get_code_1() {
        let emailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if(this.userName==''){
          this.$message.error('账户名不能为空！');
        }else if (emailreg.test(this.userName== false)) {
          this.$message.error('请输入正确邮箱号作为用户名！');
        }else if (this.phoneNumber_1 == '') {
          this.$message.error('手机号为必填项请输入正确手机号！');
        } else if (!myreg.test(this.phoneNumber_1)) {
          this.$message.error('请输入正确手机号！');
        } else {
          getVerificationCode(this.phoneNumber_1).then(response => {
            if (response.eCode === 0) {
              this.but_get_1 = true
              this.verificationCode_1 = 5
              let _this = this
              let time_clear = setInterval(function () {
                if (_this.verificationCode_1 === 1) {
                  _this.verificationCode_1 = '获取验证码'
                  _this.but_get_1 = false
                  clearInterval(time_clear)
                } else {
                  _this.verificationCode_1 -= 1
                }
              }, 1000)
            } else if (response.eCode === 201||response.eCode === 1) {
              this.$message.error(response.eMsg)
            }
          })

        }

      },
      /*提交个人信息*/
      submit_per_info() {
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.phoneNumber == '') {
          this.$message.error('手机号为必填项请输入正确手机号！');
        }else if (!myreg.test(this.phoneNumber)) {
          this.$message.error('请输入正确手机号！');
        }else if(this.smsNumber==''){
          this.$message.error('短信验证码为必填项，请输入正确四位短信验证码！');
        }else{
          registerByPhone(this.smsNumber, this.phoneNumber).then(response => {
            if (response.eCode === 1) {
              this.$message.error(response.eMsg);
            } else if(response.eCode === 0) {
              this.$store.dispatch('app/setRegisteredPhone', this.phoneNumber).then(()=>{
                this.$router.push({name: 'registered_personal', params: {}})
              })
            }
          })
        }

      },
      /*提交企业信息*/
      submit_company_information(){
        let emailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if(this.userName==''){
          this.$message.error('账户名不能为空！');
        }else if (emailreg.test(this.userName== false)) {
          this.$message.error('请输入正确邮箱号作为用户名！');
        }else if (this.phoneNumber_1 == '') {
          this.$message.error('手机号为必填项请输入正确手机号！');
        } else if (!myreg.test(this.phoneNumber_1)) {
          this.$message.error('请输入正确手机号！');
        }else if(this.smsNumber_1==''){
          this.$message.error('验证码为必填项请输入正确四位验证码！');
        }
        else {
          registerByEmail(this.smsNumber_1,this.phoneNumber_1,this.userName).then(response => {
console.log(response)
            if (response.eCode === 1) {
              this.$message.error(response.eMsg);
            } else if(response.eCode === 0) {
                this.alert_show=true
            }
          })

        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .re_bg {

    .re_edit_info {
      input {
        background: #eee;

      }
      .el-form-item__label {
        color: #eee;
      }
    }
    .aaa {
      .el-form-item__content {
        display: flex;
      }
    }
    .el-step__main {
      .is-process {
        color: #C0C4CC;
        font-size: 16px;
        line-height: 38px;
        font-weight: normal;
      }
    }
    .el-step__head {
      .is-text {
        border: 3px solid;
        height: 30px;
        width: 30px;
      }
    }
    .is-wait {
      .is-text {
        border: 3px solid #2c3e50;
        color: #2c3e50
      }

    }
  }
</style>
<style scoped>
  .logo{
    width: 100px;
    height: 40px;
    background: url("../../assets/images/logo.png") no-repeat;
    display: inline-block;
    position: absolute;
    left: 25%;
    top: 100px;
    /*margin-top: -10%;*/
  }
  .re_alert {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    background-color: #808080;
    opacity: 0.5;
  }

  .re_alert_div_1 {
    padding: 10%;
    display: flex;
  }

  .re_alert_div_2 {
    padding: 5% 10%;
    color: #409EFF;
    cursor: pointer;
  }

  .re_alert_div_right {
    padding-left: 5%;
    font-size: 20px;
  }

  .el-icon-message {
    font-size: 40px;
    color: #409EFF;
  }

  .re_alert_div {

    position: fixed;
    width: 600px;
    z-index: 11;
    height: 300px;
    background: #eee;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    left: 50%;
    margin-left: -300px;
    top: 250px;
  }

  .re_bg {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
  }

  .re_con {
    /*background-color: #ffffff;*/
    /*border: 1px solid #ebebeb;*/
    border-radius: 3px;
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0px auto;
    top: 100px;
  }

  .re_con_title {
    font-size: 26px;
    color: #eee;
    /*color: #409EFF;*/
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .re_table {
    width: 100%;
    margin-top: 20px;
  }

  .re_table {
    display: flex;
  }

  .re_table_left {
    width: 45%;
    color: #ffffff;
    text-align: center;
    font-weight: 500;
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 4px;
    display: inline-block;
    line-height: 1.5;
    white-space: nowrap;
    cursor: pointer;
  }

  .table_choose {
    background-color: #409EFF;
  }

  .table_normal {
    background-color: #8391a2;
  }

  .re_table_right {
    width: 45%;
    margin-left: 10%;
    color: #ffffff;
    text-align: center;
    font-weight: 500;
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 4px;
    display: inline-block;
    line-height: 1.5;
    white-space: nowrap;
    cursor: pointer;
  }

  .re_icon {
    position: relative;
    left: -10px;
    top: 2px;

  }

  .re_edit_info {
    margin-top: 30px;
    width: 90%;
    margin-left: 2%;
  }

  .re_edit_tishi {
    width: 90%;
    margin-left: 5%;
    color: #eee;
    font-size: 12px;
  }

  .re_edit_sure {
    width: 96%;
    margin-left: 4%;
    margin-top: 30px;
    position: relative;
    top: 30px;
  }
</style>
