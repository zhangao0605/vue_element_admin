<template>
  <div class="con_1">
    <div class="con_header">
      平台概览
    </div>
    <div class="con_box">
      <el-card class="box-card">
        <div class="text item">
          <div class="item_hea">区块链</div>
          <div>已部署区块链</div>
          <div class="box-card-line"><span class="color_choose">{{tableData.length}}</span>条</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <div class="item_hea">节点数</div>
          <div>已部署节点</div>
          <div class="box-card-line"><span class="color_choose">{{Number_node}}</span>个</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <div class="item_hea">智能合约</div>
          <div>已部署智能合约</div>
          <div class="box-card-line"><span class="color_choose">{{Number_contracts}}</span>个</div>
        </div>
      </el-card>
    </div>
    <div class="con_header" style="margin-top: 40px">
      链列表
    </div>
    <div class="con_table">
      <el-table
        :data="tableData"
        max-height="500"
        border
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor">
        <el-table-column
          prop="companyName"
          label="链名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="运行状态"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nodeNum"
          label="节点数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="currentHeight"
          label="区块高度"
          align="center">
        </el-table-column>
        <el-table-column
          prop="txCount"
          label="交易量"
          align="center">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--label="操作"-->
        <!--align="center"-->
        <!--width="90">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getuserchains} from '../api/interface'

  export default {
    name: "homeContent",
    data() {
      return {
        tableData: [],
        timer: "",
        Number_contracts: 0,
        Number_node: 0,
        chainIds:[]
      }
    }, methods: {
      get_table_data() {
        let _this = this
        this.timer = setInterval(function () {
          getuserchains(_this.$store.getters.roles.userId).then(response => {
            _this.Number_contracts = 0
            _this.Number_node = 0
            response.forEach((item, index, arr) => {
              item.createtime = _this.timestampToTime(item.createTime)
              _this.Number_contracts += item.contractNum
              _this.Number_node += item.nodeNum
            })
            _this.tableData = response
          })
        }, 3000)
      }
    }, mounted() {
      getuserchains(this.$store.getters.roles.userId).then(response => {
        response.forEach((item, index, arr) => {
          this.chainIds.push({'chainId':item.chainId,'address':item.address})
          item.createtime = this.timestampToTime(item.createTime)
          this.Number_contracts += item.contractNum
          this.Number_node += item.nodeNum
        })
        this.$store.dispatch('login/setChaidId',this.chainIds)
        /*左侧导航栏默认第一条链*/
        this.$store.dispatch('login/setSelectChaidId',0)
        this.tableData = response
      })
      this.get_table_data()
    }, beforeDestroy() {
      let _this = this
      clearInterval(_this.timer)
    }
  }
</script>

<style scoped>
  .con_1 {
    width: 96%;
    padding: 2%;
  }

  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .con_box {
    display: flex;
    justify-content: space-between;
  }

  .box-card {
    text-indent: 5%;
    width: 25%;
  }

  .box-card-line {
    padding-top: 20px;
  }

  .color_choose {
    color: #409EFF;
    font-size: 22px;
    padding-right: 10px;
  }

  .item_hea {
    font-weight: 600;
    font-size: 16px;
    padding-bottom: 5px;
  }
</style>
