<script lang="ts" setup>
import { spawn } from 'child_process'
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
const $priceRangeTool = ref<SVGElement | null>(null)

const {
  firstCoord,
  lastCoord,
  isDrawing,
  bars,
  endDate,
  percentageChange,
  priceDifference,
  initPriceRangeTool,
  setChartBounds,
  recalcBounds,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  resetDrawing,
} = usePriceRangeTool({
  chart,
  $chartContainer: $chartContainer as Ref<HTMLElement>,
  $priceRangeTool: $priceRangeTool as Ref<SVGElement>,
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
      mounted: initPriceRangeTool,
      updated: () => {
        setChartBounds()
        recalcBounds()
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
    </svg>
    <span
      v-if="lastCoord.x && lastCoord.y"
      class="prt-value"
      style="position: absolute"
      :style="{
        top: `${lastCoord.y - 20}px`,
        left: `${lastCoord.x - 75}px`,
      }"
    >
      <span>delta: {{ priceDifference?.toFixed(3) }}</span>
      <span>change: {{ percentageChange?.toFixed(2) }}%</span>
      <span>bars: {{ bars }}</span>
      <span>date: {{ endDate }}</span>
    </span>
  </div>
</template>
