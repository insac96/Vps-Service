<template>
  <UCard class="sm:w-full lg:w-3/4">
    <UForm :state="state" :validate="validate" @submit="submit">
      <UFormGroup label="Mật khẩu hiện tại" name="oldPass" :hint="`${state.oldPass ? state.oldPass.length : 0}/15`">
        <UInput icon="i-bxs-lock" v-model="state.oldPass" type="password"/>
      </UFormGroup>
  
      <UFormGroup label="Mật khẩu mới" name="newPass" :hint="`${state.newPass ? state.newPass.length : 0}/15`">
        <UInput icon="i-bxs-lock" v-model="state.newPass" type="password"/>
      </UFormGroup>
  
      <UFormGroup label="Nhập lại mật khẩu mới" name="confirmPass" :hint="`${state.confirmPass ? state.confirmPass.length : 0}/15`">
        <UInput icon="i-bxs-lock" v-model="state.confirmPass" type="password" />
      </UFormGroup>
  
      <UiFlex justify="end">
        <UButton type="submit" :loading="loading">Xác Nhận</UButton>
      </UiFlex>
    </UForm>
  </UCard>
</template>

<script setup>
const emits = defineEmits(['done'])

const authStore = useAuthStore()
const loading = ref(false)
const state = ref({
  oldPass: undefined,
  newPass: undefined,
  confirmPass: undefined
})

const validate = (state) => {
  const errors = []

  if (!state.oldPass) {
    errors.push({ path: 'oldPass', message: 'Vui lòng nhập đầy đủ' })
  } else if (state.oldPass.length < 6 || state.oldPass.length > 15) {
    errors.push({ path: 'oldPass', message: 'Độ dài 6-15 ký tự' })
  } else if (/\s/.test(state.oldPass)) {
    errors.push({ path: 'oldPass', message: 'Phát hiện khoảng cách' })
  }

  if (!state.newPass) {
    errors.push({ path: 'newPass', message: 'Vui lòng nhập đầy đủ' })
  } else if (state.newPass.length < 6 || state.newPass.length > 15) {
    errors.push({ path: 'newPass', message: 'Độ dài 6-15 ký tự' })
  } else if (/\s/.test(state.newPass)) {
    errors.push({ path: 'newPass', message: 'Phát hiện khoảng cách' })
  }

  if (!state.confirmPass) {
    errors.push({ path: 'confirmPass', message: 'Vui lòng nhập đầy đủ' })
  } else if (state.confirmPass.length < 6 || state.confirmPass.length > 15) {
    errors.push({ path: 'confirmPass', message: 'Độ dài 6-15 ký tự' })
  } else if (/\s/.test(state.confirmPass)) {
    errors.push({ path: 'confirmPass', message: 'Phát hiện khoảng cách' })
  } else if (state.confirmPass !== state.newPass) {
    errors.push({ path: 'confirmPass', message: 'Mật khẩu không khớp' })
  }

  return errors
}

const submit = async () => {
  try {
    if(!!loading.value) return
    loading.value = true
    await useAPI('auth/sign/forgot', JSON.parse(JSON.stringify(state.value)))

    loading.value = false
    emit('done')
  }
  catch (e) {
    loading.value = false
  }
}
</script>