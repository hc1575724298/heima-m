<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 14:33:31
 * @LastEditors: sj
 * @LastEditTime: 2022-07-13 17:26:06
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
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
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
        :rules="[{ required: true, message: '请填验证码' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button size="mini" round class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 返回来之前的页面
    backToPrepage () {
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
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
