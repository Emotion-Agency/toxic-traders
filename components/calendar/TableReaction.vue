<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'
import { getOHLCSymbolsData } from '~/utils/api/ohlc/symbolsData'

interface IProps {
  event: ITableCalendarEvent
}

const props = defineProps<IProps>()

const maxChange = ref<number>(0)
const isLoading = ref<boolean>(false)

const getReaction = async () => {
  const { firstSymbol } = props.event

  const oneMinute = 60 * 1000
  const thirtyMinutes = 30 * oneMinute

  const previousCandleTime = new Date(props.event.time).getTime() - oneMinute

  if (!firstSymbol) {
    return
  }

  try {
    isLoading.value = true
    const reactionCandles = await getOHLCSymbolsData(
      formatDateWithTimeDdMmYyyy(previousCandleTime),
      formatDateWithTimeDdMmYyyy(
        previousCandleTime + thirtyMinutes + oneMinute
      ),
      firstSymbol?.ohlcSymbol?.symbol
    )

    if (!reactionCandles?.length) {
      return
    }

    const firstCandle = reactionCandles[0]

    const firstCandleClosePrice = firstCandle.closePrice

    const ThirtyMinutesCandles = reactionCandles.slice(1)

    maxChange.value = ThirtyMinutesCandles.reduce((acc, candle) => {
      const change = Math.abs(candle.closePrice - firstCandleClosePrice)
      return change > acc ? change : acc
    }, 0)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const onClick = async () => {
  await getReaction()
}
</script>

<template>
  <button @click.stop.prevent="onClick" class="calendar-table__reaction">
    <span v-if="maxChange > 0">+</span>
    <span v-if="isLoading"><Spinner /></span>
    <span v-else-if="maxChange !== undefined"
      >{{ maxChange.toFixed(2) }} pips</span
    >
    <span v-else>no data</span>
  </button>
</template>
