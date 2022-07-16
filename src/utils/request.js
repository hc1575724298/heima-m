/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 16:55:24
 * @LastEditors: sj
 * @LastEditTime: 2022-07-16 16:17:28
 */
import axios from 'axios'
import store from '@/store'

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

export default request
