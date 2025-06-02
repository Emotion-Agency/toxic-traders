<script setup lang="ts">
import type { IEvent } from '~/types/events/events'

interface IProps {
  events: IEvent[]
  isLoading?: boolean
}

defineProps<IProps>()

const emit = defineEmits(['delete'])
</script>

<template>
  <div class="events-circles" :class="{ 'events-circles--loading': isLoading }">
    <UiLoader v-if="isLoading" class="events-circles__loader" />
    <TradingTraderEventsMenuEventsDropdown
      v-else-if="events?.length"
      :events="events"
      @delete="emit('delete', $event)"
    />
    <div v-else class="events-circles__empty">
      <p class="events-circles__empty-text">No events found</p>
    </div>
  </div>
</template>
