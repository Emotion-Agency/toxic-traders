<script setup lang="ts">
interface iProps {
  buttonSize: 'large' | 'medium' | 'small'
  variant: 'fill' | 'outlined' | 'soft'
  disabled?: boolean
}

defineProps<iProps>()
</script>

<template>
  <button
    class="button"
    :class="[`button--${variant}`, `button--${variant}-${buttonSize}`]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
