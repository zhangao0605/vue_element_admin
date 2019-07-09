<template>
  <div class="mask">
    <div class="con">
      <ul>
        <li>单据号</li>
        <li>{{msg.orderId}}</li>
      </ul>
      <ul>
        <li>批号</li>
        <li>{{msg.detail[0].lotNumber}}</li>
      </ul>
      <ul>
        <li>仓库名称</li>
        <li>{{msg.detail[0].storehouseName}}</li>
      </ul>
      <ul>
        <li>品名</li>
        <li>{{msg.detail[0].goodName }}</li>
      </ul>
      <ul>
        <li>材质</li>
        <li>{{msg.detail[0].materia}}</li>
      </ul>
      <ul>
        <li>规格</li>
        <li>{{msg.detail[0].specification }}</li>
      </ul>
      <ul>
        <li>产地</li>
        <li>{{msg.detail[0].placeOfOrigi}}</li>
      </ul>
      <ul>
        <li>单价</li>
        <li>{{msg.detail[0].pric}}</li>
      </ul>
      <ul>
        <li>金额</li>
        <li>{{msg.detail[0].taxIncludedAmount}}</li>
      </ul>
      <ul>
        <li>费用单价</li>
        <li>{{msg.detail[0].fee }}</li>
      </ul>
      <ul>
        <li>费用金额</li>
        <li>{{msg.detail[0].feeAmount}}</li>
      </ul>
      <ul>
        <li>销售数量</li>
        <li>{{msg.detail[0].saleQuantit}}</li>
      </ul>
      <ul>
        <li>销售重量</li>
        <li>{{msg.detail[0].saleWeigh}}</li>
      </ul>
      <ul>
        <li>实提数量</li>
        <li>{{msg.detail[0].takenQuantity }}</li>
      </ul>
      <ul>
        <li>实提重量</li>
        <li>{{msg.detail[0].takenWeight}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tableDetial',
    data() {
      return {msg: {}}
    },
    props: ['msg'],
    methods: {
      a() {
        console.log(this.msg)
      },
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #66666636;
    z-index: 9999;

  }

  .con {
    display: inline-block;
    width: 50%;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
  }

  .con ul {
    display: flex;
  }

  .con ul li {
    list-style: none;
  }

  .con ul li:nth-child(1) {
    width: 20%;
  }
</style>
