<template>
    <div>
      <UiFlex class="gap-2 my-5">
        <UiIcon color="primary" name="icon-park-outline:ad-product" size="8" />
        <UiText :text="title" weight="semibold" size="lg" />
        <UButton size="xs" color="gray" class="ml-auto" v-if="!!list && list.length < page.total">Xem Thêm</UButton>
      </UiFlex>
  
      <div class="grid grid-cols-12 lg:gap-6 md:gap-4 gap-2" v-if="!!loading || !list">
        <LoadingProductBox v-for="i in page.size" :key="i" class="xl:col-span-3 lg:col-span-4 col-span-6"/>
      </div>
      
      <div v-else>
        <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />
        <div class="grid grid-cols-12 lg:gap-6 md:gap-4 gap-2 md:mb-6 mb-4" v-else>
          <ServiceProductBox
            v-for="product in list" :key="product._id" :product="product"
            class="xl:col-span-3 lg:col-span-4 col-span-6"
          />
        </div>
  
        <UiFlex justify="center" v-if="list.length < page.total">
          <UPagination v-model="page.current" :page-count="page.size" :total="page.total" :max="5" show-last show-first />
        </UiFlex>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
  })
  
  const page = ref({
    size: 8,
    current: 1,
    sort: {
      column: 'updatedAt',
      direction: 'desc'
    },
    total: 0
  })
  
  const list = ref(undefined)
  const loading = ref(true)
  
  const get = async () => {
    try {
      loading.value = true;
      const data = await useAPI('client/product/popular', JSON.parse(JSON.stringify(page.value)));
      list.value = data.list;
      page.value.total = data.total;
      loading.value = false;
    }
    catch(e){
      loading.value = false
    }
  }
  onMounted(async () => {
    await nextTick()
    get()
  })
  </script>