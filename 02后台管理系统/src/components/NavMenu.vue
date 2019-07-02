<template>
    <div>
        <div class="leftnav-title"><strong><span class="icon-list"></span>菜单列表</strong></div>
         <!--router ： 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
        <el-menu  unique-opened router background-color='#FFF5EE' style="height:800px">
            <!--导航一-->
            <template v-for="(item,index) in rootRoutes" >
                <el-submenu :index='item.name' :key="index" v-if="!item.hidden">
                <template slot="title">
                    <span :class="item.iconCls"></span>
                    <span>{{item.meta.title}}</span>
                </template>

                <el-menu-item v-for="(subItem,ins) in item.children" :index="subItem.path" :key="ins">
                        <i :class='subItem.iconCls'/>{{subItem.meta.title}}
                </el-menu-item>

                </el-submenu>
            </template>
        </el-menu>
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
.leftnav-title { height:50px; background:url(../assets/images/bg.jpg) no-repeat 0 -1000px;  color:#FFF; padding-left:22px;  font-size:14px; line-height:50px;}
.leftnav-title span{ margin-right:10px;}

</style>
