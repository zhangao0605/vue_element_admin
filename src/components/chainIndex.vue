<template>
  <div>
    <div class="con_header">
      区块链管理
    </div>
    <div class="con_first">
      <div class="con_first_left">
        主链：
      </div>
      <div class="con_first_right">
        <el-card shadow="hover" body-style="padding:10px">
          区块高度 <span>{{chain_main_info.currentheight||0}}</span>
        </el-card>
        <el-card shadow="hover" body-style="padding:10px">
          参选成员 <span>{{chain_main_info.currentcomm.length||0}}</span>
        </el-card>
      </div>
    </div>
    <div class="con_first" style="margin-top: 30px">
      <div class="con_first_left">
        交易信息链：
      </div>
      <div class="con_first_right">
        <el-card shadow="hover" body-style="padding:10px">
          区块高度 <span>{{chain_info.currentheight||0}}</span>
        </el-card>
        <el-card shadow="hover" body-style="padding:10px">
          参选成员 <span>{{chain_info.currentcomm.length||0}}</span>
        </el-card>
        <el-card shadow="hover" body-style="padding:10px">
          交易总量 <span>{{chain_info.txcount||0}}</span>
        </el-card>
      </div>
    </div>
    <div class="con_header ma_top">
      区块信息
    </div>
    <div class="con_table">
      <el-table
        :data="tableData_chain"
        max-height="280"
        border
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          prop="height"
          label="区块高度"
          align="center">
        </el-table-column>
        <el-table-column
          prop="theDateString"
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="chainId"
          label="分链ID"
          align="center">
        </el-table-column>
        <el-table-column
          prop="txcount"
          label="交易量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="90">
          <template slot-scope="scope">
            <el-button @click="handleClick_1(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="con_header ma_top">
      交易信息
    </div>
    <div class="con_table">
      <el-table
        :data=" tableData_transaction"
        max-height="280"
        border
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          prop="theDateString"
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="hash"
          label="交易哈希"
          align="center">
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
          prop="address"
          label="操作"
          align="center"
          width="90">
          <template slot-scope="scope">
            <el-button @click="handleClick_2(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getMainChainStat, getNewBlock,getBlockTxs} from '../api/interface'

  export default {
    name: "chainIndex",
    data() {
      return {
        tableData_chain: [],
        tableData_transaction: [],
        chain_info: {
          'currentcomm':[]
        },
        chain_main_info: {
          'currentcomm':[]
        },
        timer: "",
      }
    },
    methods: {
      /*获取主链信息默认id：0*/
      getChinInfo_main() {
        getMainChainStat(0).then(response => {
          this.chain_main_info = response
        })
      },
      /*获取交易信息链*/
      getChinInfo_chain() {
        let chains = this.$store.getters.chainIds
        let selectchains = this.$store.getters.select_chainId
        getMainChainStat(chains[selectchains].chainId).then(response => {
          // if(response.)
          this.chain_info = response
        })
      },
      /*获取区块信息列表*/
      getNewBlock() {
        let chains = this.$store.getters.chainIds
        let selectchains = this.$store.getters.select_chainId
        getNewBlock(chains[selectchains].chainId).then(response => {
          this.tableData_chain = response
        })
      },
      /*获取交易信息列表*/
      getBlockTxs() {
        let chains = this.$store.getters.chainIds
        let selectchains = this.$store.getters.select_chainId
        getBlockTxs(chains[selectchains].chainId).then(response => {
          this.tableData_transaction = response
        })
      }
      ,
      handleClick_1(e) {
        this.$store.dispatch('app/setBlockData',e)
        this.$router.push({name: 'blockDetails'})
      },
      handleClick_2(e) {
        this.$store.dispatch('app/setTransactionData',e)
        this.$router.push({name: 'transactionDetails'})
      }
    }, mounted() {
      this.getChinInfo_main()
      this.getChinInfo_chain()
      this.getNewBlock()
      this.getBlockTxs()
      let _this=this
      this.timer=setInterval(function () {
        _this.getChinInfo_main()
        _this.getChinInfo_chain()
        _this.getNewBlock()
        _this.getBlockTxs()
      },3000)

    }, beforeDestroy() {
      let _this = this
      clearInterval(_this.timer)
    }
  }
</script>

<style scoped>


  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .con_first {
    display: flex;
  }

  .con_first_left {
    width: 10%;
    font-size: 17px;
    text-align: right;
    font-weight: 600;
    /*margin-right: 5%;*/
  }

  .con_first_right {
    display: flex;
  }

  .el-card {
    padding: 0;
    margin: 0;
    margin-left: 50px;
    position: relative;
    top: -11px;
  }

  .ma_top {
    margin-top: 30px;
  }
</style>
