<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-21 18:02:14
 * @LastEditors: sj
 * @LastEditTime: 2022-07-22 08:33:29
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-21 14:24:45
 * @LastEditors: sj
 * @LastEditTime: 2022-07-21 17:54:53
-->
<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="header"
      title="黑马头条"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 标题 -->
    <h1 class="article-title">{{ moreMsg.title }}</h1>

    <!-- 文章作者信息 -->

    <van-cell class="userInfo">
      <!-- 左侧 -->
      <template #title>
        <van-image
          class="img"
          cover
          round
          width="35px"
          height="35px"
          :src="moreMsg.aut_photo"
        />
        <div class="user">
          <div class="name">{{ moreMsg.aut_name }}</div>
          <div class="time">{{ moreMsg.pubdate }}</div>
        </div>
      </template>

      <!-- 右侧 -->
      <template #default>
        <van-button @click="notFollowing(moreMsg.aut_id)" round type="info" class="add-btn" v-if="moreMsg.is_followed"
          >已关注</van-button
        >
        <van-button @click="toFollowing(moreMsg.aut_id)" round type="info" class="add-btn" v-else>+ 关注</van-button>
      </template>
    </van-cell>

    <!-- 主体内容 -->
    <div class="content markdown-body" v-html="moreMsg.content"></div>

    <!-- 正文结束 -->

    <div class="end"></div>

    <!-- 评论列表 -->
    <van-list
      class="commentList"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        class="suggestion"
        v-for="(item, index) in commentList"
        :key="index"
      >
        <template #title>
          <van-image round width="35px" height="35px" :src="item.aut_photo" />
        </template>

        <template #default>
          <div class="top">
            <div class="left">{{ item.aut_name }}</div>
            <div class="right">
              <div @click="item.is_liking = !item.is_liking">
                <van-icon name="good-job-o" v-if="!item.is_liking" />
                <van-icon
                  name="good-job"
                  style="color: red"
                  v-else
                  class="good-job"
                />
              </div>
              <div>
                <span v-if="item.like_count === 0">赞</span>
                <span v-else>{{ item.like_count }}</span>
              </div>
            </div>
          </div>
          <div class="center">
            {{ item.content }}
          </div>
          <div class="bottom">
            <span>{{ item.pubdate }}</span>
            <van-button type="default" round @click="callBack"
              >回复<span>{{ item.reply_count }}</span>
            </van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
    <!-- 底部 -->
    <div class="footer">
      <van-button round type="default" class="write-btn" @click="show=true">写评论</van-button>
      <van-icon name="comment-o" :badge="moreMsg.comm_count" />
      <van-icon name="star" v-if="moreMsg.is_collected" @click="delCollections"/>
      <van-icon name="star-o" v-else @click="getCollections"/>
      <van-icon name="good-job" :badge="moreMsg.like_count" v-if="isLike" @click="dontLike"/>
      <van-icon name="good-job-o" :badge="moreMsg.like_count" v-else @click="getLike"/>
      <van-icon name="share" />
    </div>

    <!-- 写评论弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '13%' }" class="writeComment">
       <van-field
       class="write-field"
  v-model="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
/>
<van-button plain type="info" class="put-btn">发布</van-button>
    </van-popup>
  </div>
</template>

<script>
import { getMore, getComments, toFollowing, notFollowing, getCollections, delCollections, getLike, dontLike } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      moreMsg: {},
      loading: false,
      finished: false,
      commentList: [],
      show: false,
      message: '',
      isLike: false
    }
  },
  created () {
    this.getMore()
    this.getComments()
  },
  methods: {
    // 获取文章详情
    async getMore () {
      try {
        const {
          data: { data }
        } = await getMore(this.$route.params.artId)
        console.log(data)
        this.moreMsg = data
        this.moreMsg.pubdate = dayjs(this.moreMsg.pubdate).fromNow()
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
    },
    // 获取评论
    async getComments () {
      try {
        const {
          data: { data }
        } = await getComments('a', this.$route.params.artId)
        // console.log(data)
        this.commentList = data.results
        this.commentList = this.commentList.map((ele) => {
          ele.pubdate = dayjs(ele.pubdate).fromNow()
          return ele
        })
        console.log(this.commentList)
      } catch (error) {
        console.log(error)
      }
    },
    // 评论列表触底加载
    onLoad () {
      if (!this.commentList[0]) {
        this.finished = true
      }
    },
    // 评论回复
    async callBack () {
      try {
        const {
          data: { data }
        } = await getComments('c', this.$route.params.artId)
        console.log(data)
      } catch (error) {
        this.$toast('回复失败')
      }
    },
    // 关注用户
    async toFollowing (id) {
      try {
        const res = await toFollowing(id)
        console.log(res)
        this.moreMsg.is_followed = true
        this.$toast.success('关注成功')
      } catch (error) {
        this.$toast('关注用户失败')
      }
    },
    // 取消关注
    async notFollowing (id) {
      try {
        const res = await notFollowing(id)
        console.log(res)
        this.moreMsg.is_followed = false
        this.$toast.success('取消关注成功')
      } catch (error) {
        this.$toast('取消关注失败')
      }
    },
    // 收藏文章
    async getCollections () {
      try {
        await getCollections(this.moreMsg.art_id)
        this.moreMsg.is_collected = true
        this.$toast.success('收藏成功')
      } catch (error) {
        this.$toast.fail('收藏失败')
      }
    },
    // 取消收藏文章
    async delCollections () {
      try {
        await delCollections(this.moreMsg.art_id)
        this.moreMsg.is_collected = false
        this.$toast.success('取消收藏')
      } catch (error) {
        this.$toast.fail('取消收藏失败')
      }
    },
    // 点赞
    async getLike () {
      try {
        await getLike(this.moreMsg.art_id)
        this.isLike = true
      } catch (error) {
        this.$toast.fail('点赞失败')
      }
    },
    // 取消点赞
    async dontLike () {
      try {
        await dontLike(this.moreMsg.art_id)
        this.isLike = false
      } catch (error) {
        this.$toast.fail('取消点赞失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.header {
  background-color: #5094f3;

  /deep/.van-nav-bar__title {
    color: #fff;
  }

  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
}

.article-title {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}

.userInfo {
  /deep/.van-cell__title {
    display: flex;
    align-items: center;
  }
  /deep/.user {
    margin-left: 10px;
    font-size: 12px;
    .name {
      color: #3a3a3a;
    }
    .time {
      color: #b7b7b7;
    }
  }
  .add-btn {
    width: 170px;
    height: 60px;
  }
}
.end {
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #969799;
  margin: 100px 0 50px;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '正文结束';
    color: #969799;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    width: 120px;
  }
}

.commentList {
  padding-bottom: 100px;
}
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

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  z-index: 111;
  .van-icon {
    color: #ccc;
  }
  .write-btn {
    width: 280px;
    height: 46px;
    color: #ccc;
  }
}

.writeComment {
  display: flex;
 padding: 32px 0 32px 32px;
 align-items: center;
  .write-field {
    width: 600px;
    height: 176px;
    padding: 10px 16px;
    background-color: #f5f7f8;
  }
  .put-btn {
    border: 0;
  }
}
</style>
