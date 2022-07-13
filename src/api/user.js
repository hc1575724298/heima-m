/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 17:11:23
 * @LastEditors: sj
 * @LastEditTime: 2022-07-13 17:39:37
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