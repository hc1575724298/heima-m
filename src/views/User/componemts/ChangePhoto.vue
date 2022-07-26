<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-23 16:25:43
 * @LastEditors: sj
 * @LastEditTime: 2022-07-25 21:19:56
-->
<template>
 <div class="photo">
   <img :src="img" class="img" ref="img">

   <div class="toolbar">
    <div class="cancel" @click="$emit('close')">取消</div>
    <div class="confirm" @click="confirm">完成</div>
   </div>
 </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editPhoto } from '@/api'
export default {
  name: 'ChangePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    console.log(this.cropper)
  },
  methods: {
    // 点击完成
    confirm () {
      // 服务端裁切， 使用 getDate 方法， 将拿到的数据传给服务端
      // console.log(this.cropper.getData())

      // 客户端裁切  使用getCroppedCanvas
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })

      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const res = await editPhoto(formData)
        console.log(res)

        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', res.data.data.photo)
        this.$toast.success('头像更新成功')
      } catch (error) {
        this.$toast.fail('头像更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

.photo {
  background-color: #000;
  height: 100%;
   .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
     .cancel, .confirm {
        width: 90px;
        height: 90px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
     }

   }
 .img {
  display: block;
  max-width: 100%;
 }
}

</style>
