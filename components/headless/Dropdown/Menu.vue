<script setup lang="ts">
import type { MaybeElement, MaybeElementRef } from '@vueuse/core'

interface IProps {
  trigger?: 'click' | 'hover'
  as?: string
}

const props = withDefaults(defineProps<IProps>(), {
  trigger: 'click',
  as: 'div',
})

const isOpen = ref(false)
const activeIndex = ref(-1)
const menuItems = ref<HTMLElement[]>([])
const $menuRef: MaybeElementRef<MaybeElement> = ref(null)
const $triggerRef = ref<HTMLElement | null>(null)

function toggleDropdown(value?: boolean) {
  if (value === undefined) {
    isOpen.value = !isOpen.value
  } else {
    isOpen.value = value
  }
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

provide('trigger', props.trigger)
provide('triggerEl', $triggerRef)
provide('registerTrigger', registerTrigger)

onClickOutside($menuRef, closeDropdown)

const onMouseMove = e => {
  if (props.trigger !== 'hover') return
  const isShowDropdown =
    e.target === $triggerRef.value || menuItems.value?.includes(e.target)

  toggleDropdown(isShowDropdown)
}

onMounted(() => {
  document.body.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <component
    :is="as"
    data-dropdown-menu
    ref="$menuRef"
    @keydown="handleKeydown"
  >
    <slot :is-open="isOpen" />
  </component>
</template>

<style scoped>
[data-dropdown-menu] {
  display: inline-block;
  position: relative;
}
</style>
