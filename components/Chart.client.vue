<script lang="ts" setup>
import ApexCharts from 'apexcharts'
import type { ICandle } from '~/types/ohlc/symbols'

interface IProps {
  data: ICandle[]
  eventTime?: string
}

const props = defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!$el.value) return
  const options = {
    series: [
      {
        data: props.data,
      },
    ],
    chart: {
      type: 'candlestick',
      height: '100%',
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

  const chart = new ApexCharts($el.value, options)
  chart.render()
})
</script>

<template>
  <div class="t-chart">
    <div ref="$el"></div>
  </div>
</template>
