<template>
  <UiContent title="Statistic" sub="Quản lý thống kê">
    <UTabs :items="items" @change="onChange" class="max-w-[500px] my-4" />
    <div class="grid grid-cols-1 gap-4 md:gap-2 md:grid-cols-4">
      <UiFlex class="sm:p-6 px-4 md:px-8 py-6 md:py-8 border border-gray-200 dark:border-gray-800 rounded-lg"
        justify="between">
        <div class="px-4 py-2 item-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <UIcon size="20" class="mt-2" name="solar:dollar-bold" />
        </div>
        <div class="ml-2">
          <UiText size="base" color="gray" class="clamp-1 line-clamp-1">Doanh thu</UiText>
          <UiText v-if="!loading" size="2xl" weight="semibold" color="primary">{{ useMoney().toMoney(list.total || 0) }}
          </UiText>
          <USkeleton v-else class="h-6 w-full" />
        </div>
      </UiFlex>
      <UiFlex class="sm:p-6 px-4 md:px-8 py-6 md:py-8 border border-gray-200 dark:border-gray-800 rounded-lg"
        justify="between">
        <div class="px-4 py-2 item-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <UIcon size="20" class="mt-2" name="material-symbols:shopping-cart" />
        </div>
        <div class="ml-2">
          <UiText size="base" color="gray" class="clamp-1 line-clamp-1">Đơn hàng</UiText>
          <UiText v-if="!loading" size="2xl" weight="semibold" color="primary">{{ list.order || 0 }}</UiText>
          <USkeleton v-else class="h-6 w-full" />
        </div>
      </UiFlex>
      <UiFlex class="sm:p-6 px-4 md:px-8 py-6 md:py-8 border border-gray-200 dark:border-gray-800 rounded-lg"
        justify="between">
        <div class="px-4 py-2 item-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <UIcon size="20" class="mt-2" name="material-symbols:supervisor-account" />
        </div>
        <div class="ml-2">
          <UiText size="base" color="gray" class="clamp-1 line-clamp-1">Người dùng</UiText>
          <UiText v-if="!loading" size="2xl" weight="semibold" color="primary">{{ list.user || 0 }}</UiText>
          <USkeleton v-else class="h-6 w-full" />
        </div>
      </UiFlex>
      <UiFlex class="sm:p-6 px-4 md:px-8 py-6 md:py-8 border border-gray-200 dark:border-gray-800 rounded-lg"
        justify="between">
        <div class="px-4 py-2 item-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <UIcon size="20" class="mt-2" name="material-symbols:tv-displays-outline" />
        </div>
        <div class="ml-2">
          <UiText size="base" color="gray" class="clamp-1 line-clamp-1">Máy chủ Hoạt động</UiText>
          <UiText v-if="!loading" size="2xl" weight="semibold" color="primary">{{ list.service || 0 }}</UiText>
          <USkeleton v-else class="h-6 w-full" />
        </div>
      </UiFlex>
    </div>
  </UiContent>
</template>

<script lang="ts" setup>
const list = ref<any>({})
const loading = ref(true)

function onChange(index: number) {
  const item = items[index]
  // getStatistic(item.value)
}
const items = [{
  label: 'Hôm nay',
  value: 'day',
},
{
  label: 'Hôm qua',
  value: 'yesterday',
},
{
  label: 'Tháng này',
  value: 'month',
},
{
  label: 'Tháng trước',
  value: 'lastMonth',
}]
const getStatistic = async () => {
  try {
    const data = await useAPI('admin/statistic/get')
    list.value = data
    loading.value = false
  } catch {
    loading.value = false
  }
}
getStatistic()
</script>

<style></style>