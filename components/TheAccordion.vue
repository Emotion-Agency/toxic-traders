<script setup lang="ts">
import { resize } from '@emotionagency/utils'

interface iProps {
  title: string
  additionalButton: string
}

defineProps<iProps>()

const isOpened = ref(false)
const emit = defineEmits(['open'])

const $el = ref<HTMLElement | null>(null)

const calcHeight = () => {
  const height = $el.value.scrollHeight

  $el.value.style.setProperty('--h', `${height}px`)
}

const toggleClick = () => {
  isOpened.value = !isOpened.value
  resize.on(calcHeight)
}

onMounted(() => {
  resize.on(calcHeight)
})

useOnBeforeUnmountDelay(() => {
  resize.off(calcHeight)
})
</script>

<template>
  <div class="accordion" :class="isOpened && 'accordion--opened'">
    <div class="accordion__wrapper">
      <div class="accordion__header">
        <button class="accordion__btn accordion__main-btn" @click="toggleClick">
          {{ title }}
          <IconsSelectionArrowDown />
        </button>
        <button
          class="accordion__btn accordion__additional-btn"
          @click="emit('open')"
        >
          {{ additionalButton }}
        </button>
      </div>
      <div ref="$el" class="accordion__content-wrapper">
        <div class="accordion__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
