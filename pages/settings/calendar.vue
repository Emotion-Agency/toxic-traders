<script lang="ts" setup>
import debounce from 'debounce'
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { IReactionItem } from '~/types/calendar/reactions'
import type { IOHLCSymbol } from '~/types/ohlc/symbols'
import { symbolDirAdapterFromStringToNumber } from '~/utils/adapters/calendar/symbolDirAdapter'

const searchInput = reactive({
  required: false,
  id: 'settings-users-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search news',
  isRightButton: true,
})

const { events, totalCount, getGroupedEvents, getGroupedEventsByName } =
  useCalendarEvents()

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

const isLoading = ref(false)
const mode = ref<'all' | 'pagination'>('pagination')

const getAllEvents = async () => {
  await getGroupedEvents(currentPage.value, itemsCount.value)
  totalCountPages.value = totalCount.value
  mode.value = 'pagination'
}

const getSearchEvents = async () => {
  await getGroupedEventsByName(searchInput.value)
  currentPage.value = 1
  totalCountPages.value = totalCount.value

  mode.value = 'all'
}

const searchHandler = async () => {
  try {
    isLoading.value = true
    if (!searchInput.value.trim()) {
      await getAllEvents()
      return
    }

    await getSearchEvents()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const debouncedSearchHandler = debounce(searchHandler, 500)

const onSearch = async (e: iInputData) => {
  searchInput.value = e.value
  await debouncedSearchHandler()
}

const { getSymbols } = useSymbols()

const { bindSymbol, unbindSymbol, setSymbolDirection } = useCalendarEvents()

onMounted(async () => {
  try {
    isLoading.value = true
    await getAllEvents()

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
    if (mode.value === 'pagination') {
      await getAllEvents()
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const reactionEvent = ref<ITableCalendarEvent>(null)

const { toast } = useToasts()

const isUpdatingReactions = ref(false)

const updateReactions = async (
  items: IReactionItem[],
  event: ITableCalendarEvent
) => {
  try {
    const itemsRequests = items.map(item => {
      return new Promise(async (resolve, reject) => {
        try {
          const alreadyBoundedSymbol = event.symbols.find(
            symbol => symbol.ohlcSymbolId === item.id
          )

          if (!alreadyBoundedSymbol) {
            await bindSymbol(event.event, event.country, item.id, item.order)
          }

          const isSymbolDirectionChanged =
            alreadyBoundedSymbol?.tradeDirection !==
            symbolDirAdapterFromStringToNumber(item.direction)

          if (isSymbolDirectionChanged) {
            await setSymbolDirection(
              event.event,
              event.country,
              item.id,
              item.direction
            )
          }

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    })

    const deletedSymbols = event.symbols.filter(
      symbol => !items.find(item => item.id === symbol.ohlcSymbolId)
    )

    isUpdatingReactions.value = true

    if (deletedSymbols) {
      await Promise.all(
        deletedSymbols.map(
          async symbol =>
            await unbindSymbol(event.event, event.country, symbol.ohlcSymbolId)
        )
      )
    }

    await Promise.all(itemsRequests)
    await getAllEvents()

    toast.success('Reactions updated')

    reactionEvent.value = null
  } catch (error) {
    toast.error('Error updating reactions')
    console.log(error)
  } finally {
    isUpdatingReactions.value = false
  }
}
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
        v-if="mode === 'pagination'"
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
      :event="reactionEvent"
      :symbols="symbols"
      :is-loading="isUpdatingReactions"
      @close="reactionEvent = null"
      @save="updateReactions"
    />
  </section>
</template>
