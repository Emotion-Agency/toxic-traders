<script setup lang="ts">
import { useFonts } from '~/composables/fonts'
import {
  clientTimezone,
  clientTimezoneOffset,
  serverTimezone,
  serverTimezoneOffset,
} from '~/utils/constants/timezones'

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

const router = useRouter()

const { saveScrollPos } = useScrollPos()
const { activeEvent } = useCalendarEvents()

router.beforeEach(route => {
  if (!(route.name as string).includes('calendar')) {
    activeEvent.value = null
  }
  saveScrollPos()
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
