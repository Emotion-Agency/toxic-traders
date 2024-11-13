<script setup lang="ts">
const isOpen = ref(false)
const activeIndex = ref(-1)
const menuItems = ref<HTMLElement[]>([])
const $menuRef = ref<HTMLElement | null>(null)
const $triggerRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % menuItems.value.length
    menuItems.value[activeIndex.value]?.focus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value =
      (activeIndex.value - 1 + menuItems.value.length) % menuItems.value.length
    menuItems.value[activeIndex.value]?.focus()
  } else if (event.key === 'Escape') {
    closeDropdown()
  }
}

const registerTrigger = (trigger: HTMLElement) => {
  $triggerRef.value = trigger
}

provide('isOpen', isOpen)
provide('toggleDropdown', toggleDropdown)
provide('closeDropdown', closeDropdown)
provide('registerItem', (item: HTMLElement) => {
  menuItems.value.push(item)
})

provide('triggerEl', $triggerRef)
provide('registerTrigger', registerTrigger)

const handleOutsideClick = (event: MouseEvent) => {
  if (!isOpen.value) return

  const menu = $menuRef.value as HTMLElement
  if (!menu.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  window.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div data-dropdown-menu ref="$menuRef" @keydown="handleKeydown">
    <slot />
  </div>
</template>

<style scoped>
[data-dropdown-menu] {
  display: inline-block;
  position: relative;
}
</style>
