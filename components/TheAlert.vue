<script setup lang="ts">
interface iProps {
  variant: 'info' | 'success' | 'danger' | 'warning'
}

defineProps<iProps>()
</script>

<template>
  <div class="alert" :class="`alert--${variant}`">
    <span
      v-if="variant === 'danger' || variant === 'warning'"
      class="alert__icon"
    >
      <IconsDanger />
    </span>
    <slot />
    <button class="alert__close-btn">
      <span class="alert__close-line" />
      <span class="alert__close-line" />
    </button>
  </div>
</template>
