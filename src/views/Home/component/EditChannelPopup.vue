<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-18 16:02:47
 * @LastEditors: sj
 * @LastEditTime: 2022-07-19 14:42:30
-->
<template>
  <van-popup
    v-model="isShow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '98%' }"
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <van-button size="small" round class="edit-btn" @click="isEdit = !isEdit">{{isEdit?'完成':'编辑'}}</van-button>
        </van-cell>

        <van-grid :border="false" gutter="10px">
          <van-grid-item
          @click="onClickMyChannel(item,index)"
          v-for="(item,index) in myChannels"
          :key="item.id"
          :text="item.name"
          :class="{ 'active-channel': item.name==='推荐'}"
          >
            <template #icon><van-icon name="cross" v-show="isEdit&&item.name!=='推荐'"/></template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>

        <van-grid gutter="10px">
          <van-grid-item
          @click="addMyChannel(item)"
          v-for="item in recommendChannels"
          :key="item.id"
          icon="plus"
          :text="item.name" />
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()

      this.allChannels = data.data.channels
      console.log(this.allChannels)
    },
    // 点击我的频道
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        // 删除
        return this.$emit('clickChannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('changeChannel', index)
      }
    },
    addMyChannel (channel) {
      this.$emit('addMyChannel', { ...channel })
    }
  },
  computed: {
    recommendChannels () {
      // 筛选出推荐频道
      return this.allChannels.filter(item => {
        return !this.myChannels.find(i => i.id === item.id)
        // const result = this.myChannels.find(i => i.id === item.id)
        // if (result) {
        //   return false
        // } else { return true }
      })
    }
  }
}
</script>

<style scoped lang="less">

.active-channel {
  /deep/.van-grid-item__text {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;

  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border-color: red;
  }

  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          width: 24px;
          font-size: 11px;
        }

      }
    }
  }

    // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;
      .van-grid-item__icon {
        font-size: 0.2rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
