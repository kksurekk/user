import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import Register from './views/Register.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'/',
      redirect:'/login',
      meta: {requiresAuth:false},
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false},
      hidden: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false},
      hidden: true
    },
    {
      path: '/main',
      name: 'user_main',
      iconCls: 'el-icon-user',
      component: Main,
      meta: {requiresAuth:true,title:'用户管理'},
      children:[
        {
          path: '/user/list',
          name: 'user_list',
          meta:{title:'用户列表'},
          iconCls: 'el-icon-s-custom',
          component: () => import('./views/user/List.vue')
        },
        {
          path: '/user/add',
          name: 'user_add',
          meta:{title:'添加用户'},
          iconCls: 'el-icon-plus',
          component: () => import('./views/user/Add.vue')
        },
        {
          path: '/user/update',
          name: 'user_update',
          meta:{title:'修改用户'},
          iconCls: 'el-icon-plus',
          component: () => import('./views/user/update.vue')
        }
      ]
    },
     {
       path: '/main',
       name: 'type_main',
       iconCls: 'el-icon-user',
        meta: {requiresAuth:true,title:'栏目管理'},
       component: Main,
       children: [{
           path: '/type/list',
           name: 'type_list',
           meta:{title:'栏目列表'},
           iconCls: 'el-icon-s-custom',
           component: () => import('./views/user/List.vue')
         },
         {
           path: '/type/add',
           name: 'type_add',
            meta:{title:'添加栏目'},
           iconCls: 'el-icon-plus',
           component: () => import('./views/user/Add.vue')
         }
       ]
     }

  ]
})
