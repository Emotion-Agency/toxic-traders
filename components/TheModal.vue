<script setup lang="ts">
interface IProps {
  modalOpened: boolean
  title: string
}

defineProps<IProps>()

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}
</script>

<template>
  <Teleport to="body">
    <div class="modal" :class="[modalOpened && 'modal--opened']">
      <div class="modal__backdrop" @click="onClose" />
      <div class="modal__content">
        <div class="modal__header">
          <p class="modal__title">
            {{ title }}
          </p>
          <button class="modal__close-btn" @click="onClose">
            <span class="modal__close-line" />
            <span class="modal__close-line" />
          </button>
        </div>
        <div class="modal__container">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
