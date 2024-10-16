<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

const { isAuthenticated, user } = useAuth()

console.log(user.value)

onMounted(async () => {
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
    <Teleport to="body">
      <CustomScrollbar position="fixed" :body="true" />
    </Teleport>
  </div>
</template>
