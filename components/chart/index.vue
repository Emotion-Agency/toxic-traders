<script lang="ts" setup>
import emitter from 'tiny-emitter/instance'
import type { ICandle } from '~/types/ohlc/symbols'

//http://localhost:3001/calendar/chart/82073?country=CH&title=SNB+Interest+Rate+Decision+%D0%A2

interface IProps {
  data: ICandle[]
  eventTime?: string
  timeframe: number
}

const props = defineProps<IProps>()

const { themeValue } = useAppState()

const chart = ref(null)
const $chartContainer = ref<HTMLElement | null>(null)

const {
  firstCoord,
  lastCoord,
  isDrawing,
  bars,
  percentageChange,
  priceDifference,
  startDate,
  setChartBounds,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  resetDrawing,
} = usePriceRangeTool({
  chart,
  $chartContainer: $chartContainer as Ref<HTMLElement>,
  timeframe: props.timeframe,
})

const options = computed(() => ({
  chart: {
    id: 'calendar-chart',
    background: 'transparent',
    zoom: {
      enabled: !isDrawing.value,
    },

    toolbar: {
      show: false,
      autoSelected: 'pan',
    },

    fontFamily: 'Inter, sans-serif',

    events: {
      mouseMove: handleMouseMove,
      animationEnd: () => {
        setChartBounds()
      },
      updated: () => {
        setChartBounds()
        emitter.emit('chart-updated', chart.value)
      },
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

watch(
  () => props.data,
  () => {
    resetDrawing()
  }
)

provide('parent', $chartContainer)
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

    <ChartPriceRangeTool :first-coord="firstCoord" :last-coord="lastCoord">
      <ChartTooltip
        :coords="firstCoord"
        ref="endTooltip"
        v-if="firstCoord.x && firstCoord.y"
      >
        <span>price: {{ firstCoord.yValue.toFixed(3) }}</span>
        <span>date: {{ startDate }}</span>
      </ChartTooltip>

      <ChartTooltip
        :coords="lastCoord"
        ref="endTooltip"
        v-if="lastCoord.x && lastCoord.y"
      >
        <span>price: {{ lastCoord.yValue.toFixed(3) }}</span>
        <span>delta: {{ priceDifference?.toFixed(3) }}</span>
        <span>change: {{ percentageChange?.toFixed(2) }}%</span>
        <span>bars: {{ bars }}</span>
      </ChartTooltip>
    </ChartPriceRangeTool>
  </div>
</template>
