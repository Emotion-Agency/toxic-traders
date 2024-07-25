<script setup lang="ts">
import type {
  iBrokerServerAccountSymbolsSpread,
  iBrokerUniqueServerAccountSymbolsSpread,
} from '~/types/broker/brokerServerAccountSymbols'
// import type { iSpreadsInput } from '~/types/spreads/spreads'

// const inputsList = ref<iSpreadsInput[]>([])
const router = useRouter()
const route = useRoute()
const symbolsNames = ref([])
const filteredSymbolsNames = ref([])
const spreadsList = ref<iBrokerServerAccountSymbolsSpread[]>([])
const filteredSpreadsList = ref<iBrokerUniqueServerAccountSymbolsSpread[]>([])
const selectedSymbol = ref('')
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
} = usePagination()

const {
  getServerAccountSymbolsNames,
  getServerAccountSymbolsSpreadsAll,
  getServerAccountSymbolsSpreadsCurrent,
} = useBrokerServerAccountSymbols()

const spreadsParams = ref({
  page: 0,
  pageSize: -1,
  sortBy: '',
  sortOrder: 1,
})

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

const platformsSelect = computed(() => {
  return {
    options: ['MT 4', 'MT 5'],
    placeholder: 'Select platform',
    title: 'Platforms',
  }
})

const descriptionInput = ref({
  title: 'Description',
  required: false,
  id: 'spreads-description',
  name: 'Spreads description',
  type: 'text',
  value: '',
  placeholder: 'Write your desription',
  isRightButton: true,
})

// watch(
//   () => [symbolsNames.value, filteredSymbolsNames.value],
//   () => {
//     inputsList.value = [
//       {
//         options: filteredSymbolsNames.value,
//         placeholder: 'Select symbol',
//         title: 'Symbol',
//         searchInput: {
//           id: 'spreads-search-symbol',
//           required: false,
//           name: 'Spreads search symbol',
//           type: 'text',
//           placeholder: 'Search symbol',
//           isRightButton: true,
//         },
//       },
//       {
//         title: 'Description',
//         required: false,
//         id: 'spreads-description',
//         name: 'Spreads description',
//         type: 'text',
//         value: '',
//         placeholder: 'Write your desription',
//         isRightButton: true,
//       },
//       {
//         options: ['MT 4', 'MT 5'],
//         placeholder: 'Select platform',
//         title: 'Platforms',
//       },
//     ]
//   }
// )

watch(
  () => spreadsList.value,
  () => {
    filteredSpreadsList.value = spreadsList.value.map(item => {
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

const getCurrentSpreadRequest = async () => {
  isTableLoading.value = true

  const { brokerServerAccountSymbols, totalCount } =
    await getServerAccountSymbolsSpreadsCurrent({
      symbolName: selectedSymbol.value,
      description: 'none',
      page: currentPage.value - 1,
      pageSize: itemsCount.value,
      sortBy: sortBy.value || 'BrokerCompanyNames',
      sortOrder: sortOrder.value || 0,
    })

  console.log(brokerServerAccountSymbols)

  isTableLoading.value = false
  spreadsList.value = brokerServerAccountSymbols
  filteredSpreadsList.value = spreadsList.value.map(item => {
    return {
      broker: item?.brokerCompanyNames[0],
      accountType: item?.accountType,
      serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
      spread: item?.spread,
      newsSpread: item?.newsSpread,
    }
  })
  totalCountPages.value = totalCount
}

const getAllSpreadsRequest = async () => {
  isTableLoading.value = true

  const { brokerServerAccountSymbols, totalCount } =
    await getServerAccountSymbolsSpreadsAll({
      page: currentPage.value - 1,
      pageSize: itemsCount.value,
      sortBy: sortBy.value || 'BrokerCompanyNames',
      sortOrder: sortOrder.value || 1,
    })

  isTableLoading.value = false
  spreadsList.value = brokerServerAccountSymbols
  filteredSpreadsList.value = spreadsList.value.map(item => {
    return {
      broker: item?.brokerCompanyNames[0],
      accountType: item?.accountType,
      serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
      spread: item?.spread,
      newsSpread: item?.newsSpread,
    }
  })

  totalCountPages.value = totalCount
}

watch([currentPage, itemsCount], async () => {
  await getAllSpreadsRequest()

  router.push({
    query: {
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

const searchSymbolsName = (searchValue: string) => {
  filteredSymbolsNames.value = symbolsNames.value?.filter(
    item =>
      item.toLowerCase().trim().includes(searchValue.toLowerCase().trim()) &&
      item !== selectedSymbol.value
  )
}

const selectSymbolsName = (item: string) => {
  selectedSymbol.value = item
  filteredSymbolsNames.value = symbolsNames.value?.filter(name => name !== item)

  // try {
  //   isTableLoading.value = true
  //   const spreadsParams = {
  //     symbolName: selectedSymbol.value,
  //     description: 'none',
  //     page: 0,
  //     pageSize: -1,
  //     sortBy: 'BrokerCompanyNames',
  //     sortOrder: 1,
  //   }
  //   const spread = await getServerAccountSymbolsSpreadsCurrent(spreadsParams)
  //   console.log(spread)
  //   filteredSpreadsList.value = spread.map(item => {
  //     return {
  //       broker: item?.brokerCompanyNames[0],
  //       accountType: item?.accountType,
  //       serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
  //       spread: item?.spread,
  //       newsSpread: item?.newsSpread,
  //     }
  //   })
  //   console.log(filteredSpreadsList.value)
  // } finally {
  //   isTableLoading.value = false
  // }
}

const selectPlatform = (item: string) => {
  console.log(item)
}

const onSorted = async (sortState: ISortState) => {
  sortBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  console.log(sortState.sortOrder)
  sortOrder.value = sortState.sortOrder

  await getAllSpreadsRequest()
  // filteredSpreadsList.value = filteredSpreadsList.value?.sort((a, b) => {
  //   if (sortState.sortOrder === 1) {
  //     return a[sortState.sortBy] > b[sortState.sortBy] ? 1 : -1
  //   } else {
  //     return a[sortState.sortBy] < b[sortState.sortBy] ? 1 : -1
  //   }
  // })
  // console.log(filteredSpreadsList.value)
}

const headerFields = computed(() => {
  return Object.keys(filteredSpreadsList.value[0] ?? {})
})

onMounted(async () => {
  try {
    isContentLoading.value = true
    symbolsNames.value = await getServerAccountSymbolsNames()
    await getAllSpreadsRequest()
    filteredSymbolsNames.value = symbolsNames.value
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
                <CustomSelect
                  :options="symbolSelect.options"
                  :search-input="symbolSelect.searchInput"
                  :placeholder="symbolSelect.placeholder"
                  :title="symbolSelect.title"
                  @search="searchSymbolsName"
                  @select="selectSymbolsName"
                >
                  <template #right-icon>
                    <IconsSearch />
                  </template>
                </CustomSelect>
              </li>
              <li class="spreads__select-item">
                <TheInput
                  :id="descriptionInput.id"
                  :required="descriptionInput.required"
                  :title="descriptionInput.title"
                  :name="descriptionInput.name"
                  :type="descriptionInput.type"
                  :placeholder="descriptionInput.placeholder"
                  :value="descriptionInput.value"
                  :is-right-button="descriptionInput.isRightButton"
                  class="spreads__description"
                >
                  <template #right-icon>
                    <IconsSearch />
                  </template>
                </TheInput>
              </li>
              <li class="spreads__select-item">
                <CustomSelect
                  :options="platformsSelect.options"
                  :placeholder="platformsSelect.placeholder"
                  :title="platformsSelect.title"
                  @select="selectPlatform"
                >
                  <template #right-icon>
                    <IconsSearch />
                  </template>
                </CustomSelect>
              </li>
            </ul>
          </div>
          <div class="spreads__table-wrapper">
            <div class="spreads__table-content">
              <SpreadsTable
                :header-fields="headerFields"
                :table-items="filteredSpreadsList"
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
          <p v-else class="spreads__error">Spreads table data is not found</p>
        </div>
        <UiLoader v-else-if="isContentLoading" />
        <p v-else class="spreads__error">Spreads table data is not found</p>
      </div>
    </div>
  </main>
</template>
