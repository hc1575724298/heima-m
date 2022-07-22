<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-19 14:44:38
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 09:17:46
-->
<template>
  <div>
    <form action="/">
  <van-search
    v-model="keyWords"
    show-action
    placeholder="请输入搜索关键词"
    @focus="isFocused"
    @search="onSearch"
    @cancel="$router.go(-1)"
  />
</form>

<!-- 组件 -->
<component :is="comName" :keyWords="keyWords" @changeKeyWords="changeKeyWords" @toresult="toresult"></component>

  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
import { getSearchHistory, setSearchHistory } from '@/api'
export default {
  data () {
    return {
      keyWords: '',
      isShowSearchResults: false,
      historyList: getSearchHistory() || []
    }
  },
  methods: {
    onSearch () {
      // 按下回车/索搜时 触发
      this.isShowSearchResults = true

      this.historyList.unshift(this.keyWords)
      this.historyList = [...new Set(this.historyList)]
      // console.log(this.historyList)
      setSearchHistory(this.historyList)
    },
    isFocused () {
      // 搜索框聚焦时，
      // 有数据，显示搜索建议   无数据，显示搜索历史
      this.isShowSearchResults = false
    },
    changeKeyWords (val) {
      this.keyWords = val
      this.onSearch()
    },
    toresult (val) {
      this.keyWords = val
      this.onSearch()
    }
  },
  computed: {
    comName () {
      if (this.keyWords.trim() === '') return 'SearchHistory'

      if (this.isShowSearchResults) return 'SearchResult'

      return 'SearchSuggestion'
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  }
}
</script>

<style>

</style>
