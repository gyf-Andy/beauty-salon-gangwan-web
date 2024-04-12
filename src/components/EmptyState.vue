<template>
  <div class="empty-state-content" :type="type" :title="title">
    <img :src="imgMessage.src" :title="imgMessage.title" class="empty-img" />
    <span class="empty-state-span" v-show="isOpen">{{ $props.title }}</span>
    <slot name="title" v-if="$props.title == '' ? true : false">{{ imgMessage.title }}</slot>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'EmptyState',
  props: {
    title: { type: [Number, String], default: '' },
    type: { type: [String], default: () => 'content' }
  },
  setup(props) {
    const state = reactive({
      imgList: [
        {
          id: 0,
          type: 'content',
          title: '空内容',
          alt: '空内容',
          src: require(`@/assets/images/empty-state/img_404_no_content@2x.png`)
        },
        {
          id: 1,
          type: 'search',
          title: '搜索无内容',
          alt: '搜索无内容',
          src: require(`@/assets/images/empty-state/img_404_no_search_record@2x.png`)
        },
        {
          id: 2,
          type: 'shopping',
          title: '购物车无内容',
          alt: '购物车无内容',
          src: require(`@/assets/images/empty-state/img_404_shopping_cart_empty@2x.png`)
        },
        {
          id: 3,
          type: 'message',
          title: '无消息',
          alt: '无消息',
          src: require(`@/assets/images/empty-state/img_404_no_message@2x.png`)
        },
        {
          id: 4,
          type: 'comment',
          title: '无评论',
          alt: '无评论',
          src: require(`@/assets/images/empty-state/img_404_no_comment@2x.png`)
        },
        {
          id: 5,
          type: 'wifi',
          title: '网络/无信号/系统故障',
          alt: '网络/无信号/系统故障',
          src: require(`@/assets/images/empty-state/img_404_no_wifi@2x.png`)
        },
        {
          id: 6,
          type: 'adress',
          title: '定位/联系地址',
          alt: '定位/联系地址',
          src: require(`@/assets/images/empty-state/img_404_no_adress@2x.png`)
        },
        {
          id: 7,
          type: 'regord',
          title: '无订单记录/主要用于表单类',
          alt: '无订单记录/主要用于表单类',
          src: require(`@/assets/images/empty-state/img_404_no_regord@2x.png`)
        }
      ],
      imgMessage: {},
      isOpen: false
    })
    state.isOpen = props.title == '' ? false : true
    state.imgList.map(item => {
      if (item.type == props.type) {
        state.imgMessage = item
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="less">
.empty-state-content {
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #666666;
  .empty-img {
    height: 80px;
    width: 80px;
    display: block;
    margin: 0 auto 0px;
  }
  .empty-state-span {
    display: block;
    margin-top: 10px;
  }
}
</style>
