<script lang="ts" setup>
import type { ICandle, IOHLCData } from '~/types/ohlc/symbols'
import { symbolToCandleAdapter } from '~/utils/adapters/ohls/symbolToCandleAdapter'
import { getOHLCSymbolsData } from '~/utils/api/ohlc/symbolsData'

const route = useRoute()

const { country, title } = route.query

const { events, getEventsByName, activeEvent } = useCalendarEvents()
const isLoading = ref(false)

const candles = ref<ICandle[]>([])

onMounted(async () => {
  try {
    isLoading.value = true
    await getEventsByName(title as string, country as string)

    if (events.value.length) {
      activeEvent.value = events.value.find(
        event => event.id?.toString() === route.params.id
      )
    }

    if (!activeEvent.value?.firstSymbol) {
      return
    }

    const eventReleaseDate = new Date(activeEvent.value.time).getTime()

    const minute = 60 * 1000

    // 15 minutes before the event release
    const timeBeforeRelease = 15 * minute
    // two hours after the event release
    const timeAfterRelease = 2 * 60 * minute

    const reactionCandles = await getOHLCSymbolsData(
      formatDateWithTimeDdMmYyyy(eventReleaseDate - timeBeforeRelease),
      formatDateWithTimeDdMmYyyy(eventReleaseDate + timeAfterRelease),
      activeEvent.value.firstSymbol?.ohlcSymbol?.symbol
    )

    candles.value = reactionCandles?.map(candle =>
      symbolToCandleAdapter(candle)
    )
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main style="margin-top: 120px">
    <section>
      <div class="container">
        <h1>{{ country }} {{ title }}</h1>
        <UiLoader v-if="isLoading" />
        <div v-if="candles?.length">
          <Chart :data="candles" :event-time="activeEvent.time" />
        </div>
        <NotFound
          v-if="!candles?.length && !isLoading"
          message="No data found"
        />
      </div>
    </section>
  </main>
</template>
