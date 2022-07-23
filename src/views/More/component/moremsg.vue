<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-21 18:02:14
 * @LastEditors: sj
 * @LastEditTime: 2022-07-23 09:21:09
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

    <div class="main">
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
          <van-button
            @click="notFollowing(moreMsg.aut_id)"
            round
            type="info"
            class="add-btn"
            v-if="moreMsg.is_followed"
            >已关注</van-button
          >
          <van-button
            @click="toFollowing(moreMsg.aut_id)"
            round
            type="info"
            class="add-btn"
            v-else
            >+ 关注</van-button
          >
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
        <oneComments
          v-for="(item, index) in commentList"
          :key="index"
          :thisComment="item"
          @isShowCommt="callBack(item)"
          @changeGoodJob="onChangeGoodJob(item)"
        ></oneComments>
      </van-list>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <van-button round type="default" class="write-btn" @click="writeBtn"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="allComm" />
      <van-icon
        name="star"
        v-if="moreMsg.is_collected"
        @click="delCollections"
      />
      <van-icon name="star-o" v-else @click="getCollections" />

        <van-icon
      class="rotate"
        name="good-job-o"
         v-if="moreMsg.attitude===0"
        @click="delDisLike"
      />

      <van-icon
        name="good-job"
        v-else-if="moreMsg.attitude===1"
        @click="dontLike"
      />

         <van-icon
        name="good-job-o"
        v-else
        @click="getLike"
      />
      <van-icon name="share" />
    </div>

    <!-- 写评论弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '13%' }"
      class="writeComment"
    >
      <van-field
        class="write-field"
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
         @keyup.enter="pullWrite()"
      />
      <van-button
        plain
        type="info"
        class="put-btn"
        @click="pullWrite"
        :disabled="isDisabled"
        >发布</van-button
      >
    </van-popup>

    <!-- 回复弹出层 -->
    <van-popup
      v-model="showComment"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar :title="commTitle" left-arrow @click-left="showComment = false" />

      <oneComments
        :thisComment="thisComment"
        @isShowCommt="showComment = true"
        @changeGoodJob="onChangeGoodJob(thisComment)"
      ></oneComments>

      <!-- 全部回复 -->
      <van-cell title="全部回复" />

      <!-- 评论列表 -->
      <van-list
        class="commentList"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <oneComments
          v-for="(item, index) in thisCommentList"
          :key="index"
          :thisComment="item"
          @changeGoodJob="onChangeGoodJob(item)"
        ></oneComments>
      </van-list>

      <!-- 评论 -->
      <div class="post-warp">
        <van-button type="default" class="postBtn" plain round @click="postBtn"
          >评论</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import dayjs from '@/utils/dayjs'
import oneComments from './oneComments.vue'
import {
  getMore,
  getComments,
  toFollowing,
  notFollowing,
  getCollections,
  delCollections,
  getLike,
  dontLike,
  pullComments,
  disLikeArt,
  delDisLikeArt
} from '@/api'

export default {
  data () {
    return {
      moreMsg: {}, // 文章
      loading: false,
      finished: false,
      commentList: [], // 文章评论列表
      show: false,
      message: '',
      isDisabled: true,
      showComment: false,
      thisComment: {}, // 当前这条评论
      choosePull: 1, // 评论  1 ：文章写评论  2 ： 评论写回复
      thisCommentList: [], // 评论的评论列表
      end_id: '',
      last_id: '',
      allComm: '', // 总评论数
      imgList: []
    }
  },
  created () {
    this.getMore()
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

        // 图片预览
        this.$nextTick(() => {
          this.imgList = document.querySelector('.content').querySelectorAll('img')
          const imgSrc = []
          this.imgList?.forEach((ele, index) => {
            imgSrc.push(ele.src)
            ele.onclick = () => {
              console.log(111)
              ImagePreview({ images: imgSrc, startPosition: index, closeable: true })
            }
          })
        })
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
    },
    // 评论列表触底加载   // 获取文章评论
    async onLoad () {
      try {
        const {
          data: { data }
        } = await getComments('a', this.$route.params.artId, this.last_id)
        this.commentList.push(...data.results)
        this.last_id = data.last_id
        this.end_id = data.end_id
        // console.log(data)
        this.allComm = data.total_count
        if (this.last_id === this.end_id) {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取评论列表失败')
      }
      this.loading = false
    },
    // 点击评论回复
    async callBack (item) {
      this.showComment = true
      this.thisComment = item

      // 获取评论的评论
      try {
        const {
          data: { data }
        } = await getComments('c', item.com_id)
        console.log(data)
        this.thisCommentList = data.results
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
        this.moreMsg.attitude = 1
        this.$toast('喜欢')
      } catch (error) {
        this.$toast.fail('点赞失败')
      }
    },
    // 取消点赞 并不喜欢文章
    async dontLike () {
      try {
        await dontLike(this.moreMsg.art_id)
        await disLikeArt(this.moreMsg.art_id)
        this.moreMsg.attitude = 0
        this.$toast('不喜欢')
      } catch (error) {
        this.$toast.fail('取消点赞失败')
      }
    },
    // 无态度
    async delDisLike () {
      try {
        // 取消对文章不喜欢
        await delDisLikeArt(this.moreMsg.art_id)
        this.moreMsg.attitude = -1
        this.$toast('无感')
      } catch (error) {

      }
    },

    async pullWrite () {
      try {
        // 对文章评论
        if (this.choosePull === 1) {
          console.log(1111)
          const res = await pullComments(this.moreMsg.art_id, this.message)
          console.log(res.data.data)
          this.commentList.unshift(res.data.data.new_obj)
        }
        if (this.choosePull === 2) {
          // 对评论评论
          // console.log(this.thisComment)
          console.log(2222)
          const res1 = await pullComments(
            this.thisComment.com_id,
            this.message,
            this.moreMsg.art_id
          )
          console.log(res1)

          this.thisCommentList.unshift(res1.data.data.new_obj)
          this.thisComment.reply_count++
        }

        this.show = false
        this.message = ''
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail('评论失败')
      }
    },
    // 点击文章详情底部 写评论
    writeBtn () {
      this.show = true
      this.choosePull = 1
    },
    // 点击 评论里的 评论
    postBtn () {
      this.show = true
      this.choosePull = 2
    },
    onChangeGoodJob (val) {
      if (val.is_liking) {
        val.is_liking = false
        if (val.like_count) {
          val.like_count--
        } else {
          val.like_count = 0
        }
        // ********
        // val.like_count = val.like_count ? val.like_count-- : 0
      } else {
        val.is_liking = true
        val.like_count++
      }
    }
  },
  watch: {
    message (val) {
      if (val.length === 0) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    }
  },
  components: {
    oneComments
  },
  computed: {
    commTitle () {
      if (this.thisCommentList[0]) {
        return `${this.thisCommentList.length}条回复`
      } else {
        return '暂无回复'
      }
    }
  }
}
</script>

<style scoped lang="less">

.rotate {
  transform: rotate(180deg);
  transition: all 1s;
}
.header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 111;
  background-color: #5094f3;

  /deep/.van-nav-bar__title {
    color: #fff;
  }

  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
}

.main {
  padding: 100px 0 100px;
}
.content {
  padding: 0.73333rem 0.42667rem;
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

.post-warp {
  width: 100%;
  height: 98px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: hotpink;
  text-align: center;
  .postBtn {
    width: 80%;
    height: 80%;
  }
}
</style>
