<script lang="ts" setup>
import moment from 'moment-timezone'
import type { ICandle } from '~/types/ohlc/symbols'

interface IProps {
  data: ICandle[]
  eventTime?: string
}

const props = defineProps<IProps>()

const { themeValue } = useAppState()

const options = computed(() => ({
  chart: {
    id: 'vuechart-example',
    background: 'transparent',
    toolbar: {
      show: false,
    },

    fontFamily: 'Inter, sans-serif',
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
    />
  </div>
</template>
