<script lang="ts" setup>
import emitter from 'tiny-emitter/instance'

import { resize } from '@emotionagency/utils'
import { candlesSelector } from './constants'

interface IProps {
  firstCoord: { x: number; y: number }
  lastCoord: { x: number; y: number }
}

defineProps<IProps>()

const $el = ref<SVGElement | null>(null)

defineExpose({
  $el,
})

const parent = inject('parent') as Ref<HTMLElement>

const coords = ref({
  top: '0',
  left: '0',
  width: '0',
  height: '0',
})

const updateCoords = () => {
  console.log(parent.value)
  if (!parent.value) {
    return
  }
  const $candles = parent.value?.querySelector(candlesSelector)

  if (!$candles) {
    return
  }

  const innerRect = $candles.getBoundingClientRect()
  const containerRect = parent.value?.getBoundingClientRect()

  const top = innerRect.top - containerRect.top

  coords.value = {
    top: top + 'px',
    left: innerRect.left + 'px',
    width: innerRect.width + 'px',
    height: innerRect.height + 'px',
  }
}

useMutationObserver(parent, updateCoords, {
  attributes: true,
})

const initPriceRangeTool = () => {
  resize.on(updateCoords)
}

onMounted(() => {
  initPriceRangeTool()
  emitter.on('chart-updated', updateCoords)
})

onBeforeUnmount(() => {
  resize.off(updateCoords)
  emitter.off('chart-updated', updateCoords)
})
</script>

<template>
  <svg ref="$el" class="svg-overlay" :style="coords">
    <circle
      v-if="firstCoord.x"
      :cx="firstCoord.x"
      :cy="firstCoord.y"
      r="3"
      fill="var(--primary-default)"
    />
    <line
      v-if="firstCoord.x && lastCoord.x && firstCoord.y && lastCoord.y"
      :x1="firstCoord.x"
      :y1="firstCoord.y"
      :x2="lastCoord.x"
      :y2="lastCoord.y"
      stroke="var(--primary-default)"
      stroke-width="2"
    />
    <circle
      v-if="lastCoord.x"
      :cx="lastCoord.x"
      :cy="lastCoord.y"
      r="3"
      fill="var(--primary-default)"
    />
    <foreignObject x="0" y="0" width="100%" height="100%">
      <slot />
    </foreignObject>
  </svg>
</template>
