<script setup lang="ts">
import type {
  iBrokerServerAccountSymbolsSpread,
  iBrokerUniqueServerAccountSymbolsSpread,
} from '~/types/broker/brokerServerAccountSymbols'

const router = useRouter()
const route = useRoute()

const symbolsNames = ref([])
const symbolsDescriptions = ref([])
const filteredSymbolsNames = ref([])
const filteredSymbolsDescriptions = ref([])
const spreads = ref<iBrokerServerAccountSymbolsSpread[]>([])
const filteredSpreads = ref<iBrokerUniqueServerAccountSymbolsSpread[]>([])
const selectedSymbol = ref<string>(null)
const selectedDescription = ref<string>(null)
const isContentLoading = ref(true)
const isTableLoading = ref(true)
const sortBy = ref('BrokerCompanyNames')
const sortOrder = ref<1 | 2>(1)

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
  route.query.page && Number(route.query.page),
  route.query.count && Number(route.query.count)
)

const {
  getServerAccountSymbolsNames,
  getServerAccountSymbolsSpreadsCurrent,
  getServerAccountSymbolsDescriptions,
} = useBrokerServerAccountSymbols()

const symbolSelect = computed(() => {
  return {
    options: filteredSymbolsNames.value,
    placeholder: 'Select symbol',
    title: 'Symbol',
    searchInput: {
      id: 'spreads-search-symbol',
      required: false,
      name: 'Spreads search symbol',
      type: 'text',
      placeholder: 'Search symbol',
      isRightButton: true,
    },
  }
})

const descriptionSelect = computed(() => {
  return {
    options: filteredSymbolsDescriptions.value,
    placeholder: 'Select description',
    title: 'Description',
    searchInput: {
      id: 'spreads-search-description',
      required: false,
      name: 'Spreads search description',
      type: 'text',
      placeholder: 'Search description',
      isRightButton: true,
    },
  }
})

const getCurrentSpreadRequest = async () => {
  try {
    isTableLoading.value = true
    const { brokerServerAccountSymbols, totalCount } =
      await getServerAccountSymbolsSpreadsCurrent({
        symbolName: selectedSymbol.value || '*',
        description: selectedDescription.value || 'none',
        page: currentPage.value - 1,
        pageSize: itemsCount.value,
        sortBy: sortBy.value || 'BrokerCompanyNames',
        sortOrder: sortOrder.value || 0,
      })

    isTableLoading.value = false
    spreads.value = brokerServerAccountSymbols
    filteredSpreads.value = spreads.value.map(item => {
      return {
        broker: item?.brokerCompanyNames[0],
        accountType: item?.accountType,
        serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
        spread: item?.spread,
        newsSpread: item?.newsSpread,
      }
    })

    totalCountPages.value = totalCount
  } catch (error) {
    console.error(error)
  } finally {
    isTableLoading.value = false
  }
}

const searchSymbolsName = (searchValue: string) => {
  filteredSymbolsNames.value = symbolsNames.value?.filter(
    item =>
      item.toLowerCase().trim().includes(searchValue.toLowerCase().trim()) &&
      item !== selectedSymbol.value
  )
}

const searchSymbolsDescription = (searchValue: string) => {
  filteredSymbolsDescriptions.value = symbolsDescriptions.value?.filter(
    item =>
      item.toLowerCase().trim().includes(searchValue.toLowerCase().trim()) &&
      item !== selectedDescription.value
  )
}

const selectSymbolsName = async (item: string) => {
  selectedSymbol.value = item
  filteredSymbolsNames.value = symbolsNames.value?.filter(name => name !== item)
  await getCurrentSpreadRequest()
}

const selectSymbolsDescription = async (item: string) => {
  selectedDescription.value = item
  filteredSymbolsDescriptions.value = symbolsDescriptions.value?.filter(
    description => description !== item
  )
  await getCurrentSpreadRequest()
}

const resetSelectedSymbol = async () => {
  selectedSymbol.value = null
  filteredSymbolsNames.value = symbolsNames.value

  await getCurrentSpreadRequest()
}

const resetSelectedDescription = async () => {
  selectedDescription.value = null
  filteredSymbolsDescriptions.value = symbolsDescriptions.value

  await getCurrentSpreadRequest()
}

// const selectPlatform = (item: string) => {
//   console.log(item)
// }

const onSorted = async (sortState: ISortState) => {
  sortBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  sortOrder.value = sortState.sortOrder

  await getCurrentSpreadRequest()
}

const headerFields = computed(() => {
  return Object.keys(filteredSpreads.value[0] ?? {})
})

watch(
  () => spreads.value,
  () => {
    filteredSpreads.value = spreads.value.map(item => {
      return {
        broker: item?.brokerCompanyNames[0],
        accountType: item?.accountType,
        serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
        spread: item?.spread,
        newsSpread: item?.newsSpread,
      }
    })
  }
)

watch([currentPage, itemsCount], async () => {
  await getCurrentSpreadRequest()

  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

watch([selectedSymbol, selectedDescription], async () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    isContentLoading.value = true
    symbolsNames.value = await getServerAccountSymbolsNames()
    symbolsDescriptions.value = await getServerAccountSymbolsDescriptions()

    await getCurrentSpreadRequest()

    filteredSymbolsNames.value = symbolsNames.value?.filter(
      name => name !== selectedSymbol.value
    )

    filteredSymbolsDescriptions.value = symbolsDescriptions.value?.filter(
      description => description !== selectedDescription.value
    )
  } finally {
    isContentLoading.value = false
  }
})
</script>

<template>
  <main>
    <div class="spreads">
      <div class="container spreads__wrapper">
        <h1 class="spreads__title">Spreads</h1>
        <div v-if="!isContentLoading" class="spreads__main-content">
          <div class="spreads__content">
            <ul class="spreads__select-list">
              <li class="spreads__select-item">
                <InputSelect
                  :options="symbolSelect.options"
                  :search-input="symbolSelect.searchInput"
                  :placeholder="symbolSelect.placeholder"
                  :title="symbolSelect.title"
                  :value="selectedSymbol"
                  :is-reset="!!selectedSymbol"
                  @search="searchSymbolsName"
                  @select="selectSymbolsName"
                  @reset="resetSelectedSymbol"
                />
              </li>
              <li class="spreads__select-item">
                <InputSelect
                  :options="descriptionSelect.options"
                  :search-input="descriptionSelect.searchInput"
                  :placeholder="descriptionSelect.placeholder"
                  :title="descriptionSelect.title"
                  :value="selectedDescription"
                  :is-reset="!!selectedDescription"
                  @search="searchSymbolsDescription"
                  @select="selectSymbolsDescription"
                  @reset="resetSelectedDescription"
                />
              </li>
              <!-- <li class="spreads__select-item">
                <InputSelect
                  :options="platformsSelect.options"
                  :placeholder="platformsSelect.placeholder"
                  :title="platformsSelect.title"
                  @select="selectPlatform"
                >
                  <template #right-icon>
                    <IconsSearch />
                  </template>
                </InputSelect>
              </li> -->
            </ul>
          </div>

          <div v-if="filteredSpreads.length" class="spreads__table-wrapper">
            <div class="spreads__table-content">
              <SpreadsTable
                :header-fields="headerFields"
                :table-items="filteredSpreads"
                :default-sort-by="sortBy"
                class="spreads__table"
                @sort="onSorted"
              />
              <ThePagination
                class="spreads__pagination"
                :total-pages="totalCountPages"
                :current-page="currentPage"
                :options="['25 rows', '50 rows', '100 rows']"
                :items-count="itemsCount"
                :input-value="searchValue"
                input-id="spreads-table"
                input-name="Spreads table"
                @next-click="nextPageClick"
                @prev-click="prevPageClick"
                @selected-item="onChangeCount"
                @on-blur-value="onInputBlur"
                @on-change-value="onInputChange"
              />
            </div>
          </div>
          <UiLoader v-if="isTableLoading" />
        </div>
        <UiLoader v-if="isContentLoading" />
      </div>
    </div>
  </main>
</template>
