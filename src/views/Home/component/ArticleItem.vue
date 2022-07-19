<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-18 09:45:57
 * @LastEditors: sj
 * @LastEditTime: 2022-07-18 15:29:06
-->
<template>
  <div>
    <!-- 渲染无图片 -->
    <van-cell v-if="articleInfo.cover.type===0" :title="articleInfo.title" :label="aeticleDesc"></van-cell>

    <!-- 渲染一张图片 -->
    <van-cell v-if="articleInfo.cover.type===1" :title="articleInfo.title" :label="aeticleDesc">
      <van-image
      width="3rem"
      height="2rem"
      :src="articleInfo.cover.images[0]"
      ></van-image>
    </van-cell>

    <!-- 渲染三张图片 -->
    <van-cell v-if="articleInfo.cover.type===3" :title="articleInfo.title" :label="aeticleDesc">
      <template #label>
        <div>
        <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
         width="2.8rem"
      height="2rem"
      :src="item"
      style="margin-right: 0.2rem"
        ></van-image>
      </div>
      <span>{{aeticleDesc}}</span>
      </template>
    </van-cell>

  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    aeticleDesc () {
      const time = dayjs(this.articleInfo.pubdate).fromNow()
      return `${this.articleInfo.aut_name} 评论:${this.articleInfo.comm_count}  ${time}`
    }
  }
}
</script>

<style>

</style>
