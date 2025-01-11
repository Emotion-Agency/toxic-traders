<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { ICandle } from '~/types/ohlc/symbols'
import { symbolToCandleAdapter } from '~/utils/adapters/ohls/symbolToCandleAdapter'
import { getOHLCSymbolsData } from '~/utils/api/ohlc/symbolsData'

interface IProps {
  events: ITableCalendarEvent[]
  activeEvent?: ITableCalendarEvent
  type?: 'main' | 'tile-item'
  view: 'main' | 'tile-window'
  showChart: boolean
  mainSymbol: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'main',
})

const emit = defineEmits(['prev', 'next', 'change-view', 'change-symbol'])

const route = useRoute()

const { country, title } = route.query

const isLoading = ref(true)

const candles = ref<ICandle[]>([])

const selectedSymbol = ref(props.mainSymbol)

watch(
  () => props.mainSymbol,
  () => {
    selectedSymbol.value = props.mainSymbol
    nextTick(() => {
      getChartData()
    })
  }
)

const selectedSymbolDigits = computed(() => {
  return props.activeEvent.symbols?.find(
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

watchDeep(
  () => props.activeEvent,
  () => {
    selectedSymbol.value = props.activeEvent?.firstSymbol?.ohlcSymbol?.symbol

    nextTick(() => {
      getChartData()
    })
  }
)

const { getCountryFlag } = useCountries()

const getChartData = async () => {
  try {
    isLoading.value = true

    if (!selectedSymbol.value) {
      return
    }

    const eventReleaseTimestamp = new Date(props.activeEvent?.time).getTime()

    const minute = 60 * 1000

    // 15 minutes before the event release
    const timeBeforeRelease = 15 * minute
    // two hours after the event release
    const timeAfterRelease = 2 * 60 * minute

    const reactionCandles = await getOHLCSymbolsData(
      formatDateWithCustomDST(eventReleaseTimestamp - timeBeforeRelease),
      formatDateWithCustomDST(eventReleaseTimestamp + timeAfterRelease),
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
  if (props.events.length) {
    nextTick(() => {
      getChartData()
    })
  }

  document.body.addEventListener('keydown', toolsKeyHandler)
})

const prevEvent = computed(() => {
  return props.events[props.events.indexOf(props.activeEvent) - 1]
})

const nextEvent = computed(() => {
  return props.events[props.events.indexOf(props.activeEvent) + 1]
})

const prevHandler = () => {
  if (prevEvent.value) {
    emit('prev', prevEvent.value)
  }
}

const nextHandler = () => {
  if (nextEvent.value) {
    emit('next', nextEvent.value)
  }
}

const onSelect = () => {
  nextTick(() => {
    emit('change-symbol', selectedSymbol.value)
    getChartData()
  })
}

onBeforeUnmount(() => {
  document.body.removeEventListener('keydown', toolsKeyHandler)
})
</script>

<template>
  <section
    class="calendar-chart"
    :class="{
      'calendar-chart--tile-item': props.type === 'tile-item',
      'calendar-chart--chart-hidden': !props.showChart,
    }"
  >
    <UiLoader v-if="isLoading" class="calendar-chart__loader" />
    <div v-if="activeEvent" class="calendar-chart__content">
      <nav class="calendar-chart__nav">
        <div class="container calendar-chart__container">
          <div>
            <button
              v-if="prevEvent?.time"
              class="calendar-chart__prev"
              @click="prevHandler"
              :title="
                prevEvent?.time ? formatDateWithTime(prevEvent?.time) : ''
              "
            >
              <i><IconsChevronLeft /></i>
              {{ prevEvent?.time ? formatDate(prevEvent?.time) : '' }}
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
            <span class="calendar-chart__date">{{
              formatDateWithTime(activeEvent.time)
            }}</span>
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
              :title="
                nextEvent?.time ? formatDateWithTime(nextEvent?.time) : ''
              "
            >
              {{ nextEvent?.time ? formatDate(nextEvent?.time) : '' }}
              <i><IconsChevronRight /></i>
            </button>
          </div>
        </div>
      </nav>
      <div class="calendar-chart__second-nav">
        <div class="container calendar-chart__container">
          <div class="calendar-chart__second-nav-left">
            <InputSelect
              v-if="props.showChart"
              v-slot="{ renderedItems }"
              :options="
                activeEvent.symbols?.map(symbol => symbol?.ohlcSymbol?.symbol)
              "
              :value="selectedSymbol"
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
              v-if="props.showChart"
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

            <div v-if="props.showChart" class="tools">
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

          <template v-if="type !== 'tile-item'">
            <TheButton
              v-if="view === 'main'"
              button-size="small"
              @click="emit('change-view', 'tile-window')"
            >
              Tile windows
              <template #end-icon>
                <IconsTile />
              </template>
            </TheButton>
            <TheButton
              v-else
              button-size="small"
              @click="emit('change-view', 'main')"
            >
              One chart
              <template #end-icon>
                <IconsWindow />
              </template>
            </TheButton>
          </template>
        </div>
      </div>
      <div v-if="showChart" class="container calendar-chart__chart-container">
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
    <NotFound v-if="!activeEvent && !isLoading" message="Event not found" />
  </section>
</template>
