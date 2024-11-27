<template>
  <UCard v-if="product" class="BoxProducts shadow-lg" :ui="{
    body: { padding: 'p-0 sm:p-0' },
    background: 'bg-gray-50 dark:bg-gray-800',
  }">
    <div class="bg-primary-50 dark:bg-primary-900">
      <UiText weight="semibold" class="line-clamp-1 px-3 py-2 lg:text-lg md:text-md text-sm">{{
        product.name }}</UiText>
    </div>

    <template #footer>
      <UiFlex class="gap-1 my-1" v-for="item in product.specs" :key="item._id">
        <UiText class="min-w-[70px]" weight="semibold" size="base"> {{ item.key }} :</UiText>
        <UiText class="ml-2 line-clamp-1" size="base">{{ item.value }}</UiText>
      </UiFlex>
      <USelectMenu v-model="state.option" :options="product.options" option-attribute="number"
        class="border mt-2 border-gray-200 dark:border-gray-600 rounded-lg">
        <template #option="{ option }">
          <span class="truncate">{{ option?.number }} tháng -
            {{ useMoney().toMoney(option?.price) }}₫</span>
        </template>
        <template #label="{ selected }">
          <span class="truncate">{{ selected ? `${selected?.number} tháng - ${useMoney().toMoney(selected?.price)}` :
            "Giá thuê / Tháng" }}
          </span>
        </template>
      </USelectMenu>
      <UButton color="primary" size="md" @click="modal = true"
        class="w-full flex items-center rounded-lg my-2 justify-center">Đăng ký ngay</UButton>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps(["product"]);
const state = ref({
  option: null
})
</script>

<style lang="sass">
.BoxProducts
  transition: all 0.25s ease
  &:hover
    transform: translateY(-5px)
</style>
