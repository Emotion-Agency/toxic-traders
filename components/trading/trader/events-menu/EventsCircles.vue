<script setup lang="ts">
import type { IEvent } from '~/types/events/events'

interface IProps {
  events: IEvent[]
  isLoading?: boolean
}

defineProps<IProps>()
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
