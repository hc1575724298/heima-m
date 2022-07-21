<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-16 18:04:44
 * @LastEditors: sj
 * @LastEditTime: 2022-07-21 14:47:17
-->
<template>
  <div>
    <van-pull-refresh
    success-text="刷新成功!"
    v-model="refreshLoading"
    @refresh="loadNextPage">
      <van-list
        @load="loadNextPage"
        offset="0"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请重试"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"

        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  components: {
    ArticleItem
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data.data.results)

        this.pre_timestamp = data.data.pre_timestamp // 保存第一次页码
        this.articles = data.data.results
      } catch (e) {
        // 获取状态吗
        const status = e.response.status
        if (status === 400) {
          throw new Error(e.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请刷新重试')
        }
      }
    },
    async loadNextPage () {
      try {
        // if (Math.random() > 0.7) {
        //   throw new Error('加载错误')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)

        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        // 将第n页数据， 放在articles数组中
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
