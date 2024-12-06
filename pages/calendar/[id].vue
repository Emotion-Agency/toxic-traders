<script lang="ts" setup>
const route = useRoute()

const { country, title } = route.query

const { events, getEventsByName, activeEvent, totalCount } = useCalendarEvents()
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
  sortState,
  paginatedEvents,
} = useCalendarTable(events, totalCount)

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

    currentPage.value = Math.ceil((activeElementIdx + 1) / itemsCount.value)
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

    <section v-else-if="events.length" class="calendar-content">
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
        />
      </div>
    </section>
    <UiLoader v-if="isLoading" />
  </main>
</template>
