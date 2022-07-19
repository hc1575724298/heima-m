<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-19 15:14:58
 * @LastEditors: sj
 * @LastEditTime: 2022-07-19 17:37:37
-->
<template>
  <div>
    <van-cell icon="search" v-for="(item,index) in activeKeywords" :key="index">
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  computed: {
    activeKeywords () {
      const reg = new RegExp(this.keyWords, 'gi')

      return this.suggestions.map((str) => {
        return str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      })
    }
  },
  watch: {
    // 监听属性绑定的函数， 如果是methods里的函数， 支持字符串写法
    // keyWords: 'getSearchSuggestions'
    keyWords: {
      immediate: true,
      handler () {
        this.getSearchSuggestions()
      }

    }
  },
  methods: {
    async getSearchSuggestions () {
      try {
        const { data } = await getSearchSuggestions(this.keyWords)
        this.suggestions = data.data.options.filter(Boolean)
        if (this.suggestions.length === 0) return this.$toast.fail('暂无搜索建议')
        console.log(data.data.options)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
