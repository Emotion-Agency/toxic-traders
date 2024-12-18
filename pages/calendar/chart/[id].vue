<script lang="ts" setup>
import type { ICandle } from '~/types/ohlc/symbols'
import { symbolToCandleAdapter } from '~/utils/adapters/ohls/symbolToCandleAdapter'
import { getOHLCSymbolsData } from '~/utils/api/ohlc/symbolsData'
import { serverTimezone } from '~/utils/constants/timezones'

const route = useRoute()

const { country, title } = route.query

const { events, getEventsByExactName, activeEvent } = useCalendarEvents()
const isLoading = ref(false)

const candles = ref<ICandle[]>([])

const selectedSymbol = ref(activeEvent.value?.firstSymbol?.ohlcSymbol?.symbol)

const selectedSymbolDigits = computed(() => {
  return activeEvent.value.symbols?.find(
    symbol => symbol.ohlcSymbol.symbol === selectedSymbol.value
  )?.ohlcSymbol.digits
})

type TTimeframe = '1m' | '5m' | '15m'

const selectedTimeframe = ref<TTimeframe>('1m')

const filteredCandleByTimeframe = computed(() => {
  if (selectedTimeframe.value === '1m') {
    return candles.value
  }

  if (selectedTimeframe.value === '5m') {
    return candles.value.filter((_, idx) => idx % 5 === 0)
  }

  if (selectedTimeframe.value === '15m') {
    return candles.value.filter((_, idx) => idx % 15 === 0)
  }
})

watchDeep(activeEvent, () => {
  selectedSymbol.value = activeEvent.value?.firstSymbol?.ohlcSymbol?.symbol
})

const { getCountryFlag } = useCountries()

const getChartData = async () => {
  try {
    isLoading.value = true

    if (!selectedSymbol.value) {
      return
    }

    const eventReleaseTimestamp = new Date(activeEvent.value?.time).getTime()

    // console.log(new Date(activeEvent.value?.time).isDstObserved())

    const minute = 60 * 1000

    // 15 minutes before the event release
    const timeBeforeRelease = 15 * minute
    // two hours after the event release
    const timeAfterRelease = 2 * 60 * minute

    // console.log(
    //   activeEvent.value?.time,
    //   ajustForMarchShift(eventReleaseTimestamp, serverTimezone),
    //   formatDateWithTimeDdMmYyyy(eventReleaseTimestamp - timeBeforeRelease),
    //   formatDateWithTimeDdMmYyyy(eventReleaseTimestamp + timeAfterRelease)
    // )

    const reactionCandles = await getOHLCSymbolsData(
      formatDateWithTimeDdMmYyyy(eventReleaseTimestamp - timeBeforeRelease),
      formatDateWithTimeDdMmYyyy(eventReleaseTimestamp + timeAfterRelease),
      selectedSymbol.value
    )

    candles.value = reactionCandles?.map(candle =>
      symbolToCandleAdapter(candle)
    )
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const { tools, toolsHandler, toolsKeyHandler } = useChartTools()

onMounted(async () => {
  isLoading.value = true

  await getEventsByExactName(title as string, country as string)

  isLoading.value = false

  if (events.value.length) {
    activeEvent.value = events.value.find(
      event => event.id?.toString() === route.params.id
    )

    nextTick(() => {
      getChartData()
    })
  }

  document.addEventListener('keydown', toolsKeyHandler)
})

const router = useRouter()

const prevEvent = computed(() => {
  return events.value[events.value.indexOf(activeEvent.value) - 1]
})

const nextEvent = computed(() => {
  return events.value[events.value.indexOf(activeEvent.value) + 1]
})

const prevHandler = () => {
  if (prevEvent.value) {
    router.push({
      path: `/calendar/chart/${prevEvent.value.id}`,
      query: { country: prevEvent.value.country, title: prevEvent.value.event },
    })
  }
}

const nextHandler = () => {
  if (nextEvent.value) {
    router.push({
      path: `/calendar/chart/${nextEvent.value.id}`,
      query: { country: nextEvent.value.country, title: nextEvent.value.event },
    })
  }
}

const onSelect = () => {
  nextTick(() => {
    getChartData()
  })
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', toolsKeyHandler)
})
</script>

<template>
  <main>
    <section class="calendar-chart">
      <UiLoader v-if="isLoading" />
      <div v-if="activeEvent" class="calendar-chart__content">
        <nav class="calendar-chart__nav">
          <div class="container calendar-chart__container">
            <div>
              <button
                v-if="prevEvent?.time"
                class="calendar-chart__prev"
                @click="prevHandler"
              >
                <i><IconsChevronLeft /></i>
                {{ prevEvent?.time ? formatDateWithTime(prevEvent?.time) : '' }}
              </button>
            </div>
            <div class="calendar-chart__nav-content">
              <h1 class="calendar-chart__title">
                <span>
                  <img
                    v-if="getCountryFlag(activeEvent.country)?.url"
                    class="calendar-chart__flag"
                    :src="getCountryFlag(activeEvent.country)?.url"
                    :alt="getCountryFlag(activeEvent.country).alt"
                  />
                </span>
                {{ country }} {{ title }}
              </h1>
              <time class="calendar-chart__date">{{
                formatDateWithTime(activeEvent.time)
              }}</time>
              <CalendarImpact
                class="calendar-chart__impact"
                :impact="(Number(activeEvent.importance) + 1) as 1 | 2 | 3"
              />

              <CalendarChartItem
                title="Actual:"
                :number="{
                  number: activeEvent.actual,
                  variant: getEventNumberVariant(
                    activeEvent.dev,
                    activeEvent?.firstSymbol?.tradeDirection
                  ),
                  unit: activeEvent.unit,
                  scale: activeEvent.scale,
                }"
              />
              <CalendarChartItem
                title="Forecast:"
                :number="{
                  number: activeEvent.forecast,
                  unit: activeEvent.unit,
                  scale: activeEvent.scale,
                }"
              />
              <CalendarChartItem
                title="Previous:"
                :number="{
                  number: activeEvent.previous,
                  unit: activeEvent.unit,
                  scale: activeEvent.scale,
                }"
              />
              <CalendarChartItem
                title="Dev:"
                :number="{
                  number: activeEvent.dev,
                  unit: activeEvent.unit,
                  scale: activeEvent.scale,
                  variant: getEventNumberVariant(
                    activeEvent.dev,
                    activeEvent?.firstSymbol?.tradeDirection
                  ),
                }"
              />
            </div>
            <div>
              <button
                v-if="nextEvent?.time"
                class="calendar-chart__next"
                @click="nextHandler"
              >
                {{ nextEvent?.time ? formatDateWithTime(nextEvent?.time) : '' }}
                <i><IconsChevronRight /></i>
              </button>
            </div>
          </div>
        </nav>
        <div class="calendar-chart__second-nav">
          <div class="container calendar-chart__container">
            <div class="calendar-chart__second-nav-left">
              <InputSelect
                v-slot="{ renderedItems }"
                :options="
                  activeEvent.symbols?.map(symbol => symbol?.ohlcSymbol?.symbol)
                "
                :value="activeEvent?.firstSymbol?.ohlcSymbol?.symbol"
                placeholder="Select symbol"
                @select="onSelect"
              >
                <InputSelectOption
                  v-for="(option, idx) in renderedItems"
                  :index="idx"
                  :key="idx"
                  :value="option"
                  :option="option"
                  @select="selectedSymbol = option"
                />
              </InputSelect>

              <InputSelect
                v-slot="{ renderedItems }"
                :options="['1m', '5m', '15m']"
                :value="selectedTimeframe"
                placeholder="Select timeframe"
              >
                <InputSelectOption
                  v-for="(option, idx) in renderedItems"
                  :index="idx"
                  :key="idx"
                  :value="option"
                  :option="option"
                  @select="selectedTimeframe = option"
                />
              </InputSelect>

              <div class="tools">
                <HeadlessTooltip v-for="tool in tools" :key="tool.title">
                  <template #trigger>
                    <button
                      :aria-label="tool.title"
                      class="tool"
                      :class="{ 'tool--active': tool.active }"
                      @click="toolsHandler(tool.title)"
                    >
                      <component :is="tool.icon"></component>
                    </button>
                  </template>
                  <span>{{ tool.title }} ({{ tool.triggerBtn }})</span>
                </HeadlessTooltip>
              </div>
            </div>

            <TheButton button-size="small">
              View
              <template #end-icon>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.125 9.75C7.125 10.0484 7.00647 10.3345 6.7955 10.5455C6.58452 10.7565 6.29837 10.875 6 10.875C5.70163 10.875 5.41548 10.7565 5.2045 10.5455C4.99353 10.3345 4.875 10.0484 4.875 9.75C4.875 9.45163 4.99353 9.16548 5.2045 8.9545C5.41548 8.74353 5.70163 8.625 6 8.625C6.29837 8.625 6.58452 8.74353 6.7955 8.9545C7.00647 9.16548 7.125 9.45163 7.125 9.75ZM7.125 6C7.125 6.29837 7.00647 6.58452 6.7955 6.7955C6.58452 7.00647 6.29837 7.125 6 7.125C5.70163 7.125 5.41548 7.00647 5.2045 6.7955C4.99353 6.58452 4.875 6.29837 4.875 6C4.875 5.70163 4.99353 5.41548 5.2045 5.2045C5.41548 4.99353 5.70163 4.875 6 4.875C6.29837 4.875 6.58452 4.99353 6.7955 5.2045C7.00647 5.41548 7.125 5.70163 7.125 6V6ZM7.125 2.25C7.125 2.54837 7.00647 2.83452 6.7955 3.0455C6.58452 3.25647 6.29837 3.375 6 3.375C5.70163 3.375 5.41548 3.25647 5.2045 3.0455C4.99353 2.83452 4.875 2.54837 4.875 2.25C4.875 1.95163 4.99353 1.66548 5.2045 1.4545C5.41548 1.24353 5.70163 1.125 6 1.125C6.29837 1.125 6.58452 1.24353 6.7955 1.4545C7.00647 1.66548 7.125 1.95163 7.125 2.25V2.25Z"
                    fill="white"
                  />
                </svg>
              </template>
            </TheButton>
          </div>
        </div>
        <div class="container calendar-chart__chart-container">
          <Chart
            v-if="candles?.length"
            :data="filteredCandleByTimeframe"
            :event-time="activeEvent.time"
            :timeframe="parseInt(selectedTimeframe)"
            :active-tool="tools.find(tool => tool.active)?.title"
            :digits="selectedSymbolDigits"
          />
          <NotFound
            v-if="!candles?.length && !isLoading"
            message="No data found"
          />
        </div>
      </div>
    </section>
  </main>
</template>
