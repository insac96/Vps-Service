<template>
  <div>
    <div v-if="!!product" class="mt-3">
      <UBreadcrumb class="mb-3" divider="/"
        :links="[{ label: 'Trang chủ', to: '/' }, { label: product.name }, { label: 'Đăng ký' }]" />
      <div class="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div class="col-span-12 md:col-span-8 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <UiText text="Sản phẩm đã chọn" weight="semibold" size="base" class="mb-3" />
          <UiFlex class="gap-2 mt-5 mb-2 border border-gray-200 dark:border-gray-800 rounded-lg p-4" justify="between">
            <div>
              <UiText size="sm" color="gray" weight="">{{ product?.category?.name || "..." }}</UiText>
              <UiText size="sm" weight="semibold" class="mt-2">{{ product?.name || "..." }}</UiText>
            </div>
            <UButton color="primary" size="sm" @click="router.push('/')">
              <UiText size="sm" weight="semibold">Thay đổi</UiText>
            </UButton>
          </UiFlex>
          <UiFlex v-for="(item, index) in product.specs" :key="index"
            class="gap-2 mb-2 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
            <UiText size="sm" weight="semibold">{{ item.key }} :</UiText>
            <UiText size="sm" color="gray">{{ item.value }}</UiText>
          </UiFlex>
          <UiText text="Chu kỳ thanh toán" weight="semibold" size="base" class="my-3" />
          <div class="grid-cols-12 grid gap-4">
            <div v-for="(option, index) in product.options" :key="index" @click="getOption(option, index)"
              :class="['grid col-span-6 md:col-span-2 h-20 flex flex-col justify-center items-center rounded-lg border relative cursor-pointer', index === state.option.index ? 'border-primary' : 'border-gray-200 dark:border-gray-600']">
              <div class="absolute top-2 right-2">
                <svg v-if="index === state.option.index" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="text-center">
                <UiText class="text-sm font-medium">{{ option.number }} Tháng </UiText>
                <UiText class="text-sm font-medium">{{ useMoney().toMoney(option?.price) }}</UiText>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-h-[370px]">
          <UiText text="Thống kê đơn hàng" weight="semibold" size="base"
            class="pb-3 border-b border-gray-200 dark:border-gray-800" />
          <div class="mt-3 border-b border-gray-200 dark:border-gray-800">
            <UiFlex justify="between" class="my-4">
              <UiText size="sm" weight="semibold">{{ product.name }}</UiText>
              <UiText size="sm" weight="semibold" align="right">{{ useMoney().toMoney(product.price) || "..." }} đ
              </UiText>
            </UiFlex>
            <UiFlex justify="between" class="my-4">
              <UiText size="sm">Dịch vụ khác :</UiText>
              <UiText size="sm" align="right">...</UiText>
            </UiFlex>
            <UiFlex justify="between" class="my-4">
              <UiText size="sm">Phí cài đặt :</UiText>
              <UiText size="sm" align="right">...</UiText>
            </UiFlex>
            <UiFlex justify="between" class="my-4">
              <UiText size="sm">{{ state.option?.number }} tháng :</UiText>
              <UiText size="sm" align="right">{{ useMoney().toMoney(state.option?.price) || "..." }} đ</UiText>
            </UiFlex>
          </div>
          <UiFlex justify="between" class="my-4">
            <UiText size="sm" weight="semibold" color="red">Tổng cộng :</UiText>
            <UiText size="sm" weight="semibold" color="red" align="right">{{ useMoney().toMoney(state.option?.price) || "..." }} đ</UiText>
          </UiFlex>
          <UButton type="button" class="btn btn-primary w-full h-[40px] justify-center align-center mt-3"
            icon="material-symbols:shopping-cart" :loading="loading" @click="addToCart">Thêm vào giỏ hàng</UButton>
          <NuxtLink href="/" class="btn btn-primary w-full justify-center align-center mt-2 text-center block" size="md">Quay lại</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const { setCart } = useCartStore();
const route = useRoute();
const loading = ref(false);
const product = ref<any>({});
const modal = ref(false);

// state
const state = ref<any>({
  key: route.params.key,
  option: undefined,
});
const getOption = (option: any, index: number) => {
  state.value.option = {
    index,
    price: option.price,
    number: option.number
  };
};

const get = async () => {
  try {
    loading.value = true;
    const data = await useAPI("client/product/get", { key: route.params.key });
    product.value = data;
    state.value.option = {
      index: 0,
      price: data.options[0].price,
      number: data.options[0].number
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
const addToCart = async () => {
  try {
    loading.value = true;
    setCart(JSON.parse(JSON.stringify(state.value)));
    loading.value = false;
    modal.value = false;
  } catch (e) {
    loading.value = false;
  }
};
get();
</script>

