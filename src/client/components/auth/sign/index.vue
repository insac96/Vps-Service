<template>
  <UiFlex>
    <UiFlex @click="router.push('/cart')" class="mr-2 cursor-pointer">
      <UChip size="xl" :text="cartStore.cart?.length || '0'">
        <UButton icon="material-symbols:shopping-cart" color="gray" />
      </UChip>
    </UiFlex>
    <UDropdown :items="menu" :ui="{
      item: {
        disabled: 'cursor-text select-text'
      }
    }" :popper="{
        placement: 'bottom-end'
      }">
      <UAvatar icon="i-bx-user" />
      <template #item="{ item }">
        <UiText class="truncate">{{ item.label }}</UiText>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </template>
    </UDropdown>
    <UModal v-model="modal.order" :ui="{ width: 'lg:max-w-4xl md:max-w-2xl sm:max-w-xl' }">
      <ServiceOrderHistory />
    </UModal>
  </UiFlex>
</template>

<script setup>
const authStore = useAuthStore()
const router = useRouter()
const cartStore = useCartStore();

watchEffect(async() => {
  if (!!authStore.isLogin) {
    await cartStore.getCart()
  }
})

const modal = ref({
  order: false
})

const menu = computed(() => {
  const list = []

  if (authStore.profile.type > 0) {
    list.push([{
      label: 'Quản trị viên',
      icon: 'i-eos-icons-admin',
      disabled: authStore.profile?.type < 1 ? true : false,
      click: () => navigateTo('/admin/statistic')
    }])
  }
  list.push([{
    label: 'Tài khoản',
    icon: 'i-bx-user',
    click: () => navigateTo('/account')
  }])

  list.push([{
    label: 'Dịch vụ',
    icon: 'material-symbols:home-repair-service',
    click: () => navigateTo('/service')
  }])

  list.push([{
    label: 'Đơn hàng',
    icon: 'i-bx-history',
    click: () => navigateTo('/order')
  }, {
    label: 'Đăng xuất',
    icon: 'i-bx-log-in',
    click: () => authStore.delAuth()
  }])

  return list
})
</script>