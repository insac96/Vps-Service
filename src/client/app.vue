<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="2" />
    <NuxtPage />
    <UNotifications />
    <AuthModal />
  </NuxtLayout>
</template>

<script setup>
import colors from '#tailwind-config/theme/colors'
const { img } = useMakeLink()

const appConfig = useAppConfig()
const configStore = useConfigStore()


// Init Theme Cookie
const initThemeCookie = () => {
  const primaryCookie = useCookie('theme-primary')
  const grayCookie = useCookie('theme-gray')

  if(!!primaryCookie.value) appConfig.ui.primary = primaryCookie.value
  if(!!grayCookie.value) appConfig.ui.gray = grayCookie.value
}
initThemeCookie()
</script>