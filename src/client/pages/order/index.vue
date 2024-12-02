<template>
  <div>
    <UBreadcrumb class="mb-5" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Đơn hàng' }]" />
    <ServiceOrderHistory/>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: () => "Đơn hàng - ENI",
  ogTitle: () => "Đơn hàng - ENI"
})
 const authStore = useAuthStore()
</script>
