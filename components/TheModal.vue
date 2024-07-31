<script setup lang="ts">
interface IProps {
  modalOpened: boolean
  title?: string
  className?: string
}

defineProps<IProps>()

const $modal = ref<HTMLElement | null>(null)
const $modalContainer = ref<HTMLElement | null>(null)

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}
</script>

<template>
  <Teleport to="body">
    <div
      ref="$modal"
      class="modal"
      :class="[modalOpened && 'modal--opened', className]"
    >
      <div class="modal__backdrop" @click="onClose" />
      <div class="modal__content">
        <div class="modal__header">
          <p v-if="title" class="modal__title">
            {{ title }}
          </p>
          <button class="modal__close-btn" @click="onClose">
            <span class="modal__close-line" />
            <span class="modal__close-line" />
          </button>
        </div>
        <div ref="$modalContainer" class="modal__container">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
