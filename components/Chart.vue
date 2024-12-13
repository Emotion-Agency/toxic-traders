<script lang="ts" setup>
import type { ICandle } from '~/types/ohlc/symbols'

interface IProps {
  data: ICandle[]
  eventTime?: string
  timeframe: number
}

const props = defineProps<IProps>()

const { themeValue } = useAppState()

let isDrawing = false

const firstCoord = ref({ x: 0, y: 0 })
const lastCoord = ref({ x: 0, y: 0 })

const $chartContainer = ref<HTMLElement>(null)
const chart = ref(null)

const series = ref([
  {
    type: 'candlestick',
    data: props.data,
  },
  {
    type: 'line',
    name: 'trendline',
    data: [],
  },
])

watch(
  () => props.data,
  () => {
    series.value[0].data = props.data
  }
)

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

  return { x: xValue, y: yValue.toFixed(3) }
}

const updateSeries = () => {
  series.value[1].data = [
    {
      x: firstCoord.value.x,
      y: firstCoord.value.y,
    },
    {
      x: lastCoord.value.x,
      y: lastCoord.value.y,
    },
  ]
}

const throttleUpdateSeries = useThrottleFn(updateSeries, 500)

const drawLine = () => {
  if (!firstCoord.value || !lastCoord.value) return
  ch.value.clearAnnotations()

  ch.value.addPointAnnotation({
    x: firstCoord.value.x,
    y: firstCoord.value.y,
    label: {
      text: 'Price: ' + firstCoord.value.y,
    },
  })

  const priceDifference = lastCoord.value.y - firstCoord.value.y

  const percentageChange = (
    (priceDifference / firstCoord.value.y) *
    100
  ).toFixed(2)

  const bars = Math.round(
    Math.abs(lastCoord.value.x - firstCoord.value.x) / 60000 / props.timeframe
  )

  ch.value.addPointAnnotation({
    x: lastCoord.value.x,
    y: lastCoord.value.y,
    label: {
      text: `Δ: ${priceDifference.toFixed(3)}, Bars: ${bars}, %: ${percentageChange}, Price: ${lastCoord.value.y}`,
      textAnchor: 'end',
    },
  })

  // throttleUpdateSeries()
}

function handleMouseDown(event: MouseEvent) {
  isDrawing = true

  lastCoord.value = { x: 0, y: 0 }

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

// const series = computed(() => {
//   if (
//     !firstCoord.value.x ||
//     !lastCoord.value.x ||
//     !lastCoord.value.x ||
//     !lastCoord.value.y
//   )
//     return [
//       {
//         type: 'candlestick',
//         data: props.data,
//       },
//     ]

//   return [
//     {
//       type: 'candlestick',
//       data: props.data,
//     },
//     {
//       type: 'line',
//       name: 'trendline',
//       data: [
//         {
//           x: firstCoord.value.x,
//           y: firstCoord.value.y,
//         },
//         {
//           x: lastCoord.value.x,
//           y: lastCoord.value.y,
//         },
//       ],
//     },
//   ]
// })
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

    <svg ref="svgOverlay" class="svg-overlay">
      <line
        v-if="firstCoord && lastCoord"
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
