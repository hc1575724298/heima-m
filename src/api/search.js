/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-19 16:10:07
 * @LastEditors: sj
 * @LastEditTime: 2022-07-19 16:19:47
 */
import request from '@/utils/request'

export const getSearchSuggestions = (q) => request({
  url: '/v1_0/suggestion',
  params: { q }

})
