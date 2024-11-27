<template>
    <div>
      <UiFlex class="gap-2 my-5">
        <UiIcon color="primary" name="icon-park-outline:ad-product" size="8" />
        <UiText :text="title" weight="semibold" size="lg" />
      </UiFlex>
      <div class="grid grid-cols-12 lg:gap-6 md:gap-4 gap-2" v-if="!!loading || !list">
        <LoadingProductBox v-for="i in 8" :key="i" class="xl:col-span-3 lg:col-span-4 col-span-6"/>
      </div>
      <div v-else>
        <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />
        <div class="grid grid-cols-12 lg:gap-6 md:gap-4 gap-2 md:mb-6 mb-4" v-else>
          <ServiceProductBox
            v-for="product in list" :key="product._id" :product="product"
            class="xl:col-span-3 lg:col-span-4 col-span-6"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
  })
  
  const list = ref(undefined)
  const loading = ref(false)
  
  const get = async () => {
    try {
      loading.value = false;
      const data = await useAPI('client/product/popular');
      list.value = data.list;
      loading.value = false;
    }catch(e){
      loading.value = false
    }
  }
  onMounted(async () => {
    await nextTick()
    get()
  })
  </script>