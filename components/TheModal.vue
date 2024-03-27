<script setup lang="ts">
import { resize } from '@emotionagency/utils'

interface IProps {
  modalOpened: boolean
  title?: string
  className?: string
}

const props = defineProps<IProps>()

const $modal = ref<HTMLElement | null>(null)
const isFullHeight = ref(false)

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}

const detectModalContentHeight = () => {
  const $modalContent = $modal.value.querySelector(
    '.modal__content'
  ) as HTMLElement

  const wh = window.innerHeight
  const modalContentHeight = $modalContent.scrollHeight

  isFullHeight.value = modalContentHeight <= wh
  console.log(wh, modalContentHeight)
}

watch(
  () => props.modalOpened,
  () => {
    detectModalContentHeight()
  }
)

onMounted(() => {
  resize.on(detectModalContentHeight)
})

onBeforeUnmount(() => {
  resize.off(detectModalContentHeight)
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="$modal"
      class="modal"
      :class="[modalOpened && 'modal--opened', className]"
    >
      <div class="modal__backdrop" @click="onClose" />
      <div
        class="modal__content"
        :class="!isFullHeight && 'modal__content--full-height'"
      >
        <div class="modal__header">
          <p v-if="title" class="modal__title">
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
