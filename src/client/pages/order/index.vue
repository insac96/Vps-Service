<template>
  <div>
    <UBreadcrumb class="mb-5" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Đơn hàng' }]" />
    <ServiceOrderHistory/>
  </div>
</template>

<script lang="ts" setup>
 const authStore = useAuthStore()
</script>
