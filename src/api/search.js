/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-19 16:10:07
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 09:10:58
 */
import request from '@/utils/request'

import storage from '@/utils/storage'
export const getSearchSuggestions = (q) => request({
  url: '/v1_0/suggestion',
  params: { q }

})

//  /v1_0/search

export const getSearchResults = (q, page) => request({
  url: '/v1_0/search',
  params: {
    q,
    page
  }
})

export const getSearchHistory = () => storage.get('historyList')
export const setSearchHistory = (value) => storage.set('historyList', value)
