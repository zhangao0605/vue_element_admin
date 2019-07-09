<template>
  <div class="re_bg">
    <span class="logo"></span>
    <div class="re_con">
      <div><h3 class="re_con_title">账户注册</h3></div>
      <el-steps :active="step" align-center>
        <el-step title="创建账户"></el-step>
        <el-step title="企业实名认证"></el-step>
        <el-step title="等待审核"></el-step>
      </el-steps>
      <div class="re_con_say">
        为了核实真实信息，保障您的账户安全，需要填写
        企业实名认证信息 身份信息一经录入不可更改，隐私信息未经本人许可严格保密。
        由于涉及建立测试链等操作，为防止服务器过载，注册时需对您的身份进行审核，审核完成后方可登陆
      </div>
      <div class="re_edit">
        <div class="re_edit_con bo_bottom">
          <div class="re_edit_con_left">单位用户名</div>
          <div class="re_edit_con_right" style="line-height: 1.6">{{re_email}}</div>
        </div>
        <div class="re_edit_con  re_edit_con_select bo_bottom imp_text " style="margin-top: 20px">
          <div class="re_edit_con_left" style="color: #409EFF">选择单位类型</div>
          <div class="re_edit_con_right" style="position: relative;top: -7px">
            <el-select v-model="career_value" placeholder="请选择">
              <el-option
                v-for="item in career"
                :props="setProps"
                :key="item.Id"
                :label="item.name"
                :value="item.Id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left imp_text">单位基本信息</div>
          <div class="re_edit_con_right" style="font-size: 13px;line-height: 2.2">

          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">单位名称</div>
          <div class="re_edit_con_right">
            <el-input type="text" class="input_position" style="     width: 70%;" v-model="username"></el-input>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">社会信用代码（注册号）</div>
          <div class="re_edit_con_right">
            <el-input type="text" style="     width: 70%;" class="input_position" v-model="registration_number"
                      placeholder="例：9135012M0001FCJ9L"></el-input>
          </div>
        </div>
        <div class="re_edit_con bo_bottom">
          <div class="re_edit_con_left">营业执照</div>
          <div class="re_edit_con_right">
            <div style="font-size: 13px;margin-top: 5px;padding-bottom: 20px">
              请上传彩色原件或加盖公司公章的复印件
            </div>
            <el-upload
              class="avatar-uploader"
              :action="up_url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left imp_text">法定代表人证件</div>
          <div class="re_edit_con_right" style="font-size: 13px;line-height: 2.2">

          </div>
        </div>
        <div class="re_edit_con  re_edit_con_select  ">
          <div class="re_edit_con_left">法定代表人归属地</div>
          <div class="re_edit_con_right" style="position: relative;top: -7px">
            <el-select v-model="attributions_value" placeholder="请选择">
              <el-option
                v-for="item in attributions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="re_edit_con">
          <div class="re_edit_con_left">身份证</div>
          <div class="re_edit_con_right">
            <div style="display: flex;justify-content: space-between">
              <div>
                <div style="font-size: 13px;margin-top: 5px;padding-bottom: 20px">个人信息页</div>
                <el-upload
                  class="avatar-uploader"
                  :action="up_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess_1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl_1" :src="imageUrl_1" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div>
                <div style="font-size: 13px;margin-top: 5px;padding-bottom: 20px">
                  国徽页
                </div>
                <el-upload
                  class="avatar-uploader"
                  :action="up_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess_2"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl_2" :src="imageUrl_2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>

            </div>

          </div>
        </div>
        <div class="re_edit_con bo_bottom">
          <div class="re_edit_con_left">填写人身份</div>
          <div class="re_edit_con_right" style="line-height: 1.6">
            <el-radio v-model="legal_person" label="1" style="color: #eee" @change="radio_change(1)">法定代表人</el-radio>
            <el-radio v-model="legal_person" label="2" style="color: #eee" @change="radio_change(2)">代理人</el-radio>
          </div>
        </div>

        <div class="re_edit_con " v-show="legal_person==2">
          <div class="re_edit_con_left imp_text">代理人证件</div>
          <div class="re_edit_con_right" style="font-size: 13px;line-height: 2.2">

          </div>
        </div>
        <div class="re_edit_con" v-show="legal_person==2">
          <div class="re_edit_con_left">身份证</div>
          <div class="re_edit_con_right">
            <div style="display: flex;justify-content: space-between">
              <div>
                <div style="font-size: 13px;margin-top: 5px;padding-bottom: 20px">个人信息页</div>
                <el-upload
                  class="avatar-uploader"
                  :action="up_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess_3"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl_3" :src="imageUrl_3" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div>
                <div style="font-size: 13px;margin-top: 5px;padding-bottom: 20px">
                  国徽页
                </div>
                <el-upload
                  class="avatar-uploader"
                  :action="up_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess_4"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl_4" :src="imageUrl_4" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>

            </div>

          </div>
        </div>
        <div class="re_edit_con" v-show="legal_person==2">
          <div class="re_edit_con_left">代理委托书</div>
          <div class="re_edit_con_right">
            <div style="font-size: 13px;margin-top: 5px;padding-bottom: 20px">
              委托书必须带有公司公章或财务公章
            </div>
            <div style="display: flex;justify-content: space-between">
              <el-upload
                class="avatar-uploader"
                :action="up_url"
                :show-file-list="false"
                :on-success="handleAvatarSuccess_5"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl_5" :src="imageUrl_5" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

          </div>
        </div>
        <el-button class="re_edit_sure" :loading="loading" type="primary" style="top: 14px" @click="submitInfo()">
          提交审核
        </el-button>
      </div>
    </div>
    <div class="re_alert" v-show="isalert">

    </div>
    <div class="re_alert_con " v-show="isalert">
      <div class="re_alert_con_1">
        <div class="re_alert_con_2">
          <span class="el-icon-success" style="color: #D4237A;font-size: 45px"></span>

        </div>
        <div class="re_alert_con_3">
          您的申请已提交，我们将尽快进行审核，3-5日内通知您结果，感谢您对芯际的信任。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {uploadFile, getRegisterEmailByUrl, getAllCompanyType, saveCompanyDetails} from '../../api/interface'

  export default {
    name: "index",
    data() {
      return {
        re_email: '',
        step: 2,
        username: '',
        registration_number: '',
        attributions_value: '1',
        attributions: [
          {
            value: '1',
            label: '中国大陆'
          },
        ],
        imageUrl: '',
        imageUrl_1: '',
        imageUrl_2: '',
        imageUrl_3: '',
        imageUrl_4: '',
        imageUrl_5: '',
        up_file: '',
        up_file_1: '',
        up_file_2: '',
        up_file_3: '',
        up_file_4: '',
        up_file_5: '',
        isalert: false,
        legal_person: '1',
        loading: false,
        career_value: '',
        setProps: {
          label: 'name',
          value: 'Id',
          children: 'children'
        },
        career: [],
        up_url: this.$store.getters.upload_url,
      }
    }, methods: {
      radio_change(e) {
        if (e === 1) {
          this.imageUrl_3 = ''
          this.up_file_3 = ''
          this.imageUrl_4 = ''
          this.up_file_4 = ''
          this.imageUrl_5 = ''
          this.up_file_5 = ''
        } else {

        }
      },
      handleChange(value) {

      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.up_file = res.hash
      },
      handleAvatarSuccess_1(res, file) {
        this.imageUrl_1 = URL.createObjectURL(file.raw);
        this.up_file_1 = res.hash
      },
      handleAvatarSuccess_2(res, file) {
        this.imageUrl_2 = URL.createObjectURL(file.raw);
        this.up_file_2 = res.hash
      },
      handleAvatarSuccess_3(res, file) {
        this.imageUrl_3 = URL.createObjectURL(file.raw);
        this.up_file_3 = res.hash
      },
      handleAvatarSuccess_4(res, file) {
        this.imageUrl_4 = URL.createObjectURL(file.raw);
        this.up_file_4 = res.hash
      },
      handleAvatarSuccess_5(res, file) {
        this.imageUrl_5 = URL.createObjectURL(file.raw);
        this.up_file_5 = res.hash
      },
      beforeAvatarUpload(file) {
        const isIMG =
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/png'
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isIMG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式 !');
        }
        return isIMG && isLt3M;
      },
      submitInfo() {
        if (this.career_value == '') {
          this.$message.error('单位类型为必选项请选择！');
        } else if (this.username == '') {
          this.$message.error('单位名称为必填项不能为空！');
        } else if (this.registration_number == '') {
          this.$message.error('社会信用代码（注册号）为必填项不能为空！');
        } else if (this.up_file == '') {
          this.$message.error('请上传营业执照！');
        }
        else if (this.up_file_1 == '') {
          this.$message.error('请上传法人身份证个人信息页！');
        } else if (this.up_file_2 == '') {
          this.$message.error('请上传法人身份证个人国徽页！');
        } else if (this.legal_person == '1') {
          let data = {
            'account': this.re_email,
            'companyTypeId': this.career_value,
            'companyName': this.username,
            'socialCreditCode': this.registration_number,
            'businessLicenseImg': this.up_file,
            'corporateNationality': '中国大陆',
            'cIdFaceImg': this.up_file_1,
            'cIdReverseImg': this.up_file_2,
            'registerType': this.legal_person,
            'theAgentIdFaceImg': '',
            'theAgentIdReverseImg': '',
            'theAgentFile': '',
          }
          saveCompanyDetails(data).then(response => {
            saveCompanyDetails(data).then(response => {
              if(response.eCode===0){
                this.step = 3
                this.isalert = true
              }else {
                this.$message.error(response.eMsg);
              }
            })
          })
        } else {
          if (this.up_file_3 == '') {
            this.$message.error('请上传代理人身份证个人信息页！');
          } else if (this.up_file_4 == '') {
            this.$message.error('请上传代理人身份证个人国徽页！');
          } else if (this.up_file_5 == '') {
            this.$message.error('请上传代理委托书！');
          } else {
            let data = {
              'account': this.re_email,
              'companyTypeId': this.career_value,
              'companyName': this.username,
              'socialCreditCode': this.registration_number,
              'businessLicenseImg': this.up_file,
              'corporateNationality': '中国大陆',
              'cIdFaceImg': this.up_file_1,
              'cIdReverseImg': this.up_file_2,
              'registerType': this.legal_person,
              'theAgentIdFaceImg': this.up_file_3,
              'theAgentIdReverseImg': this.up_file_4,
              'theAgentFile': this.up_file_5,
            }
            saveCompanyDetails(data).then(response => {
             if(response.eCode===0){
                 this.step = 3
                 this.isalert = true
             }else {
               this.$message.error(response.eMsg);
             }
            })
          }
        }
      }
    }, created() {
      if (this.$route.query.rcode == undefined) {
        this.$router.push({path: '/registered'})
      } else {
        getRegisterEmailByUrl(this.$route.query.rcode).then(response => {
          if (response.eCode === 201) {
            this.$router.push({path: '/registered'})
            this.$message.error('邮件验证时效已过，请再次获取邮件！');
          } else {
            getAllCompanyType().then(response => {
              this.career = response
            })
            let data = response.email
            this.re_email = response.email
            this.$store.dispatch('app/setRegisteredEmail', data).then(() => {
            })
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .re_bg {
    .el-upload {
      border: 1px dashed #2d3a4b;
      background-color: #eee;
    }
    input {
      background: #eee;
    }
    .re_edit_con_select {
      input {
        background: #eee;
        width: 100%;
      }
    }
    .re_edit_info {
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
    top: 30px;
    /*margin-top: -10%;*/
  }
  .idcar {
    background: url("../../assets/images/fanmian.png") no-repeat;
    background-size: 98%;
    width: 258px;
    height: 162px;
    margin-top: 30px;
  }

  .idcar_1 {
    background: url("../../assets/images/zhengmian.png") no-repeat;
    background-size: 98%;
    width: 258px;
    height: 162px;
    margin-top: 30px;
  }

  .re_alert_con_1 {
    display: flex;
    padding: 17% 10%;
  }

  .re_alert_con_2 {
    width: 20%;
  }

  .re_alert_con_3 {
    width: 80%;
  }

  .re_alert_con {
    position: fixed;
    left: 50%;
    margin-left: -275px;
    top: 250px;
    width: 550px;
    height: 250px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    z-index: 11;
  }

  .re_alert {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #666666;
    opacity: 0.4;
    z-index: 10;
  }

  .re_edit_con {
    display: flex;
    padding: 15px 0;
  }

  .re_edit_con_left {
    text-align: right;
    color: #eee;
    width: 30%;
  }

  .re_edit_con_right {
    width: 65%;
    margin-left: 5%;
    color: #eee;
  }

  .imp_text {
    color: #409EFF;
    /*font-weight: 600;*/
    font-size: 18px;
  }

  .input_position {
    position: relative;
    top: -8px;
  }

  .bo_bottom {
    border-bottom: 1px solid #eeeeee85;
  }

  .re_con_say {
    text-align: center;
    color: #eee;
    font-size: 13px;
    margin-top: 20px;
    line-height: 1.8;
  }

  .re_bg {
    position: relative;
    padding-bottom: 50px;
    width: 100%;
    background-color: #2d3a4b;
  }

  .re_con {
    /*background-color: #ffffff;*/
    /*border: 1px solid #ebebeb;*/
    border-radius: 3px;
    position: relative;
    left: 0;
    right: 0;
    /*height: 1500px;*/
    width: 650px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0px auto;
    top: 30px;
  }

  .re_con_title {
    font-size: 26px;
    color: #eee;
    /*color: #409EFF;*/
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  .re_edit_sure {
    width: 70%;
    margin-left: 15%;
    margin-top: 30px;
    position: relative;
    top: 30px;
    margin-bottom: 50px;
  }

  .edit_tishi {
    color: #eee;
    font-size: 13px;
  }
</style>

