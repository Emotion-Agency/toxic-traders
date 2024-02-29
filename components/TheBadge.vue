<script setup lang="ts">
interface iProps {
  variant: 'fill' | 'outlined'
  isButton?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}
</script>

<template>
  <button
    class="badge"
    :class="[`badge--${variant}`]"
    :disabled="!isButton"
    @click="onClose"
  >
    <slot />
    <span v-if="isButton">
      <IconsClose />
    </span>
  </button>
</template>
