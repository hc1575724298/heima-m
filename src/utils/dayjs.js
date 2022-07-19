/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-18 15:22:46
 * @LastEditors: sj
 * @LastEditTime: 2022-07-18 15:30:53
 */
import dayjs from 'dayjs'

// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 配置中文包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

export default dayjs
