<template>
  <div>
    <div class="con_header">
      <span class="back" @click="back()">区块链管理</span> > 交易详情
    </div>
    <div class="con_header" style="margin-top: 30px">
      交易详情
    </div>
    <div class="con_de">
      <div class="con_de_d" style="margin-top: 0">
        <div class="con_de_d_left ">
          交易哈希：
        </div>
        <div class="con_de_d_right ">
          {{transaction_details.hash}}
        </div>
      </div>
      <div class="con_de_d">
        <div class="con_de_d_left ">
          执行合约：
        </div>
        <div class="con_de_d_right">
          {{transaction_details.resultContractInfo.contractName}}
          <span class="con_de_ti"><span class="color_choose">执行方法：</span><span> {{transaction_details.resultContractInfo.methodName}}</span></span>
          <span class="con_de_ti"><span
            class="color_choose">交易时间：</span><span> {{transaction_details.theDateString}}</span></span>
        </div>

      </div>
      <div class="con_de_d">
        <div class="con_de_d_left ">
          所属区块：
        </div>
        <div class="con_de_d_right">
          {{block_get.blockHeight}}
        </div>
      </div>
      <div class="con_de_d">
        <div class="con_de_d_left ">
          区块哈希：
        </div>
        <div class="con_de_d_right">
          {{block_get.blockHash}}
        </div>
      </div>
      <div class="con_de_d">
        <div class="con_de_d_left ">
          传入参数：
        </div>
        <div class="con_de_d_right">
          {{transaction_details.resultContractInfo.input}}
        </div>
      </div>
      <div class="con_de_d">
        <div class="con_de_d_left ">
          执行结果：
        </div>
        <div class="con_de_d_right">
          {{block_get.status==1?'成功':'失败'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getTransactionByHash} from '../api/interface'

  export default {
    name: "transactionDetails",
    data() {
      return {
        transaction_details: {},
        block_get: {}
      }
    }, methods: {
      back() {
        this.$router.push({path: "/chain/chainManagement"})
      },
      handleClick_2(e) {
        this.$router.push({name: 'transactionDetails', params: {data: e}})
      },
      // goBack() {
      //   this.$router.replace({name: 'blockDetails', params: {data: this.orderData}});
      //   //replace替换原路由，作用是避免回退死循环
      // },
      getTransactionByHash() {

        getTransactionByHash(this.transaction_details.chainId, this.transaction_details.hash).then(response => {
          this.block_get = response
        })
      }
    }, mounted() {

    }, created() {
      this.transaction_details = this.$store.getters.transactionData
      this.getTransactionByHash()
    }, destroyed() {

    },
  }
</script>

<style scoped>
  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .back {
    cursor: pointer;
    display: inline-block;
  }

  .con_de {
    padding: 2%;
    width: 96%;
    border: 1px solid #ebebeb;
    border-radius: 3px
  }

  .con_de_ti {
    display: inline-block;
    margin-left: 12%;
  }

  .con_de_d_left {
    display: inline-block;
    width: 10%;
    color: #409EFF;
  }

  .con_de_d {
    margin-top: 50px;
    display: flex;
  }

  .con_de_d_right {
    text-align: left;
    word-break: break-all;
    line-height: 1.5;
    width: 85%;
  }

  .color_choose {
    color: #409EFF;
    /*padding-right: 10px;*/
  }
</style>
