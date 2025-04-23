<script setup lang="ts">
import { resize } from '~/utils/ea'

const $el = ref<HTMLElement | null>(null)

const calcHeight = () => {
  const height = $el.value.offsetHeight
  document.documentElement.style.setProperty('--h', `${height}px`)
}

onMounted(() => {
  resize.on(calcHeight)
})

useOnBeforeUnmountDelay(() => {
  resize.off(calcHeight)
})
</script>

<template>
  <header ref="$el" class="header">
    <div class="header__wrapper container">
      <div class="header__side header__side--left">
        <NuxtLink to="/" class="header__logo-wrapper">
          <span>
            <IconsLogo />
          </span>
        </NuxtLink>
        <TheNavigation />
      </div>
      <div class="header__side header__side--right">
        <HeadlessTooltip>
          <template #trigger>
            <div class="header__timezone">
              UTC{{ getGMTTime(-new Date().getTimezoneOffset()) }}
            </div>
          </template>

          {{ Intl.DateTimeFormat().resolvedOptions().timeZone }}
        </HeadlessTooltip>

        <ThemeDropdown />
        <SettingsDropdown />
      </div>
    </div>
  </header>
</template>
