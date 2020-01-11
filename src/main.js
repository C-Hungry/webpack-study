import './assets/style/index.less';
import './assets/style/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';

import App from './App'

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'hash'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})