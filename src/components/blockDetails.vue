<template>
  <div>
    <div class="con_header">
      <span class="back" @click="back()">区块链管理</span> > 区块详情
    </div>
    <div class="con_header ma_top">
      交易信息
    </div>
    <div class="con_de">
      <div>
        <span class="con_de_ti"><span
          class="color_choose">区块高度：</span><span>{{transaction_details.height}}</span></span>
        <span class="con_de_ti"><span
          class="color_choose">分链ID：</span><span>{{transaction_details.chainId}}</span></span>
        <span class="con_de_ti"><span
          class="color_choose">交易数：</span><span>{{transaction_details.txcount}}</span></span>
        <span class="con_de_ti"><span
          class="color_choose">生成时间：</span><span>{{transaction_details.theDateString}}</span></span>
      </div>
      <div class="con_de_d">
        <span class="con_de_d_left color_choose">
          当前区块哈希值：
        </span>
        <span class="con_de_d_right ">
          {{transaction_details.hash}}
        </span>
      </div>
      <div class="con_de_d">
        <span class="con_de_d_left color_choose">
          前一区块哈希值：
        </span>
        <span class="con_de_d_right">
          {{transaction_details.previousHash}}
        </span>
      </div>
    </div>
    <div class="con_header" style="margin-top: 30px">
      交易详情
    </div>
    <div class="con_table">
      <el-table
        :data="tableData_transaction"
        max-height="280"
        border
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="交易哈希"
          align="center">
          <template slot-scope="scope">
            <span class="to_tr color_choose" @click="handleClick_2(scope.row)">{{scope.row.hash}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="resultContractInfo.contractName"
          label="执行合约"
          align="center">
        </el-table-column>
        <el-table-column
          prop="resultContractInfo.methodName"
          label="执行方法"
          align="center">
        </el-table-column>
        <el-table-column
          prop="theDateString"
          label="创建时间"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getBlockTxs, getBlockTxsByHeight} from '../api/interface'

  export default {
    name: "blockDetails",
    data() {
      return {
        transaction_details: {},
        tableData_transaction: [],
      }
    }, methods: {
      back() {
        this.$router.push({path: '/chain/chainManagement'})
      },
      /*获取当前区块交易信息列表*/
      getBlockTxsByHeight() {
        let chains = this.$store.getters.chainIds
        let selectchains = this.$store.getters.select_chainId
        getBlockTxsByHeight(chains[selectchains].chainId, this.transaction_details.height).then(response => {
          // getBlockTxsByHeight(chains[selectchains].chainId, 70).then(response => {
          this.tableData_transaction = response
        })
      },
      handleClick_2(e) {
        this.$store.dispatch('app/setTransactionData', e)
        this.$router.push({name: 'transactionDetails'})
      }
    }, mounted() {
      this.getBlockTxsByHeight()

    }, created() {
      this.transaction_details = this.$store.getters.blockData
    }
  }
</script>

<style scoped>

  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .ma_top {
    margin-top: 10px;
  }

  .con_de {
    padding: 2%;
    width: 96%;
    height: 124px;
    border: 1px solid #ebebeb;
    border-radius: 3px
  }

  .con_de_ti {
    display: inline-block;
    margin-left: 12%;
  }

  .con_de_ti:nth-child(1) {
    margin-left: 0%;
  }

  .con_de_d_left {
    display: inline-block;
    width: 13%;
  }

  .con_de_d {
    margin-top: 30px;
  }

  .color_choose {
    color: #409EFF;
    /*padding-right: 10px;*/
  }

  .back {
    cursor: pointer;
    display: inline-block;
  }

  .to_tr {
    display: inline-block;
    cursor: pointer;
  }
</style>
