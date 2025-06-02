<script setup lang="ts">
import type { IEvent } from '~/types/events/events'

const { getAllEvents, createEvent } = useEvents()

const createEventModalOpened = ref(false)
const events = ref<IEvent[]>([])
const eventsIsLoading = ref(false)

const createEventModalOpen = () => {
  createEventModalOpened.value = true
}

const createEventModalClose = () => {
  createEventModalOpened.value = false
}

const fetchAllEvents = async () => {
  try {
    eventsIsLoading.value = true
    events.value = await getAllEvents()
  } finally {
    eventsIsLoading.value = false
  }
}

const handleCreateEvent = async (val: string) => {
  await createEvent({ eventId: val })
  await fetchAllEvents()
}

onMounted(async () => {
  await fetchAllEvents()
})
</script>

<template>
  <div class="events-menu">
    <div class="events-menu__wrapper">
      <TradingTraderEventsMenuEventsCircles
        :events="events"
        :is-loading="eventsIsLoading"
      />
      <div class="events-menu__btns">
        <TheButton
          tag="button"
          button-size="small"
          variant="fill"
          class="events-menu__btn events-menu__btn--event"
          @click="createEventModalOpen"
        >
          <template #start-icon>
            <IconsPlus />
          </template>
          New event
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="outlined"
          class="events-menu__btn events-menu__btn--percent"
        >
          100%
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="outlined"
          class="events-menu__btn events-menu__btn--terminal"
        >
          <template #start-icon>
            <IconsTerminal />
          </template>
          Add terminals
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="soft"
          class="events-menu__btn events-menu__btn--settings"
        >
          Load settings
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="fill"
          class="events-menu__btn events-menu__btn--chart"
        >
          <template #start-icon>
            <IconsGraph />
          </template>
          Hide Chart
        </TheButton>
      </div>
    </div>
    <TradingTraderEventsMenuCreateEventModal
      :modal-opened="createEventModalOpened"
      @close="createEventModalClose"
      @create="handleCreateEvent"
    />
  </div>
</template>
