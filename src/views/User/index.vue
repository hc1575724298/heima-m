<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-23 09:28:16
 * @LastEditors: sj
 * @LastEditTime: 2022-07-27 09:42:43
-->
<template>
  <div>
    <van-nav-bar
    class="header"
  title="个人信息"
  left-arrow
  @click-left="$router.back()"
/>

<!-- 上传头像 -->
<input type="file" hidden ref="file" >

<van-cell title="头像" is-link value="内容"  @click="$refs.file.click()">
  <template #default>
    <van-image
  round
  width="35px"
  height="35px"
  :src="profile.photo"
/>
  </template>
</van-cell>
<van-cell title="昵称" is-link :value="profile.name" @click="toChangName"/>
<van-cell title="性别" is-link :value="profile.gender ? '女' : '男'" @click="showGender=true"/>
<van-cell title="生日" is-link :value="profile.birthday" @click="toChangeBirthday"/>

<!-- 修改昵称弹出层 -->
<van-popup v-model="showName" position="bottom" :style="{ height: '100%' }" >
   <van-nav-bar
  title="更新昵称"
  left-text="取消"
  right-text="保存"
  @click-left="showName=false"
  @click-right="saveName"
/>
<van-field
  v-model="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="7"
  show-word-limit
/>
</van-popup>

<!-- 生日弹出层 -->
<van-popup v-model="showBirthday" position="bottom" :style="{ height: '50%' }" >
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="showBirthday=false"
  @confirm="saveBirthday"
/>
</van-popup>

<!-- 性别弹出层 -->
<van-popup v-model="showGender" position="bottom" :style="{ height: '50%' }" >
<van-picker
  title="更新性别"
  show-toolbar
  :default-index="profile.gender"
  :columns="columns"
  @confirm="saveGender"
  @cancel="showGender=false"
/>
</van-popup>

<!-- 头像弹出层 -->
<van-popup v-model="showPhoto" position="bottom" :style="{ height: '100%' }">
  <ChangePhoto
  v-if="showPhoto"
  :img ="img"
  @close="showPhoto=false"
  @update-photo="profile.photo=$event"></ChangePhoto>
</van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getProfile, editProfile } from '@/api'
import ChangePhoto from './componemts/ChangePhoto.vue'
export default {
  data () {
    return {
      profile: {},
      showName: false,
      message: '',
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      showBirthday: false,
      columns: ['男', '女'],
      showGender: false,
      img: '',
      showPhoto: false
    }
  },
  created () {
    this.getProfile()
  },
  mounted () {
    this.$refs.file.addEventListener('change', (e) => {
      // e.target  触发的元素
      const file = e.target.files[0]

      // 法一， URL.createObjectURL--->会存在内存泄露  转成blob 二进制格式
      // 1.1
      // const binaryData = []
      // binaryData.push(file)
      // this.img = window.URL.createObjectURL(new Blob(binaryData))

      // 1.2
      // this.img = window.URL.createObjectURL(file)

      // 法二   转成base64 格式  FileReader 文件阅读器
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => { // onload 异步操作
        // console.log(e)
        this.img = e.target.result
        this.showPhoto = true
      }

      // this.showPhoto = true

      // 如果选择同一个文件不会触发change事件
      // 解决：每次使用完毕， 把它的value 清空
      this.$refs.file.value = ''
    })
  },
  methods: {
    async getProfile () {
      try {
        const { data: { data } } = await getProfile()
        console.log(data)
        this.profile = data
      } catch (error) {
        console.log(error)
      }
    },
    // 修改资料函数
    async editProfile (data) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        await editProfile(data)
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    toChangName () {
      this.showName = true
      this.message = this.profile.name
    },
    saveName () {
      if (!this.message.length) { return this.$toast('昵称不能为空') }
      const data = { name: this.message }
      this.editProfile(data)
      this.profile.name = this.message
      this.showName = false
    },
    toChangeBirthday () {
      // console.log(this.profile.birthday)
      this.currentDate = new Date(this.profile.birthday)
      this.showBirthday = true
    },
    saveBirthday () {
      // console.log(this.currentDate)
      const time = dayjs(this.currentDate).format('YYYY-MM-DD')
      // console.log(time)
      this.editProfile({ birthday: time })
      this.profile.birthday = time
      this.showBirthday = false
    },
    saveGender (value, index) {
      console.log(value, index)
      this.editProfile({ gender: index })
      this.profile.gender = index
      this.showGender = false
    }
    // onChangePhoto () {
    //   // 获取文件对象
    //   const file = this.$refs.file.files[0]

    //   // console.log(this.$refs.file.files)
    //   // console.log(file)
    //   // 基于文件对象获取 blob 数据
    //   const binaryData = []
    //   binaryData.push(file)
    //   this.img = window.URL.createObjectURL(new Blob(binaryData))
    //   // this.img = window.URL.createObjectURL(file)
    //   console.log(this.img)

    //   this.showPhoto = true

    //   // 如果选择同一个文件不会触发change事件
    //   // 解决：每次使用完毕， 把它的value 清空
    //   this.$refs.file.value = ''
    // }
  },
  components: {
    ChangePhoto
  }
}
</script>

<style scoped lang="less">
 .header {
   background-color: #5093f3;
   /deep/.van-nav-bar__title
   {
     color: #fff;
   }
 /deep/.van-icon-arrow-left:before{
  color: #fff;
 }

 }

</style>
