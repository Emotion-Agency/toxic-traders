<script lang="ts" setup>
import type { ICandle } from '~/types/ohlc/symbols'

interface IProps {
  data: ICandle[]
  eventTime?: string
}

const props = defineProps<IProps>()

const { themeValue } = useAppState()

function handleMouseDown(event, chartContext) {
  console.log('down')
}

function handleMouseMove(event, chartContext) {
  console.log('move', event, chartContext)
}

function handleMouseUp(event, chartContext) {
  console.log('up')
}

function handleMouseLeave() {
  console.log('leave')
}

const options = computed(() => ({
  chart: {
    id: 'calendar-chart',
    background: 'transparent',
    toolbar: {
      show: false,
    },

    fontFamily: 'Inter, sans-serif',

    events: {
      mouseMove: (event, chartContext) => handleMouseMove(event, chartContext),
      mouseLeave: handleMouseLeave,
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
  },

  theme: {
    mode: themeValue.value,
  },
}))
</script>

<template>
  <div class="t-chart">
    <VueApexCharts
      :series="[
        {
          data: props.data,
        },
      ]"
      height="100%"
      type="candlestick"
      :options="options"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    />
  </div>
</template>
