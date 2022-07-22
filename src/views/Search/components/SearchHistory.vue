<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-19 15:13:29
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 09:14:22
-->
<template>
  <div>
    <!--索搜历史  -->
    <van-cell title="搜索历史">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template #right-icon v-if="isDel">
    <van-icon name="delete-o"  @click="isDel = false"/>
  </template>

  <template #default v-else>
    <span @click="allDel">全部删除</span>
    &emsp;
    <span @click="isDel = true">完成</span>
  </template>
    </van-cell>

    <!-- 每项索搜历史 -->
<van-cell :title="item" v-for="(item,index) in historyList" :key="index" @click="toResult(item,index)">
   <template #right-icon v-if="!isDel">
    <van-icon name="close" @click="thisDel(index)"/>
  </template>
</van-cell>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/api'
export default {
  data () {
    return {
      historyList: getSearchHistory(),
      isDel: true
    }
  },
  methods: {
    allDel () {
      this.historyList = []
      localStorage.removeItem('historyList')
    },
    thisDel (index) {
      this.historyList.splice(index, 1)
      setSearchHistory(this.historyList)
    },
    toResult (val, index) {
      if (this.isDel) {
        this.$emit('toresult', val)
      } else {
        this.thisDel(index)
      }
    }
  }
}
</script>

<style>

</style>
