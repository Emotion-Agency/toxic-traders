<script setup lang="ts">
interface IProps {
  modalOpened: boolean
  title?: string
  className?: string
}

const props = defineProps<IProps>()

const emit = defineEmits(['close'])

const $modalFocusGuard = ref<HTMLElement | null>(null)

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}

const $container = ref<HTMLElement | null>(null)

watch(
  () => props.modalOpened,
  value => {
    if (!import.meta.client) {
      return
    }
    const lastActiveElement = document?.activeElement as HTMLElement
    if (value) {
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
      class="sliding-modal"
      :class="[modalOpened && 'sliding-modal--opened', className]"
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
      <div class="sliding-modal__backdrop" @click="onClose" />
      <div class="sliding-modal__content">
        <div class="sliding-modal__header">
          <p v-if="title" class="sliding-modal__title">
            {{ title }}
          </p>
          <button class="sliding-modal__close-btn" @click="onClose">
            <span class="sliding-modal__close-line" />
            <span class="sliding-modal__close-line" />
          </button>
        </div>
        <div ref="$container" class="sliding-modal__container">
          <slot />
        </div>
        <CustomScrollbar :parent="$container" />
      </div>
    </div>
  </Teleport>
</template>
