<script setup lang="ts">
import { resize } from '~/utils/ea'

// let navbarPos
const $el = ref<HTMLElement | null>(null)

const navigationList = [
  {
    text: 'Calendar',
    link: '/calendar/',
  },
  {
    text: 'Brokers',
    link: '/brokers/',
  },
  {
    text: 'Spreads',
    link: '/spreads/',
  },
]

const calcHeight = () => {
  const height = $el.value.offsetHeight
  document.documentElement.style.setProperty('--h', `${height}px`)
}

onMounted(() => {
  // const { default: NavbarPos } = await import('~/utils/navbarPos')

  // navbarPos = new NavbarPos()
  // navbarPos.init()
  resize.on(calcHeight)
})

useOnBeforeUnmountDelay(() => {
  // navbarPos && navbarPos.destroy()
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
        <nav class="header__list">
          <NuxtLink
            v-for="(item, idx) in navigationList"
            :key="idx"
            :to="item.link"
            class="header__link"
          >
            {{ item.text }}
          </NuxtLink>
        </nav>
      </div>
      <div class="header__side header__side--right">
        <HeadlessTooltip>
          <template #trigger>
            <div class="header__timezone">
              GMT{{ getGMTTime(-new Date().getTimezoneOffset()) }}
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
