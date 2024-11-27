<template>
  <div >
    <UCard :ui="{
      body: { padding: 'p-0 sm:p-0' },
      header: { padding: 'px-3 sm:px-3 py-2 sm:py-2' },
      footer: { padding: 'p-2 sm:p-2' },
    }">
    <LoadingTable v-if="loading.load" />

      <template #header>
        <UiFlex>
          <USelectMenu v-model="page.size" :options="[5, 10, 20, 50, 100]" class="mr-1" />
          <UButton color="primary" class="mb-2 ml-auto rounded-md sm:mb-0" @click="modal.add = true">Thêm thông tin</UButton>
        </UiFlex>
      </template>

      <UTable v-model:sort="page.sort" :columns="columns" :rows="list">
        <template #action-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" icon="i-bx-dots-horizontal-rounded" :disabled="loading.del" />
          </UDropdown>
        </template>
      </UTable>

      <template #footer>
        <UiFlex justify="end">
          <UPagination class="ml-auto" v-model="page.current" :page-count="page.size" :total="page.total" :max="5" />
        </UiFlex>
      </template>
      <!-- modal -->
      <UModal v-model="modal.add">
        <UForm @submit="addAction" :state="stateAdd" :validate="validate" class="p-4">
          <UFormGroup label="Tên công ty" name="name">
            <UInput v-model="stateAdd.name" />
          </UFormGroup>

          <UFormGroup label="Mã số thuế" name="tax_code">
            <UInput v-model="stateAdd.tax_code" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="stateAdd.email" />
          </UFormGroup>

          <UFormGroup label="Địa chỉ" name="address">
            <UInput v-model="stateAdd.address" />
          </UFormGroup>

          <UiFlex justify="end" class="pb-4">
            <UButton color="primary" type="submit">Xác nhận</UButton>
            <UButton color="gray" class="ml-2" @click="modal.add = false">Đóng</UButton>
          </UiFlex>
        </UForm>
      </UModal>

      <UModal v-model="modal.edit">
        <UForm @submit="editAction" :state="stateEdit" :validate="validate" class="p-4">
          <UFormGroup label="Tên công ty" name="name">
            <UInput v-model="stateEdit.name" />
          </UFormGroup>

          <UFormGroup label="Mã số thuế" name="tax_code">
            <UInput v-model="stateEdit.tax_code" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="stateEdit.email" />
          </UFormGroup>

          <UFormGroup label="Địa chỉ" name="address">
            <UInput v-model="stateEdit.address" />
          </UFormGroup>

          <UiFlex justify="end" class="pb-4">
            <UButton color="primary" type="submit">Xác nhận</UButton>
            <UButton color="gray" class="ml-2" @click="modal.edit = false">Đóng</UButton>
          </UiFlex>
        </UForm>
      </UModal>
    </UCard>
  </div>
</template>

<script setup>
const list = ref([])
const modal = ref({
  add: false,
  edit: false,
})
const loading = ref({
  load: true
})
const stateAdd = ref({
  name: null,
  tax_code: null,
  email: null,
  address: null
})
const stateEdit = ref({
  _id: null,
  name: null,
  tax_code: null,
  email: null,
  address: null
})
const page = ref({
  size: 5,
  current: 1,
  sort: {
    column: 'createdAt',
    direction: 'desc'
  },
  search: {
    key: null,
    by: 'name'
  },
  total: 0,
})

const columns = [
  {
    key: 'name',
    label: 'Công ty',
  }, {
    key: 'tax_code',
    label: 'Mã số thuế',
  }, {
    key: 'email',
    label: 'Email',
  }, {
    key: 'address',
    label: 'Địa chỉ',
  }, {
    key: 'action',
    label: 'Chức năng',
  }
]
const actions = (row) => [
  [{
    label: 'Sửa thông tin',
    icon: 'i-bx-pencil',
    click: () => {
      Object.keys(stateEdit.value).forEach(key => stateEdit.value[key] = row[key])
      modal.value.edit = true
    }
  }]
]
const validate = (state) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Vui lòng nhập đầy đủ' })
  if (!state.tax_code) errors.push({ path: 'tax_code', message: 'Vui lòng nhập đầy đủ' })
  else if (isNaN(Number(state.tax_code))) errors.push({ path: 'tax_code', message: 'Định dạng không hợp lệ' })
  if (!state.email) errors.push({ path: 'email', message: 'Vui lòng nhập đầy đủ' })
  else if (!state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) errors.push({ path: 'email', message: 'Định dạng không đúng' })
  if (!state.address) errors.push({ path: 'address', message: 'Vui lòng nhập đầy đủ' })
  return errors
}

const addAction = async () => {
  try {
    loading.value.load = true
    await useAPI('client/user/tax/add', JSON.parse(JSON.stringify(stateAdd.value)))
    loading.value.load = false
    modal.value.add = false
    stateAdd.value = {
      name: null,
      tax_code: null,
      email: null,
      address: null
    }
    getList()
  }
  catch (e) {
    loading.value.load = false
  }
}
const editAction = async () => {
  try {
    loading.value.load = true
    await useAPI('client/user/tax/edit', JSON.parse(JSON.stringify(stateEdit.value)))
    loading.value.load = false
    modal.value.edit = false
    getList()
  }
  catch (e) {
    loading.value.load = false
  }
}
const getList = async () => {
  try {
    loading.value.load = true
    const data = await useAPI('client/user/tax/list', JSON.parse(JSON.stringify(page.value)))
    loading.value.load = false
    list.value = data.list
    page.value.total = data.total
  }
  catch (e) {
    loading.value.load = false
  }
}

getList()
</script>

