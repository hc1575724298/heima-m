/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-21 19:30:54
 * @LastEditors: sj
 * @LastEditTime: 2022-07-21 19:35:21
 */
import request from '@/utils/request'

// 获取评论
/**
 *
 * @param {a/c} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @returns
 */
export const getComments = (type, source) => request({
  url: '/v1_0/comments',
  params: {
    type,
    source
  }
})
