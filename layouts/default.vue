<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

const { isAuthenticated } = useAuth()
const { isLoaded } = useAppState()

onMounted(async () => {
  isLoaded.value = true
  const { hello } = await import('~/utils/hello')

  hello()
})

useHead({
  htmlAttrs: {
    lang: 'en',
    id: 'scroll-container',
  },
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>Toxic Traders</Title>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"></Link>
    </Head>
    <AppGrid />
    <!-- <Landscape /> -->
    <ClientOnly>
      <TheHeader v-if="isAuthenticated" />
    </ClientOnly>
    <slot />
    <AppToast />
    <div class="e-loader" v-if="!isLoaded">
      <UiLoader />
    </div>
    <Teleport to="body">
      <CustomScrollbar position="fixed" :body="true" />
    </Teleport>
  </div>
</template>
