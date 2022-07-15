/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-15 15:46:05
 * @LastEditors: sj
 * @LastEditTime: 2022-07-15 15:57:41
 */
import storage from './storage'
const TOKEN_KEY = 'HEIMA-TOUTIAO-TOKEN'
export const setToken = (token) => storage.set(TOKEN_KEY, token)
export const getToken = () => storage.get(TOKEN_KEY)
export const removeToken = () => storage.remove(TOKEN_KEY)
