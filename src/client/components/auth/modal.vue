<template>
  <UModal v-model="open">
    <div class="p-2">
      <!-- Tabs -->
      <UCard>
        <!-- Tab Sign In -->
        <AuthSignIn v-model:tab="tab" v-if="tab == 0" @done="open = false" />
        <!-- Tab Sign Up -->
        <AuthSignUp v-model:tab="tab" v-if="tab == 1" @done="open = false" />
        <!-- Tab Sign Forgot -->
        <AuthSignForgot v-model:tab="tab" v-if="tab == 2" @done="tab = 0" />
      </UCard>
    </div>
  </UModal>
</template>

<script setup>
const authStore = useAuthStore()
const tab = ref(0) 
const open = ref(false)
watch(() => authStore.modal, (val) => (open.value = val))
watch(() => open.value, (val) => (!val && authStore.setModal(false)))
</script>