<template>
  <UBreadcrumb class="mb-5 mt-2" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Đơn hàng' }]" />
  <ServiceOrderHistory />
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

</script>
