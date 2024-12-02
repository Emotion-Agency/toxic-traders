<script lang="ts" setup>
const route = useRoute()

const { country, title } = route.query

const { events, getEventsByName, activeEvent } = useCalendarEvents()
const isLoading = ref(false)

const getEvents = async () => {
  try {
    isLoading.value = true
    await getEventsByName(title as string, country as string)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const { onSort, sortState } = useCalendarTable(events)

onMounted(async () => {
  await getEvents()

  if (events.value.length) {
    activeEvent.value = events.value.find(
      event => event.id?.toString() === route.params.id
    )

    const activeElementIdx = events.value.findIndex(
      event => event.id?.toString() === route.params.id
    )

    if (!activeElementIdx) return

    console.log(events.value, activeEvent.value)
  }
})
</script>

<template>
  <main>
    <section class="calendar">
      <div class="container calendar__wrapper">
        <h1 class="calendar__title">{{ country }} {{ title }}</h1>
        <div class="calendar__menu">
          <TheButton
            tag="nuxt-link"
            href="/settings/calendar"
            class="calendar__setings-btn"
          >
            <template #start-icon>
              <IconsSettings />
            </template>
            Calendar Settings
          </TheButton>
        </div>
      </div>
    </section>

    <NotFound
      v-if="!events.length && !isLoading"
      message="Oops! No events found"
    />

    <section v-else-if="events.length && !isLoading" class="calendar-content">
      <div class="calendar-table-wrapper">
        <CalendarTable
          :sort-state="sortState"
          :events="events"
          @sort="onSort"
        />
      </div>
    </section>
    <UiLoader v-else="isLoading" />
  </main>
</template>
