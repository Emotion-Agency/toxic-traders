<script setup lang="ts">
import { resize } from '@emotionagency/utils'

interface IProps {
  positionX?: 'left' | 'right' | 'center'
  positionY?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<IProps>(), {
  positionX: 'left',
  positionY: 'top',
})

const isOpen = inject('isOpen') as Ref<boolean>

const $triggerEl = inject('triggerEl') as Ref<HTMLElement | null>

const $el = ref<HTMLElement | null>(null)

const setupPosition = () => {
  const trigger = $triggerEl.value
  if (!trigger) return

  const menu = $el.value as HTMLElement

  const { positionX, positionY } = props

  const triggerRect = trigger.getBoundingClientRect()

  const top =
    positionY === 'top'
      ? triggerRect.top + triggerRect.height
      : triggerRect.bottom - triggerRect.height - menu.offsetHeight

  let left = 0
  if (positionX === 'center') {
    left = triggerRect.left + triggerRect.width / 2 - menu.offsetWidth / 2
  } else if (positionX === 'right') {
    left = triggerRect.right - menu.offsetWidth
  } else {
    left = triggerRect.left
  }

  menu.style.top = `${top}px`

  menu.style.left = `${left}px`

  menu.style.position = 'fixed'
}

onMounted(() => {
  resize.on(setupPosition)
})

onBeforeUnmount(() => {
  resize.off(setupPosition)
})

watch(
  () => isOpen.value,
  value => {
    if (value) {
      nextTick(() => {
        setupPosition()
      })
    }
  }
)
</script>

<template>
  <ul ref="$el" v-show="isOpen" role="menu">
    <slot />
  </ul>
</template>
