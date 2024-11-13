<script setup lang="ts">
import { createFocusTrap, type FocusTrap } from 'focus-trap'
import { keysGenerator } from '@emotionagency/utils'

interface IProps {
  isOpen: boolean
  duration?: number
  transitionName?: string
}

const props = withDefaults(defineProps<IProps>(), {
  duration: 0.3,
  transitionName: 'fade',
})

const emit = defineEmits(['close'])

const isActualOpen = ref(props.isOpen)

const dialogId = `dialog-${useId()}`
const $el = ref<HTMLElement | null>(null)

const $window = ref<HTMLElement | null>(null)
const trap = ref<FocusTrap | null>(null)
const $modalFocusGuard = ref<HTMLElement | null>(null)

const registerWindow = ($el: Ref<HTMLElement>) => {
  if (!$el.value) {
    throw new Error('Dialog window not found')
  }
  $window.value = $el.value
}

provide('registerWindow', registerWindow)
provide('dialogId', dialogId)

onMounted(() => {
  trap.value = createFocusTrap($el.value as HTMLElement)
})

watch(
  () => props.isOpen,
  value => {
    if (!import.meta.client) {
      return
    }

    if (value) {
      setTimeout(() => {
        trap.value?.activate()
      }, 0)
    } else {
      trap.value?.deactivate()
    }
  }
)

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) {
      isActualOpen.value = props.isOpen
    } else {
      setTimeout(() => {
        isActualOpen.value = props.isOpen
      }, props.duration * 1000)
    }

    setTimeout(() => {
      $window.value?.classList.toggle('is-open', props.isOpen)
    }, 1)
  }
)
</script>

<template>
  <Transition :name="transitionName">
    <div
      v-show="isActualOpen"
      :data-open="isOpen"
      ref="$el"
      role="dialog"
      :aria-modal="true"
      :aria-labelledby="dialogId"
      @keydown.esc="emit('close')"
      v-bind="$attrs"
    >
      <button
        ref="$modalFocusGuard"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          opacity: 0;
        "
      ></button>

      <slot />
    </div>
  </Transition>
</template>
