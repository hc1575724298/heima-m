<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-15 16:46:22
 * @LastEditors: sj
 * @LastEditTime: 2022-07-16 08:58:48
-->
<template>
<div>
  <router-view></router-view>
  <van-tabbar route>
  <van-tabbar-item to='/ '>
    <template #icon>
      <span class="toutiao toutiao-shouye"></span>
    </template>
     <span>首页</span>
  </van-tabbar-item>
 <van-tabbar-item to="/video">
    <template #icon>
      <span class="toutiao toutiao-shipin"></span>
    </template>
      <span>视频</span>
  </van-tabbar-item>
   <van-tabbar-item to="/qa">
    <template #icon>
      <span class="toutiao toutiao-wenda"></span>
    </template>
     <span>问答</span>
  </van-tabbar-item>
   <van-tabbar-item to="/profile">
    <template #icon >
      <span class="toutiao toutiao-wode"></span>
    </template>
          <span>{{!!$store.state.user.token ? '我的' : '未登录'}}</span>
  </van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
 .van-tabbar-item__icon {
   .toutiao {
    font-size: 0.53333rem;
   }
 }
</style>>
