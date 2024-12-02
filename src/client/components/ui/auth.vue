<template>
    <UiFlex type="col border border-dashed border-red-500 rounded-lg p-4 max-w-3xl mt-32 mx-auto">
      <UiIcon size="16" color="red" name="bxs:error"></UiIcon>
      <UiText size="sm" color="red">{{ title || 'Không có dữ liệu' }}</UiText>
    </UiFlex>
  </template>
  
  <script setup>
  const props = defineProps(['title'])
  </script>