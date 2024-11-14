<script lang="ts" setup>
type Theme = 'dark' | 'light' | 'system'

const theme = ref<Theme>('system')

const setupClasses = (variant: 'dark' | 'light') => {
  if (variant === 'dark') {
    document.body.classList.remove('light-mode')
  } else {
    document.body.classList.add('light-mode')
  }

  if (variant === 'light') {
    document.body.classList.remove('dark-mode')
  } else {
    document.body.classList.add('dark-mode')
  }
}

const onThemeChange = (newTheme: Theme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)

  if (theme.value === 'system') {
    const preferDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

    setupClasses(preferDarkScheme.matches ? 'dark' : 'light')
    return
  }

  setupClasses(theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    onThemeChange(savedTheme as Theme)
  } else {
    onThemeChange(theme.value)
  }
})
</script>

<template>
  <HeadlessDropdownMenu class="dropdown theme">
    <HeadlessDropdownTrigger class="theme-btn">
      <IconsTheme />
    </HeadlessDropdownTrigger>

    <Teleport to="#teleports">
      <Transition name="dropdown">
        <HeadlessDropdownItems style="z-index: 1000" class="dropdown__items">
          <HeadlessDropdownItem
            class="dropdown__item theme__item"
            :class="{ 'theme__item--active': theme === 'light' }"
            @click="onThemeChange('light')"
          >
            <IconsThemeLight class="theme__change-icons" />
            <span>Light</span>
          </HeadlessDropdownItem>
          <HeadlessDropdownItem
            class="dropdown__item theme__item"
            :class="{ 'theme__item--active': theme === 'dark' }"
            @click="onThemeChange('dark')"
          >
            <IconsThemeDark class="theme__change-icons" />
            <span>Dark</span>
          </HeadlessDropdownItem>
          <HeadlessDropdownItem
            class="dropdown__item theme__item"
            :class="{
              'theme__item--active': theme === 'system',
            }"
            @click="onThemeChange('system')"
          >
            <IconsThemeSystem class="theme__change-icons" />
            <span>System</span>
          </HeadlessDropdownItem>
        </HeadlessDropdownItems>
      </Transition>
    </Teleport>
  </HeadlessDropdownMenu>
</template>
