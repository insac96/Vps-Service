<template>
  <UiContent title="Order" sub="Danh sách đơn hàng">
    <ServiceOrderHistory/>
  </UiContent>
</template>

<script lang="ts" setup>
 const authStore = useAuthStore()
 definePageMeta({
  middleware: 'auth'
})
</script>
