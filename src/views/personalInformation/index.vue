<template>
  <div class="re_bg">
    <span class="logo"></span>
    <div class="re_con">
      <div><h3 class="re_con_title">账户注册</h3></div>
      <el-steps :active="2" align-center>
        <el-step title="创建账户"></el-step>
        <el-step title="设置身份信息"></el-step>
        <el-step title="等待审核"></el-step>
      </el-steps>
      <div class="re_con_say">
        为了给您提供更好的服务，你需要填写的身份信息享受会员保障服务。<br>
        身份信息一经录入不可更改，隐私信息未经本人许可严格保密。<br>
        由于涉及建立测试链等操作，为防止服务器过载，注册时需对您的身份进行审核，审核完成后方可登陆
      </div>
      <div class="re_edit">
        <div class="re_edit_con bo_bottom">
          <div class="re_edit_con_left">THinkey用户名</div>
          <div class="re_edit_con_right" style="line-height: 1.6">{{get_phone_number}}</div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left imp_text">设置登陆密码</div>
          <div class="re_edit_con_right" style="line-height: 1.6"></div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">登陆密码</div>
          <div class="re_edit_con_right">
            <el-input type="password" class="input_position" v-model="password"></el-input>
            <div class="edit_tishi">( 密码由字母、数字、特殊符号至少两种组成，长度最少四位 )</div>
          </div>
        </div>
        <div class="re_edit_con bo_bottom">
          <div class="re_edit_con_left">确认密码</div>
          <div class="re_edit_con_right">
            <el-input type="password" style="margin-right: 20%" class="input_position" v-model="surepassword"></el-input>
            <div class="edit_tishi">（ 两次密码输入必须一致! ）</div>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left imp_text">设置身份信息</div>
          <div class="re_edit_con_right" style="font-size: 13px;line-height: 2.2">
            请务必准确填写本人的身份信息，注册后不能更改，隐私信息未经本人许可严格保密
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">真实姓名</div>
          <div class="re_edit_con_right">
            <el-input type="text" class="input_position" v-model="username" @input="checkusername()"></el-input>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">性别</div>
          <div class="re_edit_con_right" style="line-height: 1.6">
            <el-radio v-model="sex_radio" label="1" style="color: #eee">男</el-radio>
            <el-radio v-model="sex_radio" label="2" style="color: #eee">女</el-radio>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">身份证号码</div>
          <div class="re_edit_con_right">
            <el-input type="text" class="input_position" v-model="identitynumber" @input="checkIdinput()"></el-input>
          </div>
        </div>
        <div class="re_edit_con re_edit_con_select">
          <div class="re_edit_con_left ">身份证到期时间</div>
          <div class="re_edit_con_right" style="position: relative;top: -7px">
            <el-date-picker
              v-model="picker"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="picker_change"
            >
            </el-date-picker>
            <el-checkbox v-model="isLong" @change="checked_long()" style="color: #eee;margin-left: 60px">长期
            </el-checkbox>
          </div>
        </div>
        <div class="re_edit_con  re_edit_con_select">
          <div class="re_edit_con_left">职业</div>
          <div class="re_edit_con_right" style="position: relative;top: -7px">
            <el-select v-model="career_value" placeholder="请选择">
              <el-option
                v-for="item in career"
                :key="item.Id"
                :label="item.name"
                :value="item.Id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="re_edit_con  re_edit_con_select">
          <div class="re_edit_con_left">常用地址</div>
          <div class="re_edit_con_right" style="position: relative;top: -7px">
            <el-cascader
              :options="area_options"
              v-model="selectedOptions"
              :props="setProps"
              @change="handleChange">
            </el-cascader>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">身份证正面照</div>
          <div class="re_edit_con_right">
            <el-upload
              class="avatar-uploader"
              :action="up_url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="idcar_1">

            </div>
            <div style="font-size: 13px;margin-top: 10px">
              请上传清晰的 png 或 jpg 格式照片，大小3M以内,请保证照片清晰度！
            </div>
          </div>
        </div>
        <div class="re_edit_con ">
          <div class="re_edit_con_left">身份证背面照</div>
          <div class="re_edit_con_right">
            <el-upload
              class="avatar-uploader"
              :action="up_url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess_1"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl_1" :src="imageUrl_1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="idcar">

            </div>
            <div style="font-size: 13px;margin-top: 10px">
              请上传清晰的 png 或 jpg 格式照片，大小3M以内,请保证照片清晰度！
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
  import {savePersonalDetails, getAllAreaInfo, getProfessions} from '../../api/interface'

  export default {
    name: "index",
    data() {
      return {
        setProps: {
          label: 'name',
          value: 'code',
          children: 'children'
        },
        get_phone_number:'',
        up_url: this.$store.getters.upload_url,
        password: '',
        surepassword: '',
        username: '',
        identitynumber: '',
        sex_radio: '1',
        select_value: '选项1',
        area_options: [],
        selectedOptions: [],
        imageUrl: '',
        imageUrl_1: '',
        image_hash: '',
        image_hash_1: '',
        isalert: false,
        loading: false,
        picker: '',
        isLong: false,
        istime: false,
        career_value: '',
        career:[]
      }
    }, methods: {
      handleChange(value) {

      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.image_hash = res.hash
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess_1(res, file) {
        this.image_hash_1 = res.hash
        this.imageUrl_1 = URL.createObjectURL(file.raw);
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
        if (!isLt3M) {
          this.$message.error('上传图片大小不能超过 3MB!');
        }
        return isIMG && isLt3M;
      },
      checkIdinput() {
        //控制输入身份证的过程中不可以输入汉字
        let r = /^[^\u4e00-\u9fa5]+$/;
        if (r.test(this.identitynumber)) {
        } else {
          this.identitynumber = "";
        }
      },
      checkusername() {
        //控制输入身份证的过程中不可以输入汉字
        let r = /^[^\u4e00-\u9fa5]+$/;
        if (r.test(this.username)) {
          this.username = "";
        } else {

        }
      },
      /*身份证是否长期*/
      checked_long() {
        if (this.isLong) {
          this.picker = ''
        } else {

        }
      },
      /*身份证到期时间选择后*/
      picker_change() {
        this.isLong = false
      },
      submitInfo() {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        //密码验证规则：至少包含大小字字母，数字和特殊符号中两种长度至少四位
        let pas = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{4,}$/
        if (this.password == '') {
          this.$message.error('密码为必填项不能为空！');
        } else if (pas.test(this.password) == false) {
          this.$message.error('密码格式不正确！请正确设置密码后重试！');
        } else if (this.surepassword == '') {
          this.$message.error('确认密码为必填项不能为空！');
        } else if (this.password !== this.surepassword) {
          this.$message.error('密码与确认密码不一致！');
        } else if (this.username == '') {
          this.$message.error('真实姓名为必填项不能为空！');
        } else if (this.identitynumber == '') {
          this.$message.error('身份证号码为必填项不能为空！！');
        } else if (reg.test(this.identitynumber) == false) {
          this.$message.error('身份证号码输入有误请检查后再次输入！');
        } else if (this.picker == '' && this.isLong == false) {
          this.$message.error('请选择身份证到期时间！');
        } else if (this.career_value == '') {
          this.$message.error('请选择从事职业！');
        } else if (this.selectedOptions.length == 0) {
          this.$message.error('请选择常用地址！');
        } else if (this.image_hash == '') {
          this.$message.error('请上传身份证正面照片！');
        } else if (this.image_hash_1 == '') {
          this.$message.error('请上传身份证背面照片！');
        } else {
          let idcar_long_time = ''
          if (this.isLong == false) {
            idcar_long_time = this.picker
          } else {
            idcar_long_time = ''
          }
          let data = {
            "userName": this.get_phone_number,
            "password": this.passwordEncryption(this.password),
            "realName": this.username,
            "sex": Number(this.sex_radio),
            "idNumber": this.identitynumber,
            "idNumberValidityTime": idcar_long_time,
            "professionId": this.career_value,
            "provinceId": this.selectedOptions[0],
            "cityId": this.selectedOptions[1],
            "countyId": this.selectedOptions[2],
            "idFaceImg": this.image_hash,
            "idReverseImg":this.image_hash_1
          }
          savePersonalDetails(data).then(response => {
            if (response.eCode === 1||response.eCode === 201) {
              this.$message.error(response.eMsg);
            } else if(response.eCode === 0) {
              this.isalert=true
            }
          })
        }
      }
    }, created() {
      if(this.$store.getters.registered_phone=='') {
        this.$router.push({path:'/registered'})
      }else {
        this.get_phone_number=this.$store.getters.registered_phone
      }
    }, mounted() {
      getAllAreaInfo().then(response => {
        this.area_options = response
      }),
        getProfessions().then(response => {
        this.career = response
      })
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
    width: 20%;
  }

  .re_edit_con_right {
    width: 75%;
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
    width: 70%;
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
    width: 258px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 258px;
    height: 178px;
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
    display: inline-block;
    color: #eee;
    font-size: 13px;
  }
</style>

