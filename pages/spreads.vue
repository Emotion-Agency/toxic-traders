<script setup lang="ts">
import type {
  iBrokerServerAccountSymbolsSpread,
  iBrokerUniqueServerAccountSymbolsSpread,
} from '~/types/broker/brokerServerAccountSymbols'
import type { iSpreadsInput } from '~/types/spreads/spreads'

const inputsList = ref<iSpreadsInput[]>([])
const symbolsNames = ref([])
const filteredSymbolsNames = ref([])
const spreadsList = ref<iBrokerServerAccountSymbolsSpread[]>([])
const filteredSpreadsList = ref<iBrokerUniqueServerAccountSymbolsSpread[]>([])
const selectedSymbol = ref('')
const isTableLoading = ref(true)

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

const { getServerAccountSymbolsNames, getServerAccountSymbolsSpreadsAll } =
  useBrokerServerAccountSymbols()

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
}

const selectPlatform = (item: string) => {
  console.log(item)
}

const onSorted = (sortState: ISortState) => {
  filteredSpreadsList.value = filteredSpreadsList.value?.sort((a, b) => {
    if (sortState.sortOrder === 1) {
      return a[sortState.sortBy] > b[sortState.sortBy] ? 1 : -1
    } else {
      return a[sortState.sortBy] < b[sortState.sortBy] ? 1 : -1
    }
  })
}

const headerFields = computed(() => {
  return Object.keys(filteredSpreadsList.value[0] ?? {})
})

onMounted(async () => {
  try {
    isTableLoading.value = true
    symbolsNames.value = await getServerAccountSymbolsNames()
    spreadsList.value = await getServerAccountSymbolsSpreadsAll(
      spreadsParams.value
    )
    filteredSymbolsNames.value = symbolsNames.value

    totalCountPages.value = spreadsList.value?.length
  } finally {
    isTableLoading.value = false
  }
})
</script>

<template>
  <main>
    <div class="spreads">
      <div class="container spreads__wrapper">
        <h1 class="spreads__title">Spreads</h1>
        <div v-if="!isTableLoading" class="spreads__main-content">
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
                input-id="type-of-account-table"
                input-name="Type of account table"
                @next-click="nextPageClick"
                @prev-click="prevPageClick"
                @selected-item="onChangeCount"
                @on-blur-value="onInputBlur"
                @on-change-value="onInputChange"
              />
            </div>
          </div>
        </div>
        <UiLoader v-else-if="isTableLoading" />
        <p v-else class="spreads__error">Spreads table data is not found</p>
      </div>
    </div>
  </main>
</template>
