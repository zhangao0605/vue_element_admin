<template>
  <div class="con_3">
    <div class="con_header mar_top">
      节点详情
    </div>
    <div class="con_3_select">
      <el-select v-model="status" placeholder="请选择" @change="select_change">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="con_table">
      <el-table
        :data="tableData"
        border
        v-loading="Loading"
        max-height="535"
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor">
        <el-table-column
          label="IP"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.ip}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否数据节点"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.runInfo==null?'':is_no(scope.row.runInfo.isDataNode)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最新成块时间"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.runInfo==null?'':time_change(scope.row.runInfo.lastBlockTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最新事件"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.runInfo==null?'':time_change(scope.row.runInfo.lastEventTime)}}</span>
            <!--<span>{{}}</span>-->
          </template>
        </el-table-column>
        <el-table-column
          label="最新消息"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.runInfo==null?'':time_change(scope.row.runInfo.lastMsgTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="队列溢出"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.runInfo==null?'':is_no(scope.row.runInfo.overflow)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="运行状态"
          align="center">
          <template slot-scope="scope">
            <span :class="scope.row.status==0?'is_success':'is_error'">{{is_run(scope.row.status)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totla">
    </el-pagination>
  </div>

</template>

<script>
  import {getCompany, getNodeInfo, getAllNodeInfo} from '../../api/interface'

  export default {
    name: "index",
    data() {
      return {
        enterprise: [],
        options: [{
          value: '',
          label: '全部节点'
        }, {
          value: '0',
          label: '正常节点'
        }, {
          value: '1',
          label: '异常节点'
        }],
        tableData: [],
        Loading: false,
        sta: '',
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        status:''
      }
    },
    methods: {
      /*获取节点详情*/
      getAllNodeInfo() {
        this.func(1,this.status)
      },
      /*是否数据节点*/
      is_no(e) {
        let a = ''
        if (e == true) {
          a = '是'
        } else {
          a = '否'
        }
        return a
      },
      /*运行状态*/
      is_run(e) {
        let a = ''
        if (e == 0) {
          a = '正常'

        } else {
          a = '异常'
        }
        return a
      },
      /*定时器*/
      seInt() {
        let _this = this
        this.sta = setInterval(function () {
          _this.func(_this.currentPage,_this.status)
        },120000)
      },
      /*数据分页*/
      currentPageChange(e){
        this.currentPage=e
        this.func(this.currentPage,this.status)
      },
      /*状态切换*/
      select_change(e){
       this.status=e
       this.currentPage=1
        this.func(1,this.status)
      },
      /*自定义函数*/
      func(e,q){
        this.Loading = true
        let data={
          "page":e,
          "pagesize":10,
          "status":q,
        }
        getAllNodeInfo(data).then(response => {
          this.Loading = false
          this.totla=response.total
          this.tableData = response.dataList
        })
      }

    },
    mounted() {
    },
    created() {
      this.getAllNodeInfo()
      this.seInt()
    },
    beforeDestroy() {
      let _this = this
      clearInterval(_this.sta)
    }
  }
</script>

<style scoped>
  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 50px;
  }
  .con_3 {
    width: 96%;
    padding: 2%;
  }

  .con_search {
    display: flex;
  }

  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .con_search_state {
    margin-left: 10%;
  }

  .el-button {
    margin-left: 10%;
    padding: 10px 30px;
  }

  .mar_top {
    margin-top: 50px;
  }

  .is_success {
    color: #67c23a;
  }

  .is_error {
    color: #f56c6c;
  }
  .con_3_select{
    float: right;
    margin-bottom: 40px;

  }
</style>
