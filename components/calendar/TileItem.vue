<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

interface IProps {
  events: ITableCalendarEvent[]
  initialEvent?: ITableCalendarEvent
  mainSymbol: string
}

const props = defineProps<IProps>()

const activeEvent = ref<ITableCalendarEvent | undefined>(props.initialEvent)

const changeEventHandler = (event: ITableCalendarEvent) => {
  console.log(event)
  activeEvent.value = event
}
</script>

<template>
  <CalendarEventChart
    type="tile-item"
    view="tile-window"
    :events="events"
    :show-chart="true"
    :main-symbol="mainSymbol"
    :active-event="activeEvent"
    @prev="changeEventHandler"
    @next="changeEventHandler"
  />
</template>
