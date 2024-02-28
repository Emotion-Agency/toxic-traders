<script setup lang="ts">
import EmotionScroll from '@emotionagency/emotion-scroll'
import { raf } from '@emotionagency/utils'
onMounted(() => {
  window.escroll = new EmotionScroll({
    breakpoint: 1060,
    passive: false,
    friction: 0.07,
    stepSize: 0.9,
    raf,
  })
})

onBeforeUnmount(() => {
  window.escroll && window.escroll.destroy()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
