<script setup lang="ts">
const closeDropdown = inject('closeDropdown') as () => void
const registerItem = inject('registerItem') as any
const itemRef = ref<HTMLElement | null>(null)

function handleClick() {
  closeDropdown()
}

function setActive() {
  // Optionally, manage active styling when focused
}

onMounted(() => {
  if (itemRef.value) {
    registerItem(itemRef.value)
  }
})
</script>

<template>
  <li
    role="menuitem"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    ref="itemRef"
    @focus="setActive"
  >
    <slot />
  </li>
</template>
