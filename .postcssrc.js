/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 11:22:34
 * @LastEditors: sj
 * @LastEditTime: 2022-07-24 11:24:34
 */
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      //vant 组件根据37.5
      // rootValue: 37.5,
      // 动态设置 rootValue
      rootValue: (module) => {
        // console.log(module)
        return (/vant/gi.test(module.file) ? 37.5 : 75)
      },
      //适配的属性
      propList: ['*']
    }
  }
}
