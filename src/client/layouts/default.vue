<template>
  <div>
    <header class="header">
      <LayoutDefaultHeader />
    </header>

    <main class="pt-[var(--layout-default-header-size)] min-h-[calc(100vh-var(--layout-default-header-size))]">
      <UContainer class="p-2">
        <slot></slot>
      </UContainer>
    </main>
    <footer class="mt-auto">
      <LayoutDefaultFooter />
    </footer>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

</script>

<style lang="sass">
:root
  --layout-default-header-size: 3.5rem
  --layout-default-nav-size: 250px


.header
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 1

  nav
    position: fixed
    top: 0
    height: 100%

  nav
    grid-area: nav
    left: var(--layout-nav-reponsize)
    width: var(--layout-default-nav-size)

  main
    position: relative
    grid-area: main

@media (min-width: 768px)
  .LayoutDefault
    --layout-nav-reponsize: 0
    grid-template-columns: var(--layout-default-nav-size) 1fr 0

@media (min-width: 1280px)
  .LayoutDefault
    --layout-nav-reponsize: 0
    grid-template-columns: var(--layout-default-nav-size) 1fr
</style>