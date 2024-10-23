<script lang="ts" setup>
type Theme = 'dark' | 'light'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value

  document.body.classList.toggle('dark-mode', isDarkMode.value)
  document.body.classList.toggle('light-mode', !isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
    document.body.classList.toggle('dark-mode', isDarkMode.value)
  }
  const preferDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

  const detectThemeChange = (event: MediaQueryListEvent) => {
    const theme: Theme = event.matches ? 'dark' : 'light'

    isDarkMode.value = theme === 'dark'
  }

  preferDarkScheme.addEventListener('change', detectThemeChange)
})
</script>

<template>
  <button
    class="header__theme-btn"
    aria-label="Theme changer"
    @click="toggleTheme"
  >
    <span>
      <IconsTheme />
    </span>
  </button>
</template>
