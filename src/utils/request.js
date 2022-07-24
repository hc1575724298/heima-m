/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 16:55:24
 * @LastEditors: sj
 * @LastEditTime: 2022-07-24 16:14:26
 */
import axios from 'axios'
import store from '@/store'
import { Notify } from 'vant'
import router from '@/router'
// 创建一个全新的axios对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 请求拦截器 ： 每次请求前都会执行的函数

request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    config.headers.Authorization = `Bearer ${token}`
    // config 本次请求的配置， 必须返回出去
    return config
  },
  // 请求错误是处理的方法
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  // 401代表身份过期
  if (error.response.status === 401) {
    // 不能使用this.$router (因为this 不是vue组件对象 无法调用¥router)
    // 直接引入@/router
    Notify({ type: 'warning', message: '身份过期' })
    router.replace('/login')
  }
  return Promise.reject(error)
})
export default request
