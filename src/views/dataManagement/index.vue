<template>
  <div class="account_body">
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      type=index
      style="width: 100%"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        fixed
        prop="orderId"
        label="单据号"
        width="230"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="单据日期"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="orderType"
        label="单据类型"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="company"
        label="企业名称"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="organization"
        label="机构名称"
        width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门名称"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="salesman"
        label="业务员名称"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="buyer"
        label="下游买家名称"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="project"
        label="项目名称"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量"
        width="120" align="center">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="feeAmount"-->
        <!--label="费用金额"-->
        <!--width="120" align="center">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="orderStatus"
        label="单据状态"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="takenQuantity"
        label="实提数量"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="takenWeight"
        label="实提重量"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="takenOrderId"
        label="货齐单号(实提单号)"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="takenDate"
        label="货齐日期(实提单日期)"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="查看"
        width="100" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="1000"
            trigger="click">
            <el-table :data="scope.row.detail">
              <el-table-column width="200" prop="orderId" label="单据号" fixed align="center"></el-table-column>
              <el-table-column width="150" property="lotNumber" label="批号" align="center"></el-table-column>
              <el-table-column width="150" property="storehouseName" label="仓库名称" align="center"></el-table-column>
              <el-table-column width="150" property="goodName" label="品名" align="center"></el-table-column>
              <el-table-column width="150" property="material" label="材质" align="center"></el-table-column>
              <el-table-column width="150" property="specification" label="规格" align="center"></el-table-column>
              <el-table-column width="150" property="placeOfOrigin" label="产地" align="center"></el-table-column>
              <el-table-column width="150" property="price" label="单价" align="center"></el-table-column>
              <el-table-column width="150" property="taxIncludedAmount" label="金额" align="center"></el-table-column>
              <!--<el-table-column width="150" property="fee" label="费用单价" align="center"></el-table-column>-->
              <!--<el-table-column width="150" property="feeAmount" label="费用金额" align="center"></el-table-column>-->
              <el-table-column width="150" property="saleQuantity" label="销售数量" align="center"></el-table-column>
              <el-table-column width="150" property="saleWeight" label="销售重量" align="center"></el-table-column>
              <el-table-column width="150" property="takenQuantity" label="实提数量" align="center"></el-table-column>
              <el-table-column width="150" property="takenWeight" label="实提重量" align="center"></el-table-column>
            </el-table>
            <el-button slot="reference" type="text" size="small">订单详情</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
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
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import {getDataTable} from '../../api/interface'

  export default {
    components: {},
    name: 'index',
    data() {
      return {
        tableData: [],
        tableData_detail: [],
        resturantName: 0,
        loading: false,
        currentPage:1, //初始页
        pagesize:10,    //    每页的数据
        totla:0
      }
    },
    created() {

    }
    , methods: {
      getdata() {
        let data = {
          pageSize: 10,
          pageNum: this.currentPage,
        };
        this.loading = true
        getDataTable(data)
          .then((response) => {
            this.loading = false
            this.tableData = response.dataList
            this.totla = response.total
            if (this.tableData === '' || this.tableData === [] || this.tableData === null || this.tableData === undefined) {
              this.tableData = []
            } else {
              this.tableData.forEach((item, index, arr) => {
                let data = arr[index].orderId
                arr[index].detail.forEach((a, b, c) => {
                  c[b].orderId = data
                })
              })
            }

          })
      },
      currentPageChange(e){
        this.currentPage=e
        this.getdata()
      }
    },
    mounted() {
      this.getdata()
    },
    watch: {
      // '$store.state.app.resturantName': function () {
      //   this.getdata()
      // }
    },
  }
</script>
<style scoped>
  .account_body{
    width: 96%;
    padding: 2%;
  }
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
  .el-pagination{
    float: right;
    margin-right: 3%;
    margin-top: 30px;
  }
</style>
