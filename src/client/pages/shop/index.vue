<template>
  <div>
    <UBreadcrumb class="mb-3 mt-2" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Cửa hàng' }]" />
    <ServiceProductList />
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: () => "Cửa hàng - ENI",
  ogTitle: () => "Cửa hàng - ENI",
})
</script>
