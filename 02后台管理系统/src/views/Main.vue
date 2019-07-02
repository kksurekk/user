<template>
    <div>
        <!-- <el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。 -->
        <el-container>
            <el-header class="header">
              <nav-header/>
            </el-header>
            <el-container>
                <el-aside width="200px">
                   <nav-menu/>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  computed: {
    rootRoutes(){
      return this.$router.options.routes;
    }
  }
}
</script>
<style scoped>
.header {
  height: 70px;
  overflow: hidden;
  background: url(../assets/images/bg.jpg) no-repeat 0 -1000px;
}
</style>
