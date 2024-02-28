<script setup lang="ts">
interface iProps {
  variant: 'fill' | 'outlined'
}

defineProps<iProps>()
</script>

<template>
  <button class="badge" :class="[`badge--${variant}`]">
    <slot />
    <span>
      <IconsClose />
    </span>
  </button>
</template>
