<script lang="ts" setup>
import type { iSelectInput } from '~/types'

const dateOptions = ref(['Today', 'Tomorrow', 'This week', 'Next week'])

const selectedDate = ref<string | null>(null)

const router = useRouter()
const route = useRoute()

const dateRange = ref<string[] | null[]>([
  route.query.startDate as string,
  route.query.endDate as string,
])

const startDate = computed(() => dateRange.value[0])
const endDate = computed(() => dateRange.value[1])

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

const isModalOpen = ref(false)

const { events, getEvents, getWeekEvents, totalCount } = useCalendarEvents()
const isLoading = ref(false)

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
} = useCalendarTable(events, totalCount)

const getAllEvents = async () => {
  try {
    isLoading.value = true
    if (!startDate.value) {
      await getWeekEvents(
        currentPage.value,
        itemsCount.value,
        sortState.value.sortOrder === 1 ? 0 : 1
      )
    } else {
      await getEvents({
        startDate: startDate.value,
        endDate: endDate.value,
        page: currentPage.value,
        count: itemsCount.value,
        sort: sortState.value.sortOrder === 1 ? 0 : 1,
      })
    }
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
    await getAllEvents()
    if (startDate.value) {
      addCustomSelectOption()
    }
    reset && (selectedDate.value = null)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const addCustomSelectOption = () => {
  if (startDate.value) {
    selectedDate.value = getDateDay(startDate.value)
  }

  if (startDate.value && endDate.value) {
    selectedDate.value = `${getDateDay(startDate.value)} - ${getDateDay(endDate.value)}`
  }
}

onMounted(async () => {
  await onSaveDate()
  addCustomSelectOption()
})

const onSelect = (e: iSelectInput) => {
  selectedDate.value = e.value

  const today = new Date()
  switch (e.value) {
    case 'Today':
      dateRange.value = [formatDate(today), null]

      break
    case 'Tomorrow':
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      dateRange.value = [formatDate(tomorrow), null]
      break
    case 'This week':
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      dateRange.value = [formatDate(startOfWeek), formatDate(endOfWeek)]
      break
    case 'Next week':
      const startOfNextWeek = new Date(today)
      startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()))
      const endOfNextWeek = new Date(startOfNextWeek)
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6)

      dateRange.value = [formatDate(startOfNextWeek), formatDate(endOfNextWeek)]
      break
    default:
      dateRange.value = [null, null]
  }

  onSaveDate()
}

const onReset = () => {
  selectedDate.value = null

  dateRange.value = [null, null]

  currentPage.value = 1
  getAllEvents()
}

watch([startDate, endDate], () => {
  router.push({
    query: {
      ...route.query,
      startDate: startDate.value ? getDateDay(startDate.value) : undefined,
      endDate: endDate.value ? getDateDay(endDate.value) : undefined,
    },
  })
  currentPage.value = 1
})

watch([currentPage, itemsCount, sortState], () => {
  getAllEvents()
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
              placeholder="Choose the date"
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
          <TheButton
            @click="isModalOpen = true"
            class="calendar__custom-date-btn"
            :class="{
              'calendar__custom-date-btn--active': startDate || endDate,
            }"
          >
            <template #start-icon>
              <IconsCalendar />
            </template>
            Custom Date
          </TheButton>

          <CalendarCustomDateModal
            :is-open="isModalOpen"
            @close="isModalOpen = false"
            v-model:date="dateRange"
            @save="onSaveDate()"
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

    <section v-else-if="events.length" class="calendar-content">
      <div class="calendar-table-wrapper">
        <CalendarTable
          :sort-state="sortState"
          :events="events"
          @sort="onSort"
        />
        <ThePagination
          v-if="totalCountPages > events.length / itemsCount"
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
    <UiLoader v-if="isLoading" />
  </main>
</template>
