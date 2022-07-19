/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-18 08:55:48
 * @LastEditors: sj
 * @LastEditTime: 2022-07-18 09:03:40
 */
import request from '@/utils/request'

export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
