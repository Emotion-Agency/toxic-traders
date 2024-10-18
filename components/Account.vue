<script lang="ts" setup>
import { SettingsDropdown } from '#components'
const { user } = useAuth()

const isAccountDropdownOpen = ref(false)

const onAccountClick = () => {
  isAccountDropdownOpen.value = !isAccountDropdownOpen.value
}

const $profileRef = ref<HTMLElement | null>(null)
const $dropdownRef = ref<typeof SettingsDropdown | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (
    $profileRef.value &&
    !$profileRef.value.contains(target) &&
    $dropdownRef.value.$el &&
    !$dropdownRef.value.$el.contains(target)
  ) {
    isAccountDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <button ref="$profileRef" class="header__account" @click="onAccountClick">
    <span class="header__account-name">{{ user?.email }}</span>
    <img src="/images/avatars/1.jpg" alt="Avatar" class="header__account-img" />
  </button>

  <SettingsDropdown ref="$dropdownRef" :is-open="isAccountDropdownOpen" />
</template>
