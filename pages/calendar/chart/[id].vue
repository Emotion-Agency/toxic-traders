<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

const { events, getEventsByExactName, activeEvent } = useCalendarEvents()

const isLoading = ref(true)

const route = useRoute()

const { country, title } = route.query

onMounted(async () => {
  isLoading.value = true

  await getEventsByExactName(title as string, country as string)

  isLoading.value = false

  if (events.value.length) {
    activeEvent.value = events.value.find(
      event => event.id?.toString() === route.params.id
    )
  }
})

const router = useRouter()

const changeEventHandler = (event: ITableCalendarEvent) => {
  activeEvent.value = event

  history.pushState(
    {},
    '',
    `/calendar/chart/${event.id}?country=${event.country}&title=${event.event}`
  )

  // router.push({
  //   path: `/calendar/chart/${event.id}`,
  //   query: { country: event.country, title: event.event },
  // })
}

const view = ref<'main' | 'tile-window'>('main')

const mainSymbol = reactiveComputed(() => ({
  value: activeEvent.value?.firstSymbol?.ohlcSymbol?.symbol,
}))

const getSecondarySymbols = (idx: number) => {
  return activeEvent.value.symbols?.find((_, i) => i === idx)?.ohlcSymbol
    ?.symbol
}
</script>

<template>
  <main>
    <UiLoader v-if="isLoading" />
    <div v-else>
      <div>
        <CalendarEventChart
          :show-chart="view === 'main'"
          :events="events"
          :active-event="activeEvent"
          :view="view"
          :main-symbol="mainSymbol.value"
          @prev="changeEventHandler"
          @next="changeEventHandler"
          @change-symbol="mainSymbol.value = $event"
          @change-view="view = $event"
        />
        <div v-if="view === 'tile-window'" class="tile-windows">
          <CalendarTileItem
            v-for="item in 4"
            :key="item"
            :main-symbol="getSecondarySymbols(item - 1)"
            :events="events"
            :initial-event="activeEvent"
          />
        </div>
      </div>
    </div>
  </main>
</template>
