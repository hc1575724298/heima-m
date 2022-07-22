<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-22 11:15:48
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 20:14:52
-->
<template>
    <van-cell
        class="suggestion"
      >
        <template #title>
          <van-image round width="35px" height="35px" :src="thisComment.aut_photo" />
        </template>

        <template #default>
          <div class="top">
            <div class="left">{{thisComment.aut_name }}</div>
            <div class="right">
              <!-- <div @click="thisComment.is_liking = !thisComment.is_liking"> -->
              <div @click="clickGoodJob">
                <van-icon name="good-job-o" v-if="!thisComment.is_liking" />
                <van-icon
                  name="good-job"
                  style="color: red"
                  v-else
                  class="good-job"
                />
              </div>
              <div>
                <span v-if="thisComment.like_count === 0">赞</span>
                <span v-else>{{thisComment.like_count }}</span>
              </div>
            </div>
          </div>
          <div class="center">
            {{ thisComment.content }}
          </div>
          <div class="bottom">
            <span>{{ aeticleDesc }}</span>
            <van-button type="default" round @click="$emit('isShowCommt')"
              >回复<span>{{ thisComment.reply_count }}</span>
            </van-button>
          </div>
        </template>
   </van-cell>
</template>

<script>
import dayjs from '@/utils/dayjs'
import {
  delLiking,
  getLiking
} from '@/api'
export default {
  props: {
    thisComment: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    aeticleDesc () {
      const time = dayjs(this.thisComment.pubdate).fromNow()
      return time
    }
  },
  methods: {
    async getLiking () {
      try {
        await getLiking(this.thisComment.com_id)
        this.$toast('评论点赞成功')
      } catch (error) {
        this.$toast('评论点赞失败')
      }
    },
    async delLiking () {
      try {
        await delLiking(this.thisComment.com_id)
        this.$toast('取消评论点赞')
      } catch (error) {
        this.$toast('取消评论点赞失败')
      }
    },
    clickGoodJob () {
      this.thisComment.is_liking ? this.delLiking() : this.getLiking()
      // console.log(this.thisComment)
      this.$emit('changeGoodJob')
    }
  }
}
</script>

<style lang="less" scoped>
  .suggestion {
  .van-cell__value {
    flex: 6;

    .top {
      display: flex;
      justify-content: space-between;
      .right {
        display: flex;
        .good-job {
          &::before {
            color: red;
          }
        }
        span {
          margin-left: 5px;
        }
      }
    }

    .center {
      display: flex;
      justify-content: flex-start;
      color: #000;
      margin: 16px 0;
    }

    .bottom {
      display: flex;
      justify-content: flex-start;
      font-size: 12px;
      color: #000;
      span {
        margin-right: 12px;
      }
      .van-button {
        font-size: 12px;
        height: 48px;
        width: 136px;
        /deep/ .van-button__content {
          width: 100px;
          height: 100%;
        }
      }
    }
  }
}
</style>
