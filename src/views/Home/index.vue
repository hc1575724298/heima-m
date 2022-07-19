<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-15 16:47:07
 * @LastEditors: sj
 * @LastEditTime: 2022-07-19 14:47:28
-->
<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
        @click="$router.push('/search')"
        round><van-icon name="search" />搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 选项卡 -->
    <van-tabs v-model="active" swipeable>
  <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
    <ArticleList :id="item.id"></ArticleList>
    </van-tab>

  <!-- 更多按钮 -->
  <span class="toutiao toutiao-gengduo" @click="$refs.popup.isShow=true"></span>
</van-tabs>

<!-- 弹出层 -->
    <EditChannelPopup
     ref="popup"
     @changeChannel="changeChannel"
    :myChannels="myChannels"
    @clickChannel="delMyChannel"
    @addMyChannel='addMyChannel'
    ></EditChannelPopup>
  </div>
</template>

<script>
import { getMyChannelsByLocal, setMyChannelToLocal, delMyChannel, addMyChannel } from '@/api/channel'
import { getMyChannels } from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  created () {
    this.getMyChannels()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 获取我的频道列表
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          // 离线状态
          // 1. 本地存储有数据， 直接用本地存储数据
          // 2. 本地没有数据，  发送请求获取默认频道数据
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            // 无token
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          // 登陆状态
          // 发送请求获取
          // 有 token
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (e) {
        this.$toast.fail('获取频道列表失败')
      }
    },
    // 删除我的频道
    async delMyChannel (id) {
      this.myChannels = this.myChannels.filter(ele => ele.id !== id)

      if (!this.isLogin) {
        // 离线状态   ----> 数据存储在本地存储中
        setMyChannelToLocal(this.myChannels)
      } else {
        // 登陆状态  ---> 后台返回数据是用户的， 保存在服务器中
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    changeChannel (index) {
      this.active = index
    },
    // 添加频道
    async addMyChannel (channel) {
      this.myChannels.push(channel)

      if (!this.isLogin) {
        // 离线状态   ----> 数据存储在本地存储中
        setMyChannelToLocal(this.myChannels)
      } else {
        // 登陆状态  ---> 后台返回数据是用户的， 保存在服务器中
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  z-index: 99;
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
