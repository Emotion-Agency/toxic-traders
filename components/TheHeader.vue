<script setup lang="ts">
import { resize } from '~/utils/ea'
import ThemeSwitcher from './ThemeSwitcher.vue'

// let navbarPos
const $el = ref<HTMLElement | null>(null)

const navigationList = [
  {
    text: 'Calendar',
    link: '/',
  },
  {
    text: 'Brokers',
    link: '/brokers',
  },
  {
    text: 'Spreads',
    link: '/spreads',
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
      <div class="header__right-menu">
        <ThemeSwitcher />
        <Account />
      </div>
    </div>
  </header>
</template>
