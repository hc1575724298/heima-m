/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 16:55:24
 * @LastEditors: sj
 * @LastEditTime: 2022-07-13 17:38:03
 */
import axios from 'axios'

// 创建一个全新的axios对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

export default request
