// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'  // 这里Element就只代element-ui插件
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import './assets/css/global.css'
// 登录icon
import './assets/css/iconfont.css'
// 导入axios
import axios from 'axios'
// 配置访问页面的拦截器
// 每个请求都携带token到后台服务器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios; //挂载axios到Vue的原型对象上，就可通过this来访问
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'; // axios的基准url路径配置

// 挂载
Vue.use(Element);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
