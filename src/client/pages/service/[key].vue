<template>
  <div>
    <UBreadcrumb class="mb-3" divider="/"
      :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Quản lý dịch vụ', to: '/service' }, { label: 'Chi tiết dịch vụ' }]" />

    <div v-if="item.status == 0"
      class="w-full rounded-lg p-3 dark:bg-red-400 dark:bg-opacity-10 text-red-500 dark:text-red-400 bg-red-500 bg-opacity-10 mb-4">
      <UiFlex justify="between">
        <UiText color="red" size="sm">Đơn hàng chưa thanh toán</UiText>
        <UiText color="red" size="sm">Thanh toán ngay</UiText>
      </UiFlex>
    </div>

    <UCard class="mt-5">
      <UiFlex class="gap-2 mt-1 mb-2 rounded-lg" justify="between">
        <UiText size="sm" weight="semibold" class="mt-2">{{ item.product?.name || "..." }}</UiText>
        <UiFlex>
          <div>
            <UiText size="sm" weight="semibold">Ngày đăng ký : </UiText>
            <UiText size="sm" class="ml-2"> {{ useDayJs().displayFull(item.createdAt) || "..." }} /</UiText>
          </div>
         
        </UiFlex>
      </UiFlex>
      <UiFlex v-for="(item, index) in item.specs" :key="index"
        class="gap-2 mb-2 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
        <UiText size="sm" weight="semibold">{{ item.key }} :</UiText>
        <UiText size="sm" color="gray">{{ item.value }}</UiText>
      </UiFlex>
      <UiText text="Chu kỳ thanh toán" weight="semibold" size="base" class="my-3" />
      <UiFlex v-for="(item, index) in item.payments" :key="index"
        class="gap-2 mb-2 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
        <UiText size="sm" weight="semibold">{{ item.key }} :</UiText>
        <UiText size="sm" color="gray">{{ item.value }}</UiText>
      </UiFlex>
      <UiText text="Chi tiết dịch vụ" weight="semibold" size="base" class="my-3" />
      <div v-html="item.description"></div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const loading = ref(false);
const item = ref<any>({});
const get = async () => {
  try {
    loading.value = true;
    const data = await useAPI("client/service/detail", { _id: route.params.key });
    item.value = data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
get()
</script>

<style></style>