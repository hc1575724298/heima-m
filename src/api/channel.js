/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-16 17:47:56
 * @LastEditors: sj
 * @LastEditTime: 2022-07-19 12:21:16
 */
import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannels = () => request({ url: '/v1_0/user/channels' })

export const getAllChannels = () => request({ url: '/v1_0/channels' })

//  在本地存储中  存和取 我的频道数据
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'

export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelToLocal = (channel) => storage.set(HEIMA_TOUTIAO_CHANNELS, channel)

//  /v1_0/mp/articles/:target
/**
 *
 * @param {string|Number} target  频道id
 * @returns Promise
 */
export const delMyChannel = (target) => request({
  url: `/v1_0/user/channels/${target}`,
  method: 'DELETE'
})

/**
 * 添加我的频道
 * @param {number} id 频道ID
 * @param {number} seq  添加位置， 索引
 * @returns
 */
export const addMyChannel = (id, seq) => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [{ id, seq }]
  }
})
