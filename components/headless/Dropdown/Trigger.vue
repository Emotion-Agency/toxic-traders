<script setup lang="ts">
const toggleDropdown = inject('toggleDropdown') as () => void

const registerTrigger = inject('registerTrigger') as (
  trigger: HTMLElement
) => void

const $triggerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!$triggerRef.value) return

  registerTrigger($triggerRef.value as HTMLElement)
})
</script>

<template>
  <button
    ref="$triggerRef"
    @click="toggleDropdown"
    @keydown.space.prevent="toggleDropdown"
    @keydown.enter.prevent="toggleDropdown"
  >
    <slot />
  </button>
</template>
