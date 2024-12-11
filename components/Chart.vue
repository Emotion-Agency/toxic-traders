<script lang="ts" setup>
import type { ICandle } from '~/types/ohlc/symbols'

interface IProps {
  data: ICandle[]
  eventTime?: string
}

const props = defineProps<IProps>()

const options = {
  chart: {
    id: 'vuechart-example',
  },
  annotations: {
    xaxis: [
      {
        x: getDateTime(props.eventTime),
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            fontSize: '12px',
            color: '#fff',
            background: '#00E396',
          },
          orientation: 'horizontal',
          offsetY: 7,
          text: 'Event release',
        },
      },
    ],
  },

  xaxis: {
    type: 'category',
    lines: {
      show: true,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    lines: {
      show: true,
    },
  },
  tooltip: {
    enabled: true,
  },
}
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
