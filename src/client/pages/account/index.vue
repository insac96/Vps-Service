<template>
  <div>
    <UBreadcrumb class="mb-3 mt-2" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Tài khoản' }]" />
    <UiEmpty v-if="!authStore.isLogin" title='Bạn chưa đăng nhập' />
    <div v-else class="xl:col-span-10 col-span-2">
      <UTabs v-model="tab" :items="items" class="max-w-[500px]" />
      <ServiceUserEdit v-if="tab == 0" />
      <AuthSignForgot v-if="tab == 1" />
      <ServiceUserTax v-if="tab == 2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const tab = ref(0)
const items = [{
  label: 'Hồ sơ cá nhân'
}, {
  label: 'Bảo mật',
}, {
  label: 'Thông tin thuế'
}]
</script>

<style></style>