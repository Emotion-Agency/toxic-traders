<script lang="ts" setup>
import type { iSelectInput } from '~/types'

const dateOptions = ['Today', 'Tomorrow', 'This week', 'Next week']

const selectedDate = ref<string | null>(null)

const router = useRouter()
const route = useRoute()

const startDate = ref<string>(route.query.startDate as string)
const endDate = ref<string>(route.query.endDate as string)

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

const isModalOpen = ref(false)

const { events, getEvents, getEventsByDate } = useCalendarEvents()
const isLoading = ref(false)

const getAllEvents = async () => {
  try {
    isLoading.value = true
    await getEvents()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onSaveDate = async (reset?: boolean) => {
  try {
    isModalOpen.value = false
    isLoading.value = true
    if (!startDate.value) {
      await getAllEvents()
    } else {
      await getEventsByDate(startDate.value, endDate.value)
    }
    reset && (selectedDate.value = null)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await onSaveDate()
})

const onSelect = (e: iSelectInput) => {
  selectedDate.value = e.value

  const today = new Date()
  switch (e.value) {
    case 'Today':
      startDate.value = formatDate(today)
      endDate.value = null
      break
    case 'Tomorrow':
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      startDate.value = formatDate(tomorrow)
      endDate.value = null
      break
    case 'This week':
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      startDate.value = formatDate(startOfWeek)
      endDate.value = formatDate(endOfWeek)
      break
    case 'Next week':
      const startOfNextWeek = new Date(today)
      startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()))
      const endOfNextWeek = new Date(startOfNextWeek)
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6)
      startDate.value = formatDate(startOfNextWeek)
      endDate.value = formatDate(endOfNextWeek)
      break
    default:
      startDate.value = null
      endDate.value = null
  }

  onSaveDate()
}

const onReset = () => {
  selectedDate.value = null
  startDate.value = null
  endDate.value = null
  getAllEvents()
}

const getPlaceholder = () => {
  if (startDate.value && endDate.value) {
    return `${getDateDay(startDate.value)} - ${getDateDay(endDate.value)}`
  }
  if (startDate.value) {
    return getDateDay(startDate.value)
  }

  return 'Choose the date'
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
  paginatedEvents,
  sortState,
} = useCalendarTable(events)

watch([startDate, endDate], () => {
  router.push({
    query: {
      ...route.query,
      startDate: startDate.value && getDateDay(startDate.value),
      endDate: endDate.value && getDateDay(endDate.value),
    },
  })
  currentPage.value = 1
})
</script>

<template>
  <main>
    <section class="calendar">
      <div class="container calendar__wrapper">
        <h1 class="calendar__title">Calendar</h1>

        <div class="calendar__menu">
          <div class="calendar__select">
            <InputSelect
              :options="dateOptions"
              :placeholder="getPlaceholder()"
              id="calendar-date"
              name="Select date"
              title="Select date"
              :is-reset="!!selectedDate"
              :value="selectedDate"
              @select="onSelect"
              @reset="onReset"
            >
              <InputSelectOption
                v-for="(option, idx) in dateOptions"
                :key="option"
                :option="option"
                :index="idx"
              />
            </InputSelect>
          </div>
          <TheButton @click="isModalOpen = true">
            <template #start-icon>
              <IconsCalendar />
            </template>
            Custom Date
          </TheButton>

          <CalendarCustomDateModal
            :is-open="isModalOpen"
            @close="isModalOpen = false"
            v-model:startDate="startDate"
            v-model:endDate="endDate"
            @save="onSaveDate(true)"
          />

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
