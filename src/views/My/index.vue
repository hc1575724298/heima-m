<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-15 16:48:15
 * @LastEditors: sj
 * @LastEditTime: 2022-07-23 09:46:45
-->
<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 已登陆 -->
      <div class="user-info banner" v-if="isLogin">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{userInfo.name}}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" align="center" justify="end" class="code-row">
              <van-button size="mini" round class="code-btn" @click="$router.push('/user')"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{userInfo.art_count}}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{userInfo.fans_count}}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{userInfo.follow_count}}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{userInfo.like_count}}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录 -->
      <div class="login-register banner" v-else>
        <div class="wrap" @click="$router.push('/login')">
          <img src="../../assets/images/mobile.png" alt="">
          <span>注册 / 登陆</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <!-- 收藏/历史 -->
      <van-grid :column-num="2" class="grid" :clickable="true">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <!-- 消息通知/小智 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 退出按钮 -->
    <van-button class="login-btn" v-if="isLogin" block @click="logout">退出登陆</van-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
        .then(() => {
          // on confirm
          this.$store.commit('getUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const { data: { data } } = await getUserInfo()
          // console.log(data)
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('请重新登陆')
        }
      }
    }
  }

}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  // calc()  减号两遍必须加空格
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }

  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
      margin: 10px 0;
  }
}

 .login-btn {
  :deep(.van-button__text){
    color: red;
  }
 }

 .login-register {
  display: flex;
  justify-content: center;
  align-items: center;
   .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 18px;
    img {
      margin-bottom: 10px;
      width: 150px;
      height: 150px;
    }
   }
 }
</style>
