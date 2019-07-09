<template>
  <div class="con_4">
    <div class="con_header">
      企业管理
    </div>
    <div class="con_table">
      <el-table
        :data="business_management_data"
        border
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor">
        <el-table-column
          prop="companyName"
          label="企业名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nodeNum"
          label="节点数量"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="con_header mar_top">
      管理员管理
    </div>
    <div class="con_table">
      <el-table
        :data="administrator_data"
        border
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor">
        <el-table-column
          prop="userName"
          label="管理员账号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="所属机构"
          align="center">
        </el-table-column>
        <el-table-column
          prop="crateTime"
          label="授权时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="authorizationId"
          label="授权人"
          align="center">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--label="运行状态"-->
        <!--align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--label="操作"-->
        <!--align="center"-->
        <!--width="90">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="handleClick_2(scope.row)" type="text" size="small">查看</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getuserchains_1,getuserByUserId} from '../../api/interface'

  export default {
    name: "index",
    computed: {
      ...mapGetters(
        [
          'resturantName',
        ]
      )
    },
    data() {
      return {
        business_management_data: [],
        administrator_data: [],
      }
    }, methods: {
      getuserchains_1() {
        getuserchains_1(this.$store.getters.roles.userId).then(response => {
          this.business_management_data=response
        })
      }, getuserByUserId() {
        getuserByUserId(this.$store.getters.roles.userId).then(response => {
          this.administrator_data = response
        })
      },
    },mounted(){
      this.getuserchains_1()
      this.getuserByUserId()
    }

  }
</script>

<style scoped>
  .con_4 {
    width: 96%;
    padding: 2%;
  }

  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .mar_top {
    margin-top: 50px;
  }
</style>
