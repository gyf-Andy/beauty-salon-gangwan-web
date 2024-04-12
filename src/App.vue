<template>
  <a-config-provider :locale="locale">
    <template #renderEmpty>
      <EmptyState type="regord" title="暂无数据" />
    </template>
    <router-view></router-view>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
import EmptyState from '@/components/EmptyState.vue'
// import Menu from "@/views/Menu";
// import Welcome from "@/views/Welcome";


export default {
  name: 'App',
  components: {
    [ConfigProvider.name]: ConfigProvider,
    EmptyState,
  },
  setup() {
    const locale = zhCN
    return { locale }
  }
}
</script>
<style lang="less">
.setShadow{
  box-shadow:0px 0px 2px rgba(19,133,106,0.20);
}

</style>
