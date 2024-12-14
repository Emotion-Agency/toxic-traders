<script lang="ts" setup>
import { resize } from '@emotionagency/utils'
import type { ICandle } from '~/types/ohlc/symbols'

interface IProps {
  data: ICandle[]
  eventTime?: string
  timeframe: number
}

const props = defineProps<IProps>()

const { themeValue } = useAppState()

let isDrawing = false

const firstCoord = ref({ x: 0, xValue: 0, y: 0, yValue: 0 })
const lastCoord = ref({ x: 0, xValue: 0, y: 0, yValue: 0 })

const $chartContainer = ref<HTMLElement>(null)
const chart = ref(null)
const $priceRangeTool = ref<SVGElement>(null)

const ch = computed(() => chart.value?.chart)

function getCoordinates(event: MouseEvent) {
  const $inner = $chartContainer.value.querySelector('.apexcharts-grid-borders')
  const rect = $inner.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const xPercent = x / rect.width
  const yPercent = y / rect.height

  const xValue =
    ch.value.w.globals.minX +
    (ch.value.w.globals.maxX - ch.value.w.globals.minX) * xPercent

  const yValue =
    ch.value.w.globals.minY +
    (ch.value.w.globals.maxY - ch.value.w.globals.minY) * (1 - yPercent)

  return { x, y, xValue, yValue }
}

const initPriceRangeTool = () => {
  const svg = $priceRangeTool.value

  if (!svg) return

  const $inner = $chartContainer.value.querySelector('.apexcharts-grid-borders')
  const innerRect = $inner.getBoundingClientRect()
  const containerRect = $chartContainer.value.getBoundingClientRect()

  resize.on(() => {
    const top = innerRect.top - containerRect.top

    svg.style.width = innerRect.width + 'px'
    svg.style.height = innerRect.height + 'px'
    svg.style.top = top + 'px'
    svg.style.left = innerRect.left + 'px'
  })
}

const drawLine = () => {
  if (!firstCoord.value || !lastCoord.value) return
  ch.value.clearAnnotations()

  ch.value.addPointAnnotation({
    x: firstCoord.value.xValue,
    y: firstCoord.value.yValue,
    label: {
      text: 'Price: ' + firstCoord.value.yValue,
    },
  })

  const priceDifference = lastCoord.value.yValue - firstCoord.value.yValue

  const percentageChange = (
    (priceDifference / firstCoord.value.yValue) *
    100
  ).toFixed(2)

  const bars = Math.round(
    Math.abs(lastCoord.value.xValue - firstCoord.value.xValue) /
      60000 /
      props.timeframe
  )

  ch.value.addPointAnnotation({
    x: lastCoord.value.xValue,
    y: lastCoord.value.yValue,
    label: {
      text: `Δ: ${priceDifference.toFixed(3)}, Bars: ${bars}, %: ${percentageChange}, Price: ${lastCoord.value.yValue}`,
      textAnchor: 'end',
    },
  })
}

function handleMouseDown(event: MouseEvent) {
  isDrawing = true

  lastCoord.value = { x: 0, y: 0, xValue: 0, yValue: 0 }

  firstCoord.value = getCoordinates(event)
}

function handleMouseMove(event: MouseEvent) {
  if (!isDrawing) return

  lastCoord.value = getCoordinates(event)

  drawLine()
}

function handleMouseUp() {
  isDrawing = false
}

const options = computed(() => ({
  chart: {
    id: 'calendar-chart',
    background: 'transparent',
    toolbar: {
      show: false,
      autoSelected: 'pan',
    },

    fontFamily: 'Inter, sans-serif',

    events: {
      mouseMove: handleMouseMove,
      mouseLeave: handleMouseUp,
      mounted: initPriceRangeTool,
    },
  },
  annotations: {
    xaxis: [
      {
        x: new Date(props.eventTime).getTime(),
        borderColor: 'transparent',
        label: {
          borderColor: 'var(--primary-default)',

          style: {
            fontSize: '12px',
            color: '#fff',
            background: 'var(--primary-default)',
          },
          orientation: 'horizontal',
          offsetY: -7,
          text: 'Event release',
        },
      },
    ],
  },

  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
    // xaxis: {
    //   lines: {
    //     show: true,
    //   },
    // },
  },

  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: true,
    },
    labels: {
      datetimeUTC: false,
    },
  },
  yaxis: {
    lines: {
      show: true,
    },
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm',
    },
    enabled: true,
    shared: true,
    intersect: false,
  },

  stroke: {
    curve: 'straight',
  },
  legend: {
    show: false,
  },

  theme: {
    mode: themeValue.value,
  },
}))

const series = computed(() => {
  return [
    {
      type: 'candlestick',
      data: props.data,
    },
  ]
})
</script>

<template>
  <div ref="$chartContainer" class="t-chart" @mousedown="handleMouseDown">
    <VueApexCharts
      ref="chart"
      :series="series"
      height="100%"
      type="candlestick"
      :options="options"
      @mouseup="handleMouseUp"
    />

    <svg ref="$priceRangeTool" class="svg-overlay">
      <line
        v-if="firstCoord.x && lastCoord.x && firstCoord.y && lastCoord.y"
        :x1="firstCoord.x"
        :y1="firstCoord.y"
        :x2="lastCoord.x"
        :y2="lastCoord.y"
        stroke="red"
        stroke-width="2"
      />
    </svg>
  </div>
</template>
