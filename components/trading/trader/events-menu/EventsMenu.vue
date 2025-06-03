<script setup lang="ts">
import type { IEvent } from '~/types/events/events'

const { getAllEvents, createEvent, deleteEvent } = useEvents()

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

const handleDeleteEvent = async () => {
  await deleteEvent(selectedEvent.value?.id)
  await fetchAllEvents()
  deleteModalOpened.value = false
}

const deleteModalOpened = ref(false)
const selectedEvent = ref<IEvent | null>(null)

const handleDeleteModalClose = () => {
  deleteModalOpened.value = false
}

const handleDeleteModalOpen = async (event: IEvent) => {
  deleteModalOpened.value = true
  selectedEvent.value = event
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
        @delete="handleDeleteModalOpen"
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
        <TradingTraderEventsMenuTerminalsSteps />
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
    <DeleteModal
      :modal-opened="deleteModalOpened"
      text="Are you sure you want to delete this event? This action cannot be prevented"
      @close="handleDeleteModalClose"
      @delete="handleDeleteEvent"
      :is-loading="eventsIsLoading"
    />
  </div>
</template>
