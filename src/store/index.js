/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 08:59:21
 * @LastEditors: sj
 * @LastEditTime: 2022-07-24 17:30:20
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  // 定义变量
  state: {
    number: 0,
    user: getToken() || {}
  },
  // 修改变量
  mutations: {
    setNumber (state) {
      state.number++
    },
    getUser (store, payload) {
      store.user = payload
      setToken(payload)
    }
  }
})
