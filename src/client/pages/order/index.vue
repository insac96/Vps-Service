<template>
  <UiContent title="Order" sub="Danh sách đơn hàng">
    <UiEmpty v-if="!authStore.isLogin" title='Bạn chưa đăng nhập' />
    <ServiceOrderHistory v-else/>
  </UiContent>
</template>

<script lang="ts" setup>
 const authStore = useAuthStore()
</script>
