<script lang="ts" setup>
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

const { events, getAllEventsByPage } = useCalendarEvents()

const countries = ref([])
const symbols = ref([])
const filteredSymbols = ref([])
const selectedSymbol = ref<string>(null)

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

const symbolsSelect = computed(() => {
  return {
    options: filteredSymbols.value,
    placeholder: 'Choose symbol',
    title: 'Main Symbol',
    searchInput: {
      required: false,
      name: 'Spreads search symbol',
      type: 'text',
      placeholder: 'Search symbol',
      isRightButton: true,
    },
  }
})

const onSymbolSearch = (searchValue: string) => {
  filteredSymbols.value = symbols.value?.filter(
    item =>
      item.toLowerCase().trim().includes(searchValue.toLowerCase().trim()) &&
      item !== selectedSymbol.value
  )
}

const onSearch = () => {}

const onDisable = (value, id: number) => {
  console.log(value, id)
}

const onImportanceChange = (value: iInputData, id: number) => {
  console.log(value, id)
}

const onSymbolChange = (value: iInputData, id: number) => {
  console.log(value)
}

const getCountryFlag = (countryCode: string) => {
  const country = countries.value.find(
    country => country.countryShortName === countryCode
  )
  return country?.countryFlag
}

const isLoading = ref(false)

const { getFlags } = useFlags()
const { getSymbols } = useSymbols()

onMounted(async () => {
  try {
    isLoading.value = true
    await getAllEventsByPage(currentPage.value, itemsCount.value)
    totalCountPages.value = 1000
    countries.value = await getFlags()
    symbols.value = await getSymbols()
    filteredSymbols.value = symbols.value
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
        <li
          v-for="event of events"
          :key="event.id"
          class="settings-calendar__item sci"
        >
          <h3 class="sci__title">
            <span>
              <img
                v-if="getCountryFlag(event.country)?.url"
                class="sci__flag"
                :src="getCountryFlag(event.country)?.url"
                :alt="getCountryFlag(event.country).alt"
              />
            </span>
            <b> {{ event.country }}</b> <span>{{ event.event }}</span>
          </h3>
          <InputCheckbox
            :id="`sci--${event.id}`"
            name="sci"
            title="sci"
            class="sci__checkbox"
            value="Disable"
            @input-value="onDisable($event, event.id)"
          />
          <InputSelect
            :id="`sci-imp--${event.id}`"
            placeholder="Choose importance"
            :options="['Low', 'Medium', 'High']"
            title="Importance"
            class="sci__select sci__importance"
            @select="onImportanceChange($event, event.id)"
          >
            <InputSelectOption
              v-for="(option, idx) in ['Low', 'Medium', 'High']"
              :key="option"
              :option="option"
              :index="idx"
            >
              {{ option }}
            </InputSelectOption>
          </InputSelect>
          <InputSelect
            :search-input="{
              ...symbolsSelect.searchInput,
              id: `sci-symbol-search--${event.id}`,
            }"
            :id="`sci-symbol--${event.id}`"
            :placeholder="symbolsSelect.placeholder"
            :options="symbolsSelect.options"
            :title="symbolsSelect.title"
            class="sci__select sci__symbol"
            v-slot="{ renderedItems }"
            @select="onSymbolChange($event, event.id)"
            @search="onSymbolSearch"
          >
            <InputSelectOption
              v-for="(option, idx) in renderedItems"
              :key="option"
              :option="option"
              :index="idx"
            >
              {{ option }}
            </InputSelectOption>
          </InputSelect>
          <TheButton class="sci__button" button-size="small">
            Reactions Settings
          </TheButton>
        </li>
      </ul>
      <ThePagination
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
  </section>
</template>
