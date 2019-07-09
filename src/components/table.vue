<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="orderId"
        label="单据号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="date"
        label="单据日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orderType"
        label="单据类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="company"
        label="企业名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="organization"
        label="机构名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="salesman"
        label="业务员名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="buyer"
        label="下游买家名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="projec"
        label="项目名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="feeAmount"
        label="费用金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="单据状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="takenQuantity"
        label="实提数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="takenWeight"
        label="实提重量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="takenOrderId "
        label="货齐单号(实提单号)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="takenDate "
        label="货齐日期(实提单日期)"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="mask">-->
      <!--<div class="con">-->
        <!--<ul>-->
          <!--<li>单据号</li>-->
          <!--<li>{{tableData[0].orderId}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>批号</li>-->
          <!--<li>{{tableData_detail.lotNumber}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>仓库名称</li>-->
          <!--<li>{{tableData_detail.storehouseName}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>品名</li>-->
          <!--<li>{{tableData_detail.goodName}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>材质</li>-->
          <!--<li>{{tableData_detail.material }}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>规格</li>-->
          <!--<li>{{tableData_detail.specification}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>产地</li>-->
          <!--<li>{{tableData_detail.placeOfOrigin}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>单价</li>-->
          <!--<li>{{tableData_detail.price}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>金额</li>-->
          <!--<li>{{tableData_detail.taxIncludedAmount}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>费用单价</li>-->
          <!--<li>{{tableData_detail.fee}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>费用金额</li>-->
          <!--<li>{{tableData_detail.feeAmount}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>销售数量</li>-->
          <!--<li>{{tableData_detail.saleQuantity}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>销售重量</li>-->
          <!--<li>{{tableData_detail.saleWeight}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>实提数量</li>-->
          <!--<li>{{tableData_detail.takenQuantity}}</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li>实提重量</li>-->
          <!--<li>{{tableData_detail.takenWeight}}</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
  </div>

</template>

<script>
  export default {
    components: {},
    methods: {
      handleClick(row) {
        this.tableData_detail=row
      }
    },

    data() {
      return {
        tableData: [],
        tableData_detail: []
      }
    },
    created() {

    }
    ,
    mounted() {
      let data = {
        pageSize: 10,
        pageNum: 1,
      };
      this.$get('/v1/ddmg/order', data)
        .then((response) => {
          this.tableData = response.dataList
          this.tableData_detail=response.dataList[0].detail[0]
        })
    },
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
