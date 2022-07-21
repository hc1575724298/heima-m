/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-18 08:55:48
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 00:09:31
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

//  /v1_0/articles/:article_id   获取新闻详情
export const getMore = (articleId) => request({
  url: `/v1_0/articles/${articleId}`
})

// /v1_0/article/collections 收藏文章
/**
 *
 * @param {integer} articleId 收藏的目标文章id
 * @returns
 */
export const getCollections = (target) => request({
  url: '/v1_0/article/collections',
  method: 'POST',
  data: { target }

})

// /v1_0/article/collections/:target 取消收藏文章
/**
 *
 * @param {*} target 取消收藏的文章
 * @returns
 */
export const delCollections = (target) => request({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE'
})

// /v1_0/article/likings 对文章点赞
/**
 *
 * @param {*} target 点赞的文章id
 * @returns
 */
export const getLike = (target) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: { target }
})

// /v1_0/article/likings/:target 取消对文章点赞

export const dontLike = (target) => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE'
})
