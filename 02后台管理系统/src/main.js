import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NavHeader from './components/NavHeader.vue'
import NavMenu from './components/NavMenu.vue'
import axios from 'axios'
Vue.prototype.$store = store;

Vue.component('NavHeader', NavHeader);
Vue.component('NavMenu', NavMenu);
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    //1.不需要登录验直接放行
    if (!to.matched.some(record => record.meta.requiresAuth)) {
      next();
      return;
    }
    //2.登录验证
    const user = store.getters.getUser;
    if (user) {
      next();
      return;
    }
    //3.不是直接放行，也没有登录，跳转到登录界面
    next({name:'login',params:{message:'请登录后再试!'}});

})

axios.interceptors.request.use(req => {
  console.log(`request 请求拦截 >>>> `);
  const user = store.getters.getUser; // 获取用户状态
  //判断用户是否登录
  if (user !== null) {
    //获取token令牌
    const token = store.getters.getToken;
    //设置token到请求头部Authorization=`token-${token}`
    req.headers.Authorization = `token-${token}`
  }
  return req;
}, err => {
  return Promise.reject(err);
})

/**
 * axios 响应拦截
 */
axios.interceptors.response.use(res => {
  console.log('response 响应用拦截');
  return res;
}, err => {
  //http统一错误处理
  if (err.response) {
    switch (err.response.status) {
      case 401:
        //处理401
        break;
      case 500:
        //处理500
        router.replace({
          path: '/error500'
        })
        break;
    }
  }

  return Promise.reject(err);
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
