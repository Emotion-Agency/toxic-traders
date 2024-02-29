<script setup lang="ts">
interface iProps {
  variant: 'info' | 'success' | 'danger' | 'warning'
}

defineProps<iProps>()

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}
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
    <button class="alert__close-btn" @click="onClose">
      <span class="alert__close-line" />
      <span class="alert__close-line" />
    </button>
  </div>
</template>
