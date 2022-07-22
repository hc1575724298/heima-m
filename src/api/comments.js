/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-21 19:30:54
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 17:36:22
 */
import request from '@/utils/request'

// 获取评论
/**
 *
 * @param {a/c} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @returns
 */
export const getComments = (type, source, offset) => request({
  url: '/v1_0/comments',
  params: {
    type,
    source,
    offset,
    limit: 5
  }
})

// 对文章或者评论进行评论  /v1_0/comments
/**
 *
 * @param {string} target 评论的目标id
 * @param {string} content 评论内容
 * @param {string} artId  文章id
 * @returns
 */
export const pullComments = (target, content, artId) => request({
  url: '/v1_0/comments',
  method: 'POST',
  data: {
    target,
    content,
    artId
  }
})

// 对评论或评论回复点赞
/**
 *
 * @param {string} target 点赞的评论id
 * @returns
 */
export const getLiking = (target) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }
})

// 取消对评论或评论回复点赞
/**
 *
 * @param {string} target 要取消点赞的评论id或评论回复id
 * @returns
 */
export const delLiking = (target) => request({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE'
})
