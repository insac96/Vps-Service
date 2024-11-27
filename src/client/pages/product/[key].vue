<template>
  <div>
    <div v-if="!!product" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
      <UCarousel v-if="product.images && product.images.length" v-slot="{ item }" :items="product.images"
        :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden col-span-2" arrows>
        <img :src="item" class="w-full max-h-[360px]" draggable="false" />
      </UCarousel>
      <UiImg v-else :src="product.og_image" class="rounded-lg overflow-hidden col-span-2 max-h-[360px]"
        alt="Product Image"></UiImg>
      <div class="col-span-1 md:col-span-1 lg:col-span-1">
        <div class="mb-2">
          <UiText :text="product.name" weight="semibold" size="lg" />
          <UiText size="sm" text="Mô tả" weight="semibold" class="pt-2" />
          <UiText :text="product.description" color="gray" size="sm" class="pb-1" />
        </div>
        <UiText size="sm" text="Giá thuê theo tháng" weight="semibold" class="py-1" />
        <div v-if="product.options?.length > 0" v-for="option in product.options" :key="option._id">
          <UiFlex class="py-1 border-b border-gray-200 dark:border-gray-800">
            <UiText color="red" size="sm" class="font-semibold" >{{useMoney().toMoney(option.price)}}</UiText>
            <UiText color="gray" size="sm" class="ml-1">
              / {{ option.number }} tháng</UiText>
          </UiFlex>
        </div>
        <div class="mt-3">
          <UButton v-if="authStore.isLogin" color="primary" size="md" @click="modal = true" icon="i-mdi-cart" class="w-full flex items-center justify-center">Thuê ngay</UButton>
          <UButton v-else color="red" disabled size="md" icon="i-mdi-cart" class="w-full flex items-center justify-center">Thuê ngay</UButton>
        </div>
      </div>
    </div>
    <UiFlex class="my-3 grid grid-cols-1 lg:col-span-1 md:grid-cols-3 gap-4" type="col">
      <div class="col-span-1 md:col-span-2">
        <UiText size="lg" text="Thông tin sản phẩm" color="red" class="pb-2" weight="semibold" />
        <UiDivider class="my-2" />
        <DataEditor :content="product.content" class="w-full" empty="Chưa có nội dung" />
      </div>
    </UiFlex>
    <!-- modal -->
    <UModal v-model="modal">
      <UForm :validate="validateForm" :state="state" @submit="submitAction" class="p-4">
        <UFormGroup label="Chọn mốc thuê" name="option">
          <USelectMenu v-model="state.option" :options="product.options" option-attribute="number"
            placeholder="Chọn mốc thuê">
            <template #option="{ option }">
              <span class="truncate">{{ option?.number }} tháng -
                {{ useMoney().toMoney(option?.price) }}</span>
            </template>
            <template #label="{ selected }">
              <span class="truncate">
                {{selected ? `${selected?.number} tháng - ${useMoney().toMoney( selected?.price)}`: "Chọn mốc thuê"}}
              </span>
            </template>
          </USelectMenu>
        </UFormGroup>
        <UFormGroup label="Ngân hàng" name="gateId">
          <SelectGate v-model="state.gateId" />
          <div v-if="gate && state.option && state.gateId" class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mt-4">
            <UiFlex justify="between" class="my-4">
              <UiText size="sm" color="gray" weight="semibold">Tên sản phẩm</UiText>
              <span class="clamp-1 max-w-[150px] md:max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis break-words text-sm font-semibold">{{product.name || "..."}}</span>
            </UiFlex>
            <UiFlex justify="between" class="my-4">
              <UiText size="sm" color="gray" weight="semibold">Thời gian thuê</UiText>
              <UiText size="sm" weight="semibold">{{state.option.number || "..."}} Tháng</UiText>
            </UiFlex>
            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray" weight="semibold" mini>Tổng số tiền</UiText>
              <UiFlex @click="startCopy(state.option.price)">
                <UiText size="sm" weight="semibold" align="right" class="ml-4" pointer>
                  {{ useMoney().toMoney(state.option.price) }}
                </UiText>
                <UiIcon name="i-bx-copy-alt" color="primary" class="ml-2" pointer />
              </UiFlex>
            </UiFlex>
            <UiFlex justify="between" class="my-4 border-t pt-4 border-gray-200 dark:border-gray-800">
              <UiText size="sm" color="gray" weight="semibold">Ngân hàng</UiText>
              <UiText size="sm" weight="semibold">{{gate.name || "..."}}</UiText>
            </UiFlex>
            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray" weight="semibold" mini>Người nhận</UiText>
              <UiText size="sm" weight="semibold" align="right" class="ml-4">{{
                gate.person || "..."
              }}</UiText>
            </UiFlex>
            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray" weight="semibold" mini>Số tài khoản</UiText>
              <UiFlex @click="startCopy(gate.number)">
                <UiText size="sm" weight="semibold" align="right" class="ml-4" pointer>{{ gate.number }}</UiText>
                <UiIcon name="i-bx-copy-alt" color="primary" class="ml-2" pointer />
              </UiFlex>
            </UiFlex>
            
          </div>
        </UFormGroup>
        <UiFlex justify="end" class="mt-6">
          <UButton type="submit" :loading="loading" color="primary">Xác nhận</UButton>
          <UButton color="gray" @click="modal = false" :disabled="loading" class="ml-1">Đóng</UButton>
        </UiFlex>
      </UForm>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import type { FormError, } from '#ui/types'
const { copy, isSupported } = useClipboard();
const authStore = useAuthStore();

const route = useRoute();
const loading = ref(false);
const product = ref<any>({});
const gate = ref<any>({});
const modal = ref(false);

// state
const state = ref<any>({
  key: route.params.key,
  gateId: undefined,
  option: null,
});


watch(
  () => state.value.gateId,
  async (value: any) => {
    try {
      const data = await useAPI("client/gate/get", { key: value });
      gate.value = data;
      gate.value = data;
    } catch (e) {
      console.error(e);
    }
  },
  { deep: true }
);
// copy
const startCopy = (text: any) => {
  if (!isSupported.value || !text) return;
  copy(text);
  useNotify().success("Sao chép vào bộ nhớ tạm thành công");
};
// validate
const validateForm = (state: any): Promise<FormError<string>[]> => {
  const errors: FormError<string>[] = [];
  if (!state.option) errors.push({ path: "option", message: "Vui lòng chọn mốc thuê" });
  if (!state.gateId) errors.push({ path: "gateId", message: "Vui lòng chọn ngân hàng" });
  return Promise.resolve(errors);
};

const get = async () => {
  try {
    loading.value = true;
    const data = await useAPI("client/product/get", { key: route.params.key });
    product.value = data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
const submitAction = async () => {
  try {
    loading.value = true;
    await useAPI("client/order/create", JSON.parse(JSON.stringify(state.value)));
    loading.value = false;
    modal.value = false;
  } catch (e) {
    loading.value = false;
  }
};
get();
</script>
