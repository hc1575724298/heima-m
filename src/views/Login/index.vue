<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 14:33:31
 * @LastEditors: sj
 * @LastEditTime: 2022-07-15 16:12:46
-->
<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="登陆"
      left-arrow
      @click-left="backToPrepage"
      class="navbar"
    >
      <template #left="">
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
        <!-- <span slot="left-icon" class="toutiao toutiao-shouji"></span> -->
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down :time="3 * 1000" v-if="isShowCountDown" @finish="isShowCountDown=false"/>
          <van-button size="mini" round class="code-btn" v-else @click="sendMsg">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

  {{ $store.state.number }}
<button @click="$store.commit('setNumber')">+1</button>
  </div>
</template>

<script>
import { login, senCode } from '@/api/user'
import { mobileRules, codeRules } from '@/views/Login/rules'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCountDown: false
    }
  },
  methods: {
    // 返回来之前的页面
    backToPrepage () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        // 存储token
        this.$store.commit('getUser', res.data.data)
        // 点击跳转
        this.$router.push('/profile')

        this.$toast.success('登陆成功')
      } catch (e) {
        const status = e.response.status
        let message = ('登陆错误，请刷新')
        if (status === 400) message = e.response.data.message
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break

        //   case 507:
        //     this.$toast.fail('登陆错误，请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登陆错误，请刷新')
        //     break
        // }
      }
    },
    async sendMsg () {
      try {
      // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求，获取验证码
        await senCode(this.mobile)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (e) {
        // 1.表单校验失败
        if (!e.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          // 2.请求失败
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}

.form {
  .van-field__left-icon {
    margin-right: 10px;
    .toutiao {
      font-size: 37px;
    }
  }
  .code-btn {
    background-color: #eee;
    border: unset;
    color: #666;
    padding: 0 10px;
  }
}
</style>
