<template>
  <el-container style="height: 100%">
    <slide-bar></slide-bar>
    <div class="con">
      <Header></Header>
      <router-view></router-view>
    </div>
  </el-container>
</template>
<script>
  /*左侧导航栏*/
  import SlideBar from '@/components/slidebar'
  /*头部*/
  import Header from '@/components/header'
  /*home内容显示*/
  import HomeContent from '@/components/homeContent'
   export default {
    name: 'Home',
    components: {SlideBar, Header,HomeContent},
    data() {
      return {
      }
    },
    methods: {
      go: function () {
        this.$router.push({path: 'Page2'})
      },
    },
    mounted() {
    },
  };
</script>
<style scoped>
  .con {
    /*width: 88%;*/
    width: 100%;
    margin-left:210px;
    min-width: 1070px;
  }
</style>

