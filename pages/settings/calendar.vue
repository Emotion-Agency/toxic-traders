<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { IOHLCSymbol } from '~/types/ohlc/symbols'

const searchInput = reactive({
  required: false,
  id: 'settings-users-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search news',
  disabled: false,
  isRightButton: true,
})

const { events, totalCount, getAllEventsByPage } = useCalendarEvents()

const symbols = ref<IOHLCSymbol[]>([])

const route = useRoute()
const router = useRouter()

const {
  currentPage,
  itemsCount,
  searchValue,
  totalCountPages,
  nextPageClick,
  prevPageClick,
  onInputBlur,
  onInputChange,
  onChangeCount,
} = usePagination(
  route.query.page ? Number(route.query.page) : 1,
  route.query.count ? Number(route.query.count) : 100
)

const onSearch = () => {}

const isLoading = ref(false)

const { getSymbols } = useSymbols()

onMounted(async () => {
  try {
    isLoading.value = true
    await getAllEventsByPage(currentPage.value, itemsCount.value)
    totalCountPages.value = totalCount.value

    symbols.value = await getSymbols()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

watch([currentPage, itemsCount], async () => {
  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
      count: itemsCount.value,
    },
  })

  document.documentElement.scrollTop = 0
  try {
    isLoading.value = true
    await getAllEventsByPage(currentPage.value, itemsCount.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const reactionEvent = ref<ITableCalendarEvent>(null)
</script>

<template>
  <section class="settings-calendar">
    <h2 class="settings-calendar__title">News Settings</h2>

    <div class="settings-calendar__content">
      <InputField
        :id="searchInput.id"
        :required="searchInput.required"
        :name="searchInput.name"
        :type="searchInput.type"
        :placeholder="searchInput.placeholder"
        :disabled="searchInput.disabled"
        :is-right-button="searchInput.isRightButton"
        class="settings-calendar__search"
        @input-value="onSearch"
      >
        <template #right-icon>
          <IconsSearch />
        </template>
      </InputField>
    </div>
    <UiLoader v-if="isLoading" />
    <div v-if="events?.length">
      <ul class="settings-calendar__items">
        <CalendarSettingsEvent
          v-for="event of events"
          :key="event.id"
          :event="event"
          :symbols="symbols"
          @open-reactions="reactionEvent = $event"
        />
      </ul>
      <ThePagination
        class="settings-calendar__pagination"
        :currentPage="currentPage"
        :itemsCount="itemsCount"
        :total-pages="totalCountPages"
        input-id="settings-calendar-pagination"
        input-name="Settings calendar pagination"
        :options="['25', '50', '100']"
        :input-value="searchValue"
        @next-click="nextPageClick"
        @prev-click="prevPageClick"
        @selected-item="onChangeCount"
        @on-blur-value="onInputBlur"
        @on-change-value="onInputChange"
      />
    </div>
    <NotFound v-if="!events?.length && !isLoading" />
    <CalendarSettingsReactionModal
      :is-open="!!reactionEvent"
      @close="reactionEvent = null"
      :event="reactionEvent"
      :symbols="symbols"
    />
  </section>
</template>
