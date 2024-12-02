<template>
  <div>
    <UBreadcrumb class="mb-3" divider="/"
      :links="[{ label: 'Trang chủ', to: '/' }, { label: 'Quản lý dịch vụ', to: '/service' }, { label: 'Chi tiết dịch vụ' }]" />
    <div v-if="item?.status == 0"
      class="w-full rounded-lg p-3 dark:bg-red-400 dark:bg-opacity-10 text-red-500 dark:text-red-400 bg-red-500 bg-opacity-10 mb-4">
      <UiFlex justify="between">
        <UiText color="red" size="sm">Đơn hàng chưa thanh toán</UiText>
        <UiText color="red" size="sm">Thanh toán ngay</UiText>
      </UiFlex>
    </div>

    <UCard class="mt-5">
      <UiFlex class="gap-2 py-2 pt-0 rounded-lg border-b border-gray-200 dark:border-gray-800 flex-wrap" justify="between">
        <UiFlex class="pb-2 md:w-1/2 w-full md:justify-start justify-between">
          <UiText size="sm" weight="semibold" class="mt-2">{{ item.product?.name || "..." }}</UiText>
          <UBadge size="sm" weight="semibold" class="mt-2 ml-2" :color="statusFormat[item.status]?.color">
            {{ statusFormat[item.status]?.label }}</UBadge>
        </UiFlex>
        <UiFlex class="pb-2">
          <div class="pr-2 border-r border-gray-200 dark:border-gray-600">
            <UiText size="sm">Ngày đăng ký : </UiText>
            <UiText size="sm" weight="semibold"> {{ useDayJs().displayFull(item.createdAt) || "..." }}</UiText>
          </div>
          <div class="ml-2">
            <UiText size="sm">Ngày hết hạn: </UiText>
            <UiText size="sm" weight="semibold"> {{ item.end_time ? useDayJs().displayFull(item.end_time) : "..." }}
            </UiText>
          </div>
        </UiFlex>
      </UiFlex>
      <UiFlex class="py-4 flex-wrap" justify="between">
        <div>
          <UiText size="sm" weight="semibold">Thanh toán lần đầu</UiText>
          <UiText size="sm" color="gray" class="pt-2">{{ item.price ? useMoney().toMoney(item.price) : 0 }} đ</UiText>
        </div>
        <div>
          <UiText size="sm" weight="semibold">Chu kỳ thanh toán</UiText>
          <UiText size="sm" color="gray" class="pt-2">{{ item.number || "..." }} Tháng</UiText>
        </div>
        <div>
          <UiText size="sm" weight="semibold">Số tiền thanh toán định kỳ</UiText>
          <UiText size="sm" color="gray" class="pt-2">{{ item.price ? useMoney().toMoney(item.price) : 0 }} đ</UiText>
        </div>
        <div>
          <UiText size="sm" weight="semibold">SL máy chủ VPS</UiText>
          <UiText size="sm" color="gray" class="pt-2">{{ item.quantity || "..." }}</UiText>
        </div>
      </UiFlex>
      <div class="py-3 border-t border-gray-200 dark:border-gray-800">
        <UiText size="base" weight="semibold">Thông tin máy chủ</UiText>
        <div v-if="item.info && item.info.length > 0" v-for="(server, index) in item.info"
          class="border border-gray-200 dark:border-gray-800 rounded-lg p-3 mt-2">
          <UiFlex class="mt-2" justify="between">
            <UiText size="sm" weight="semibold">Tên máy chủ : </UiText>
            <UiText size="sm" color="gray" class="ml-2">{{ item.server || "..." }}</UiText>
          </UiFlex>
          <UiFlex class="mt-2" justify="between">
            <UiText size="sm" weight="semibold">Hệ điều hành : </UiText>
            <UiText size="sm" color="gray" class="ml-2">{{ item?.os?.name || "..." }}</UiText>
          </UiFlex>
          <UiFlex class="mt-2" justify="between">
            <UiText size="sm" weight="semibold">Địa chỉ IP : </UiText>
            <UiText size="sm" color="gray" class="ml-2">{{ server.ip || "..." }}</UiText>
          </UiFlex>
          <UiFlex class="mt-2" justify="between">
            <UiText size="sm" weight="semibold">Mật khẩu : </UiText>
            <UiFlex>
              <UiText size="sm" color="gray" class="ml-2">{{ item.status == 1 && showPassword[index] ? server.password : "............." }}</UiText>
              <UiIcon :name="showPassword[index] ? 'i-bxs-hide' : 'i-bxs-show'" color="primary" class="ml-2" pointer
                @click="showPassword[index] = !showPassword[index]" v-if="item.status == 1" />
            </UiFlex>
          </UiFlex>
        </div>
        <UiText size="sm" class="mt-2" v-else color="red">Chưa có thống tin máy chủ</UiText>
      </div>
      <UiFlex class="mt-2">
        <UButton icon="material-symbols:upload-rounded" :disabled="item.status !== 1" @click="upgrade" color="primary">
          Nâng cấp gói</UButton>
      </UiFlex>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const loading = ref(false);
const item = ref<any>({});
const statusFormat = ref<any>({
  0: { label: 'Chờ kích hoạt', color: 'orange' },
  1: { label: 'Đã kích hoạt', color: 'green' },
  2: { label: 'Hết hạn', color: 'primary' },
  3: { label: 'Đã hủy', color: 'red' },
});
const showPassword = ref<any>([]);
const get = async () => {
  try {
    loading.value = true;
    const data = await useAPI("client/service/detail", { _id: route.params.key });
    item.value = data;
    showPassword.value = data.info.map(() => false);
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
const upgrade = async () => {
  useNotify().error('Chúng tôi đang cập nhật, vui lòng quay lại sau')
}
get()
</script>
