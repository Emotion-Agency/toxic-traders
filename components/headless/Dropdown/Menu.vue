<script setup lang="ts">
import {
  onClickOutside,
  type MaybeElement,
  type MaybeElementRef,
} from '@vueuse/core'

const isOpen = ref(false)
const activeIndex = ref(-1)
const menuItems = ref<HTMLElement[]>([])
const $menuRef: MaybeElementRef<MaybeElement> = ref(null)
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

onClickOutside($menuRef, closeDropdown)
</script>

<template>
  <div data-dropdown-menu ref="$menuRef" @keydown="handleKeydown">
    <slot :is-open="isOpen" />
  </div>
</template>

<style scoped>
[data-dropdown-menu] {
  display: inline-block;
  position: relative;
}
</style>
