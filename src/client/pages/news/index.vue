<template>
  <div>
    <UBreadcrumb class="mb-3 mt-2" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Tin tức' }]" />
    <ServiceNewsList />
  </div>
</template>

<script setup>
const configStore = useConfigStore()

</script>