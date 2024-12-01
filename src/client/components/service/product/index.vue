<template>
  <UiFlex class="gap-2 my-5">
    <UiIcon color="primary" name="icon-park-outline:ad-product" size="8" />
    <UiText text="Các gói VPS" weight="semibold" size="lg" />
  </UiFlex>
  <div class="grid grid-cols-1 lg:grid-cols-12  lg:gap-6 md:gap-4 gap-2" v-if="!!loading.category">
    <LoadingCategory v-for="i in 6" :key="i" class="xl:col-span-2 lg:col-span-4 col-span-6" />
  </div>
  <div v-else class="grid-cols-12 grid gap-4">
    <div v-for="option in category" :key="option.id" @click="page.category = option._id"
      :class="['grid col-span-6 md:col-span-2 h-28 flex flex-col justify-center items-center rounded-lg border relative cursor-pointer', option._id === page.category ? 'border-primary' : 'border-gray-200 dark:border-gray-600']">
      <div class="absolute top-2 right-2">
        <svg v-if="option._id === page.category" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div class="text-center">
        <UiImg :src="option.image" class="w-20 h-12 mx-auto mb-2" />
        <UiText class="text-sm font-medium">{{ option.name }}</UiText>
      </div>
    </div>
  </div>
  <div>
    <UiFlex class="gap-2 my-5">
      <UiIcon color="primary" name="icon-park-outline:ad-product" size="8" />
      <UiText :text="title" weight="semibold" size="lg" />
    </UiFlex>
    <div class="grid grid-cols-1 lg:grid-cols-12  lg:gap-6 md:gap-4 gap-2" v-if="!!loading.product || !list">
      <LoadingProductBox v-for="i in 8" :key="i" class="xl:col-span-3 lg:col-span-4 col-span-6" />
    </div>
    <div v-else>
      <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />
      <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6 md:gap-4 gap-2 md:mb-6 mb-4 " v-else>
        <ServiceProductBox v-for="product in list" :key="product._id" :product="product"
          class="xl:col-span-3 lg:col-span-4 col-span-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})

const list = ref(undefined)
const loading = ref({
  category: true,
  product: false
})
const category = ref([])
const page = ref({
  category: null,
  size: 8,
  current: 1,
  sort: {
    column: 'updatedAt',
    direction: 'desc'
  },
  search: {
    key: null,
    by: 'NAME'
  },
  total: 0
})

watch(() => page.value.category, () => getProduct())

const getCategory = async () => {
  try {
    loading.value.category = true;
    const data = await useAPI('client/category/get');
    category.value = data
    page.value.category = data[0]._id
    loading.value.category = false;
  } catch (e) {
    loading.value.category = false
  }
}
const getProduct = async () => {
  try {
    loading.value.product = true;
    const data = await useAPI('client/product/category', JSON.parse(JSON.stringify(page.value)));
    list.value = data.list;
    loading.value.product = false;
  } catch (e) {
    loading.value.product = false
  }
}
getCategory()
getProduct()
</script>