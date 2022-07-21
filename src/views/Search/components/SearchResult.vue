<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-19 15:14:24
 * @LastEditors: sj
 * @LastEditTime: 2022-07-21 19:26:13
-->
<template>
  <div>
    <van-list
    :error.sync="error"
    error-text="请求失败，点击重新加载"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in resultsList" :key="item.art_id" :title="item.title" @click="toMore(item.art_id)"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      resultsList: [],
      page: 1,
      error: false
    }
  },
  created () {
    this.getSearchResults()
  },
  methods: {
    async getSearchResults () {
      try {
        const { data: { data } } = await getSearchResults(this.keyWords, this.page)
        console.log(data)
        this.resultsList = data.results
      } catch (error) {
        console.log(error)
      }
    },
    // 触底加载更多
    async onLoad () {
      // 异步更新数据
      this.page++
      try {
        const { data: { data } } = await getSearchResults(this.keyWords, this.page)
        if (data.results.length === 0) {
          this.finished = true
        } else {
          this.resultsList.push(...data.results)
          // this.loading = false
        }
      } catch (error) {
        this.error = true
      }
      this.loading = false
    },
    // 跳往详情
    toMore (artId) {
      this.$router.push({
        name: 'moremsg',
        params: {
          artId
        }
      })
    }
  }
}
</script>

<style></style>
