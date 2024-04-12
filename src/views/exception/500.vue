<template>
  <div class="result-layout">
    <EmptyState class="result-icon" type="wifi">
      <template #title>
        <h1>500</h1>
        <h3>抱歉,当前页面打开失败!</h3>
      </template>
    </EmptyState>
  </div>
</template>

<script>
import { Result } from 'ant-design-vue'
import EmptyState from '@/components/EmptyState.vue'

// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import { WELCOME_PATH } from '@/router'

export default {
  name: '404',
  components: {
    [Result.name]: Result,
    EmptyState
  }
  // setup() {
  //   const router = useRouter()
  //   const store = useStore()
  //   return {
  //     goback() {
  //       if (store.state.user.token) {
  //         router.push({ path: WELCOME_PATH })
  //       } else {
  //         store.dispatch('user/Logout')
  //         window.location.href = `${process.env.VUE_APP_PUBLIC_PATH}/login`
  //       }
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
@import url(../../assets/styles/heren-web-ui.less);
.result-layout {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.result-icon {
  margin-top: -140px;
  :deep(img) {
    width: 240px;
    height: 240px;
  }
}
h1 {
  margin-top: 20px;
}
h3 {
  color: @hr-subtitle;
}
</style>
