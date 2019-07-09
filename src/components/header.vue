<template>
  <div class="navbar">
    <span class="bg_1"></span>
    <!--&lt;!&ndash;<lang-select class="right-menu-item hover-effect" />&ndash;&gt;-->
    <!--<div class="heaer_item" style="display: inline-block;float: right;right: 50%;position: relative">-->
    <!--<div class="heaer_item_cl" style="display: inline-block;position: relative;right: 50%;cursor: pointer">-->
    <!--<i class="el-icon-document el_document "/>-->
    <!--<span>开发者文档</span>-->
    <!--</div>-->
    <!--<div class="heaer_item_cl" style="display: inline-block;cursor: pointer">-->
    <!--<i class="el-icon-message el_document "/>-->
    <!--<span>站内信</span>-->
    <!--</div>-->
    <!--</div>-->
    <el-dropdown class="avatar-container" trigger="click">
      <span class="el-dropdown-link">
       <span class="user_name">{{user_info}}</span><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item>
          <span @click="logout()">注销登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {getInfo} from '../api/interface'

  export default {
    name: 'Home',
    components: {},
    data() {

      return {
        user_info:''
      }
    }
    ,
    created() {
    }
    ,
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('login/LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    },mounted(){
      this.user_info=this.$store.getters.roles.companyName
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      cursor: pointer;
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 2%;
    }
    .el-dropdown-menu {
      background-color: red;
    }

  }
.user_name{
  display: inline-block;
  font-size: 16px;
  color: #409EFF;
  padding-right: 20px;
  font-weight: bold;
}
.bg_1{
  background: url("../assets/images/logo_1.png") no-repeat;
  display: inline-block;
  height: 35px;
  background-size: 85%;
  width: 105px;
  position: relative;
  top: 7px;
  left: 1.7%;
}
  /*.el_document {*/
  /*font-size: 25px;*/
  /*position: relative;*/
  /*top: 3px;*/
  /*color: #409EFF;*/
  /*}*/
</style>


