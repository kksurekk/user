<template>
    <div>
        <!-- <el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。 -->
        <el-container>
            <el-header>头部区域</el-header>
            <el-container>
                <el-aside>
                    <el-menu>
                        <!--导航一-->
                        <el-submenu index='1'>
                            <template slot="title">
                                <span class="el-icon-info"></span>
                                <span>用户管理</span>
                            </template>

                            <el-menu-item index="1-1"><i class='el-icon-success'/>用户列表</el-menu-item>
                            <el-menu-item index="1-2"><i class='el-icon-warning'/>添加用户</el-menu-item>
                            <!--三级导航-->
                            <el-submenu index='1-3'>
                                <template slot='title'><i class='el-icon-success'/>用户信息</template>
                                <el-menu-item index="1-3-1"><i class='el-icon-success'/>设置</el-menu-item>
                                <el-menu-item index="1-3-2"><i class='el-icon-success'/>显示</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <!--导航二-->
                        <el-submenu index='2'>
                            <template slot='title'><span><i class='el-icon-success'/>栏目管理</span></template>
                            <el-menu-item index='2-1'><span><i class='el-icon-success'/>栏目列表</span></el-menu-item>
                            <el-menu-item index='2-2'><span><i class='el-icon-success'/>添加栏目</span></el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>内容区域</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-header {
  background: blue;
  color: white;
  text-align: center;
  height: 100px;
 
}
.el-aside {
  background: green;
  color: white;
  height: 800px;
}
.el-main {
  background: gray;
}
</style>
