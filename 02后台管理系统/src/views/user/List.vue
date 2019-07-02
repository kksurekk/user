
<template>
  <div>
    <el-table :data="userLists" style="width: 100%" @selection-change="handleSelectionChange" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="头像" width="180">
        <template v-slot="scope">
          <!-- <img v-if="scope.row.headerimg" :src="imageUrl+scope.row.headerimg" class="headerImag">
          <img v-else src="../../assets/images/y.jpg" class="headerImag">-->

          <el-image :src="imageUrl+scope.row.headerimg" class="headerImag">
            <div slot="error" class="image-slot">
              <el-image :src="require('../../assets/images/y.jpg')"/>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="180">
        <template v-slot="scope">
          <span style="margin-left: 10px">{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200">
        <template v-slot="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="200">
        <template v-slot="scope">
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="onUserUpdate(scope.row.uid)"
          >修改</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.uid)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button size="mini" type="primary" style="margin:30px" icon="el-icon-delete" @click="handleBatchDelete()">批量删除</el-button>
    <el-pagination :page-size="5"  @current-change="handleCurrentChange" layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
import { URL, RequestUserListPage,RequestList,RequestDel,RequestDeletBatch } from "../../api/api.js";

export default {
  data() {
    return {
      imageUrl: URL,
      userLists: [],
      current:0,
      total:0,
      pageCount:0

    };
  },
  created() {
    const currentNo = 1;
    this.RequestList(currentNo);
  },
  methods: {
    /**
     * 用户列表
     */
   RequestList(currentNo) {
      RequestUserListPage(currentNo).then(data => {
        if (data.resultCode === 1) {
          this.total = data.resultInfo.total; // 总记录条数
          this.current = data.resultInfo.current; //当前页号
          this.pageSize = data.resultInfo.pageSize; //每页显示记录条数
          this.userLists = data.resultInfo.list;
        }
      });
    },
    /**
     * 删除用户
     */
   handleDelete(uid) {
      this.$confirm("你确定要删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then((data) => {
            const params = `uid=${uid}`;
            RequestDel(params).then(data => {
            if (data.resultCode === 1) {
              this. RequestList(1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

    },
    /**
     * 分页
     */
    handleCurrentChange(val){
       console.log(`当前页: ${val}`);
       RequestUserListPage(val).then(data => {
            if (data.resultCode === 1) {
              this.total= data.resultInfo.total;
              this.current=data.resultInfo.current;
              this.userLists = data.resultInfo.list;
            }
          }).catch(err=>{
            console.log('用户列表出错'+err)
          });
    },
    /**
     * 跳转修改页面
     *
     */
    onUserUpdate(uid) {
      this.$router.replace({ path:'/user/update',query:{uid:uid} })
    },
    /**
     * 批量删除
     * ids:[1,2,3]
     */
    handleBatchDelete() {
      const params = `ids=${this.multipleSelection}`;
      RequestDeletBatch(params)
        .then(data => {
          this.RequestList(1);
        })
        .catch(err => {
          console.log("err " + err);
        });
    },
    /**
     * 选中事件
     */
    handleSelectionChange(val){
      this.multipleSelection = val.map(item => parseInt(item.uid));
      console.log(this.multipleSelection);
    },
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: #F8DCDC'
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0C7DB7;color: #fff;font-weight: 500;'
      }
    }
  }
};
</script>

<style scoped>
.headerImag {
  width: 80px;
  height: 80px;
}
</style>
