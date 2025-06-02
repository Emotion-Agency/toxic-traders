<script setup lang="ts">
import type { IEvent } from '~/types/events/events'

const { getAllEvents } = useEvents()
const events = ref<IEvent[]>([])

onMounted(async () => {
  events.value = await getAllEvents()
})
</script>

<template>
  <div class="events-circles">
    <TradingTraderEventsMenuEventsDropdown :events="events" />
  </div>
</template>
