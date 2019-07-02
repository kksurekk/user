import Vue from 'vue'
import Vuex from 'vuex'
import {RequestLogin, RequestLogout} from './api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  // 定义所有vue文件或组件共享的状态数据
  state: {
    user:null,
    token:null
  },
  mutations: {
    //保存用户登录状态
    SAVE_USER(state,username){
      state.user = username;
      localStorage.setItem('user',state.user);
    },
     //移除用户登录状态
    CLEARN_USER(state){
      state.user = null;
      localStorage.removeItem('user');
    },
     //保存token令牌
    SAVE_TOKEN(state,token){
      state.token = token;
      localStorage.setItem('token',state.token);
    },
    //移除token令牌
    CLEARN_TOKEN(state){
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    login({commit},params){
      return new Promise(function(resolve, rejected){
        RequestLogin(params).then(data => {
          commit('SAVE_USER',data.resultInfo.username);
          commit('SAVE_TOKEN',data.token);
          resolve();
        }).catch(err => {
          rejected(err);
        })
      })
    },
    logout({commit}){
      return new Promise(function(resolve, rejected){
        RequestLogout().then(data => {
          if(data.resultCode === 1){
            commit('CLEARN_USER');
            commit('CLEARN_TOKEN');
            resolve();
          }
        }).catch(err => {
          rejected(err);
        })
      })
    }
  },
  getters:{
    // getUser(state) {
    //   return state.user;
    // }
    // getUser: state => state.user,
    // getToken: state => state.token
    getUser(state){
      state.user = localStorage.getItem('user');
      return state.user;
    },
    getToken(state){
      state.token = localStorage.getItem('token');
      return state.token;
    }
    }
})

