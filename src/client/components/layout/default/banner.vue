
<template>
  <USkeleton class="relative h-[360px] mb-3 rounded-2xl " v-if="loading"/>
  <div v-if="banner" class="
    ServiceHomeBanner 
    relative 
    overflow-hidden
    rounded-2xl 
    shadow-2xl dark:shadow-none
  ">
    <!-- Image -->
    <UiImg 
      :src="banner?.config?.image?.og || '/images/null.webp'"
      class="
        !absolute
        w-full h-full
        top-0 left-0
      "
      ratio="16 / 9"
    />
    <!-- Overlay -->
    <div class="
      absolute 
      w-full h-full 
      top-0 left-0
      bg-black/50
      dark:bg-black/60
    "></div>
    <!-- Content -->
    <UiFlex 
      type="col" 
      items="start" 
      justify="center"
      class="
        relative
        w-full h-full 
        md:p-20 p-4
        aspect-auto
      "
    >
      <!-- Name -->
      <UiText 
        weight="bold" 
        color="primary" 
        class="xl:text-5xl md:text-4xl text-2xl mb-2"
      >
        {{ banner.config.name || 'ENI VPS SERVICE' }}
      </UiText>

      <!-- Description -->
      <UiText 
        weight="semibold" 
        class="xl:text-2xl md:text-xl text-base text-gray-300 md:max-w-xl"
      >
        {{ banner.config.description || 'Kênh bán VPS giá rẻ và chất lượng tốt nhất' }}
      </UiText>
      
      <!-- Statical -->
      <UiFlex class="mt-6 gap-8 text-gray-300" wrap>
        <div>
          <UiText size="sm">Sản phẩm</UiText>
          <UiText size="xl" weight="bold">{{ banner.product }}</UiText>
        </div>

        <div>
          <UiText size="sm">Thành viên</UiText>
          <UiText size="xl" weight="bold">{{ banner.user }}</UiText>
        </div>

        <div>
          <UiText size="sm">Đơn hàng</UiText>
          <UiText size="xl" weight="bold">{{ banner.order }}</UiText>
        </div>
      </UiFlex>
      <!-- About -->
      <UButton class="mt-6" @click="router.push('/shop')" size="md">Xem Thêm</UButton>
    </UiFlex>
  </div>
</template>

<script setup>
const banner = ref(undefined)
const loading = ref(true)
const router = useRouter()
const getBanner = async () => {
  try {
    const data = await useAPI('client/config/banner')
    loading.value = false
    banner.value = data
  }
  catch (e){
    loading.value = false
  }
}

getBanner()
</script>

<style lang="sass">
.dark
  .ServiceHomeBanner
    -webkit-mask: linear-gradient(0deg, transparent, #fff 40%)
    mask: linear-gradient(0deg, transparent, #fff 40%)
</style> 