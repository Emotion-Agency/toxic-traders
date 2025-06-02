<script setup lang="ts">
import type { IEvent } from '~/types/events/events'

const { getAllEvents } = useEvents()
const events = ref<IEvent[]>([])
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    events.value = await getAllEvents()
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="events-circles">
    <UiLoader v-if="isLoading" class="events-circles__loader" />
    <TradingTraderEventsMenuEventsDropdown
      v-else-if="events?.length"
      :events="events"
    />
    <div v-else class="events-circles__empty">
      <p class="events-circles__empty-text">No events found</p>
    </div>
  </div>
</template>
