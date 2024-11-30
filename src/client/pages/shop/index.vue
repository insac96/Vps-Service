<template>
  <UiContent title="Shop" sub="Danh sách sản phẩm">
    <ServiceProductList/>
  </UiContent>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
</script>
