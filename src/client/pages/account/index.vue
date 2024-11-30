<template>
  <UiContent title="Account" sub="Thông tin tài khoản">
    <UiEmpty v-if="!authStore.isLogin" title='Bạn chưa đăng nhập' />
    <div v-else class="xl:col-span-10 col-span-2">
      <UTabs v-model="tab" :items="items" class="max-w-[500px]" />
      <ServiceUserEdit v-if="tab == 0" />
      <AuthSignForgot v-if="tab == 1" />
      <ServiceUserTax v-if="tab == 2" />
    </div>
  </UiContent>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
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