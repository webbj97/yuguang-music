/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-07-31 18:25:25
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/index.js'

import '@/style/index.scss'
import '@/utils/axios'

import global from '@/utils/global.js' // 全局配置

Vue.config.productionTip = false
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
