<template>
  <div class="con_2">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .con_2 {
    width: 96%;
    padding: 2%;
  }

  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }
</style>
