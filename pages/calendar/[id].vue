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

onMounted(async () => {
  await getEvents()

  if (events.value.length) {
    activeEvent.value = events.value.find(event => event.id === route.params.id)
  }
})

const {
  currentPage,
  itemsCount,
  totalCountPages,
  searchValue,
  nextPageClick,
  prevPageClick,
  onChangeCount,
  onInputBlur,
  onInputChange,
  onSort,
  paginatedEvents,
  sortState,
} = useCalendarTable(events)
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
          :events="paginatedEvents"
          @sort="onSort"
        />
        <ThePagination
          v-if="totalCountPages / paginatedEvents?.length > 1"
          class="calendar-table__pagination"
          input-id="calendar-table-pagination"
          input-name="calendar-table-pagination"
          :total-pages="totalCountPages"
          :current-page="currentPage"
          :options="['25', '50', '100']"
          :items-count="itemsCount"
          :input-value="searchValue"
          @next-click="nextPageClick"
          @prev-click="prevPageClick"
          @selected-item="onChangeCount"
          @on-blur-value="onInputBlur"
          @on-change-value="onInputChange"
        >
        </ThePagination>
      </div>
    </section>
    <UiLoader v-else="isLoading" />
  </main>
</template>
