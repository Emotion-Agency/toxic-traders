<script lang="ts" setup>
import emitter from 'tiny-emitter/instance'

import { resize } from '@emotionagency/utils'
import { candlesSelector } from './constants'
import moment from 'moment-timezone'

interface IProps {
  firstCoord: { x: number; y: number; xValue: number; yValue: number }
  lastCoord: { x: number; y: number; xValue: number; yValue: number }
}

const props = defineProps<IProps>()

const parent = inject('parent') as Ref<HTMLElement>

const coords = ref<{
  top: string
  left: string
  width: string
  height: string
}>({
  top: '0',
  left: '0',
  width: '0',
  height: '0',
})

const $prt = ref<HTMLElement | null>(null)

const updateCoords = () => {
  if (!parent.value) {
    return
  }
  const $candles = parent.value?.querySelector(candlesSelector)

  if (!$candles) {
    return
  }

  const innerRect = $candles.getBoundingClientRect()

  const containerRect = $prt.value?.getBoundingClientRect()

  const top = innerRect.top - containerRect.top
  const left = innerRect.left - containerRect.left

  coords.value = {
    top: top + 'px',
    left: left + 'px',
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

const offset = ref({ x: 0, y: 0 })

const updateOffset = () => {
  if (!parent.value) {
    return
  }

  const $candles = parent.value?.querySelector(candlesSelector)

  const containerRect = parent.value?.getBoundingClientRect()
  const innerRect = $candles?.getBoundingClientRect()

  offset.value = {
    x: innerRect?.left - containerRect?.left,
    y: innerRect?.top - containerRect?.top,
  }
}

const onUpdate = () => {
  updateCoords()
  updateOffset()
}

onMounted(() => {
  nextTick(initPriceRangeTool)
  emitter.on('chart-updated', onUpdate)
})

onBeforeUnmount(() => {
  resize.off(updateCoords)
  emitter.off('chart-updated', onUpdate)
})

const helperLines = computed(() => {
  const { firstCoord, lastCoord } = props

  return [
    {
      x1: firstCoord.x,
      y1: 0,
      x2: firstCoord.x,
      y2: parseInt(coords.value.height),
      isActive: !!firstCoord.x,
    },
    {
      x1: lastCoord.x,
      y1: 0,
      x2: lastCoord.x,
      y2: parseInt(coords.value.height),
      isActive: !!lastCoord.x,
    },
    {
      x1: 0,
      y1: firstCoord.y,
      x2: parseInt(coords.value.width),
      y2: firstCoord.y,
      isActive: !!firstCoord.y,
    },
    {
      x1: 0,
      y1: lastCoord.y,
      x2: parseInt(coords.value.width),
      y2: lastCoord.y,
      isActive: !!lastCoord.y,
    },
  ]
})

const helperValues = computed(() => {
  return [
    {
      x: 0,
      y: props.firstCoord.y + 'px',
      value: props.firstCoord.yValue.toFixed(3),
      axis: 'y',
    },
    {
      x: 0,
      y: props.lastCoord.y + 'px',
      value: props.lastCoord.yValue.toFixed(3),
      axis: 'y',
    },
    {
      x: props.firstCoord.x + 'px',
      y: coords.value.height,
      value: moment(props.firstCoord.xValue).format('DD.MM.YYYY HH:mm:ss'),
      axis: 'x',
    },
    {
      x: props.lastCoord.x + 'px',
      y: coords.value.height,
      value: moment(props.lastCoord.xValue).format('DD.MM.YYYY HH:mm:ss'),
      axis: 'x',
    },
  ]
})
</script>

<template>
  <div ref="$prt" class="prt">
    <svg class="prt-svg-overlay" :style="coords">
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
      <g v-for="(line, idx) in helperLines" v-show="line?.isActive">
        <line
          :key="idx"
          :x1="line.x1"
          :x2="line.x2"
          :y1="line.y1"
          :y2="line.y2"
          stroke="var(--primary-default)"
          stroke-width="1"
          stroke-dasharray="5"
        />
      </g>

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
    <div
      v-for="(item, idx) in helperValues"
      :key="idx"
      class="prt-helper-value"
      :class="`prt-helper-value--${item.axis}`"
      :style="{ left: item.x, top: item.y }"
    >
      {{ item.value }}
    </div>

    <!-- <ChartTooltip
      :coords="{ x: 0 + offset.x, y: firstCoord.y + offset.y }"
      v-if="firstCoord.y"
    >
      {{ firstCoord.yValue.toFixed(3) }}
    </ChartTooltip>
    <ChartTooltip
      :coords="{ x: 0 + offset.x, y: lastCoord.y + offset.y }"
      v-if="firstCoord.y"
    >
      {{ lastCoord.yValue.toFixed(3) }}
    </ChartTooltip>
    <ChartTooltip
      :coords="{
        x: firstCoord.x + offset.x,
        y: parseInt(coords.height) + offset.y,
      }"
      v-if="firstCoord.x"
    >
      {{ moment(firstCoord.xValue).format('DD.MM.YYYY HH:MM:SS') }}
    </ChartTooltip>
    <ChartTooltip
      :coords="{
        x: lastCoord.x + offset.x,
        y: parseInt(coords.height) + offset.y,
      }"
      v-if="lastCoord.x"
    >
      {{ moment(lastCoord.xValue).format('DD.MM.YYYY HH:MM:SS') }}
    </ChartTooltip> -->
  </div>
</template>
