<template>
  <UCard v-if="product" class="BoxProducts shadow-lg" :ui="{
    body: { padding: 'p-0 sm:p-0' },
    background: 'bg-gray-50 dark:bg-gray-800'
  }">
    <div @click="open(product.key)" class="cursor-pointer w-full">
      <UiImg 
        :src="product.og_image" 
        ratio="16 / 9"
        w="100%"
      />
    </div>

    <div class="lg:p-4 p-2 lg:pt-2">
      <NuxtLink :to="`/product/${product.key}`" class="lg:text-lg md:text-md text-sm line-clamp-2 text-gray hover:text-primary">
        {{ product.name }}
      </NuxtLink>
      <UiText class="line-clamp-2 lg:text-md md:text-sm text-xs" color="gray">{{ product.description }}</UiText>
    </div>

    <template #footer>
      <UiFlex justify="between" class="gap-2">
        <UiFlex class="gap-1">
          <UButton size="xs" @click="navigateTo(`/product/${product.key}`)" icon="i-ion-eye" color="primary">Xem chi tiết</UButton>
        </UiFlex>
        <UBadge color="gray" class="cursor-pointer hidden lg:block md:block">{{ product.category.name }}</UBadge>
      </UiFlex>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps(['product'])

const open = async (key) => {
  await navigateTo(`/product/${key}`)
}
</script>

<style lang="sass">
.BoxProducts
  transition: all 0.25s ease
  &:hover
    transform: translateY(-5px)
</style>
