/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 17:11:23
 * @LastEditors: sj
 * @LastEditTime: 2022-07-23 18:12:55
 */
import request from '@/utils/request'

/**
 *
 * @param {*} mobile手机号
 * @param {*} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const senCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

// /v1_0/user/followings 关注用户
/**
 *
 * @param {string} target 关注用户的id
 * @returns
 */
export const toFollowing = (target) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target
  }
})

//  /v1_0/user/followings/:target  取消关注
/**
 *
 * @param {*} target 目标用户（被取消关注的用户id）
 * @returns
 */
export const notFollowing = (target) => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
})

// 获取用户个人资料 /v1_0/user/profile

export const getProfile = () => request({
  url: '/v1_0/user/profile'
})

// 编辑用户个人资料  /v1_0/user/profile

export const editProfile = (data) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data
})

// 编辑用户照片资料  /v1_0/user/photo
export const editPhoto = (data) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data
})
