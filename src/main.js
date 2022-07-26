/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 08:59:21
 * @LastEditors: sj
 * @LastEditTime: 2022-07-26 10:00:57
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/fonts/iconfont.css'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入flexible
import 'amfe-flexible/index.min.js'

// import '@/assets/news.css'
Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
