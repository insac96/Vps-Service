<template>
    <UiContent title="Service" sub="Danh sách dịch vụ">
        <UiEmpty v-if="!authStore.isLogin" title='Bạn chưa đăng nhập' />
        <div v-else >
            dịch vụ
        </div>
    </UiContent>
</template>
<script lang="ts" setup>
const authStore = useAuthStore()
</script>