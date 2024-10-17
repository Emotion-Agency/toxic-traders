<script setup lang="ts">
interface IProps {
  modalOpened: boolean
  title?: string
  className?: string
}

const props = defineProps<IProps>()

const $modal = ref<HTMLElement | null>(null)
const $modalContainer = ref<HTMLElement | null>(null)
const $modalFocusGuard = ref<HTMLElement | null>(null)

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}

let lastActiveElement

watch(
  () => props.modalOpened,
  value => {
    if (!import.meta.client) {
      return
    }

    if (value) {
      lastActiveElement = document?.activeElement as HTMLElement
      setTimeout(() => {
        $modalFocusGuard.value?.focus()

        document.querySelector('#__nuxt')?.setAttribute('aria-hidden', 'true')
      }, 300)
    } else {
      document.querySelector('#__nuxt')?.removeAttribute('aria-hidden')
      setTimeout(() => {
        lastActiveElement?.focus()
      }, 300)
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <div
      ref="$modal"
      class="modal"
      :class="[modalOpened && 'modal--opened', className]"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
    >
      <button
        ref="$modalFocusGuard"
        class="modal-focus-guard"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          opacity: 0;
        "
      ></button>
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
