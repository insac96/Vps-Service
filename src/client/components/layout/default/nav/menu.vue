<template>
  <UiFlex type="col" class="space-y-4" v-if="menus">
    <div v-for="(menu, index) in menus" :key="index">
      <UiText :text="menu.name" size="sm" color="gray" class="my-3 px-1" />
      <UButton v-for="(item, i) in menu.child" :key="i" :icon="item.icon" :label="item.label" @click="item.click"
        class="w-full" variant="ghost" color="gray" :ui="{
          icon: { base: 'mr-2' }
        }"></UButton>
    </div>
  </UiFlex>
</template>

<script setup>
const menus = ref(undefined)

const list = [{
  child: [{
    label: 'Trang chủ',
    icon: 'i-mdi-home',
    click: () => navigateTo('/')
  },{
    label: 'Cửa hàng',
    icon: 'material-symbols:shopping-bag-outline',
    click: () => navigateTo('/shop')
  },{
    label: 'Dịch vụ',
    icon: 'ic:twotone-miscellaneous-services',
    click: () => navigateTo('/service')
  },{
    label: 'Đơn hàng',
    icon: 'material-symbols:shopping-cart',
    click: () => navigateTo('/order')
  },
  {
    label: 'Quản lý tài khoản',
    icon: 'i-bxs-user',
    click: () => navigateTo('/account')
  }]
}]
menus.value = list

</script>
