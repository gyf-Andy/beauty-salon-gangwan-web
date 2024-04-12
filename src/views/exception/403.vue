<template>
  <div class="result-layout">
    <EmptyState class="result-icon" type="wifi">
      <template #title>
        <h1>403</h1>
        <h3>没有访问该页面的权限!</h3>
      </template>
    </EmptyState>
  </div>
</template>

<script>
import { Result } from 'ant-design-vue'
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: '404',
  components: {
    [Result.name]: Result,
    EmptyState
  }
}
</script>

<style lang="less" scoped>

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
