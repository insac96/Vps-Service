<template>
  <div>
    <UBreadcrumb class="mb-3" divider="/" :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Giỏ hàng' }]" />
    <div v-if="!!cartStore.cart && cartStore.cart.length > 0" class="mt-3">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div class="col-span-12 md:col-span-8 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <UiText text="Xác nhận đơn hàng" weight="semibold" size="base" class="mb-3" />
          <UiFlex v-for="item in cartStore.cart"
            class="gap-2 mt-5 mb-2 border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex-col md:flex-row  md:items-center"
            justify="between">
            <div class="md:w-1/2">
              <UiText size="sm" color="gray" weight="">{{ item.product.name || "..." }}</UiText>
              <UiText size="sm" weight="semibold" class="mt-2">{{ item.product?.category.name || "..." }}</UiText>
              <UiFlex class="mt-2">
                <UiText size="sm" weight="semibold">Chu kì thanh toán : </UiText>
                <UiFlex>
                  <UiText size="sm" class="ml-2"> {{ item.option.number || "..." }} Tháng /</UiText>
                  <UiText color="red" size="sm" class="ml-1">{{ useMoney().toMoney(item.option.price) || "..." }}</UiText>
                </UiFlex>
              </UiFlex>
            </div>
            <div class="md:w-1/2 md:mt-0 mt-4 items-center">
              <UiFlex>
                <UTooltip class="mr-2 ml-auto w-max" text="Sửa cấu hình" :popper="{ placement: 'top' }">
                  <UButton color="gray" size="sm">Sửa cấu hình</UButton>
                </UTooltip>
                <UTooltip text="Xóa sản phẩm" :popper="{ placement: 'top' }" @click="cartStore.delCart(item._id)">
                  <UButton color="red" icon="material-symbols:delete" size="sm"></UButton>
                </UTooltip>
              </UiFlex>
              <UiFlex color="primary" class="mt-2 " size="sm">
                <UButton size="sm" weight="semibold" class="ml-auto w-max" icon="material-symbols:check-indeterminate-small" @click="updateCart(item._id, item.quantity - 1)"></UButton>
                <UiText size="sm" weight="semibold" class="ml-2">{{item.quantity}}</UiText>
                <UButton size="sm" weight="semibold" class="ml-2" icon="material-symbols:add" @click="updateCart(item._id, item.quantity + 1)"></UButton>
              </UiFlex>
            </div>
          </UiFlex>
          <NuxtLink href="/" class="btn btn-primary w-full mt-3 text-end block hover:underline text-primary" size="md">Chọn thêm dịch vụ khác</NuxtLink>
        </div>
        <div class="col-span-12 md:col-span-4 border border-gray-200 dark:border-gray-800 rounded-lg p-4 ">
          <UiText text="Thống kê đơn hàng" weight="semibold" size="base"
            class="pb-3 border-b border-gray-200 dark:border-gray-800" />
          <div class="mt-3">
            <UiFlex v-for="item in cartStore.cart" justify="between"
              class="py-2 border-b border-gray-200 dark:border-gray-800">
              <UiText size="sm" >{{ item.product.name }} : </UiText>
              <UiText size="sm" align="right">{{ useMoney().toMoney(item.option.price * item.quantity) || "..." }} đ
              </UiText>
            </UiFlex>
          </div>
          <UiFlex justify="between" class="my-4">
            <UiText size="sm" weight="semibold" color="red">Tổng cộng :</UiText>
            <UiText size="sm" weight="semibold" color="red" align="right">{{ useMoney().toMoney(totalPrice) || "..." }}đ</UiText>
          </UiFlex>
          <UButton type="button" class="btn btn-primary w-full h-[40px] justify-center align-center mt-3">Thanh toán
          </UButton>
          <NuxtLink href="/" class="btn btn-primary w-full justify-center text-primary align-center mt-2 text-center block" size="md">Quay lại</NuxtLink>
        </div>
      </div>
    </div>
    <div v-else>
      <UiEmpty class="mt-20" title="Giỏ hàng rỗng" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();

const totalPrice = computed(() => {
  return cartStore?.cart?.reduce((total: number, item: any) => {
    return total + item.option.price * item.quantity;
  }, 0);
});

const updateCart = (id: string, quantity: number) => {
  if(quantity < 1) return
  const data = JSON.stringify({ _id: id, quantity: quantity })
  cartStore.updateCart(data);
};

</script>