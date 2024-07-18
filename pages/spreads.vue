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

const { getServerAccountSymbolsNames, getServerAccountSymbolsSpreadsAll } =
  useBrokerServerAccountSymbols()

const spreadsParams = ref({
  page: 0,
  pageSize: -1,
  sortBy: '',
  sortOrder: 1,
})

watch(
  () => [symbolsNames.value, filteredSymbolsNames.value],
  () => {
    inputsList.value = [
      {
        options: filteredSymbolsNames.value,
        placeholder: 'Select symbol',
        title: 'Sumbol',
        searchInput: {
          id: 'spreads-search-symbol',
          required: false,
          name: 'Spreads search symbol',
          type: 'text',
          placeholder: 'Search symbol',
          isRightButton: true,
        },
      },
      {
        title: 'Description',
        required: false,
        id: 'spreads-description',
        name: 'Spreads description',
        type: 'text',
        value: '',
        placeholder: 'Write your desription',
        isRightButton: true,
      },
      {
        options: ['Option 1', 'Option 2', 'Option 3'],
        placeholder: 'Select platform',
        title: 'Platforms',
        searchInput: {
          id: 'spreads-search-platform',
          required: false,
          name: 'Spreads search platform',
          type: 'text',
          placeholder: 'Search platform',
          isRightButton: true,
        },
      },
    ]
  }
)

watch(
  () => spreadsList.value,
  () => {
    filteredSpreadsList.value = spreadsList.value.map(item => {
      return {
        broker: item?.brokerCompanyNames[0],
        accountType: item?.accountType,
        platform: item?.brokerPlatforms[0],
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
  symbolsNames.value = await getServerAccountSymbolsNames()
  spreadsList.value = await getServerAccountSymbolsSpreadsAll(
    spreadsParams.value
  )
  filteredSymbolsNames.value = symbolsNames.value
})
</script>

<template>
  <main>
    <div class="spreads">
      <div class="container spreads__wrapper">
        <h1 class="spreads__title">Spreads</h1>
        <div class="spreads__content">
          <ul class="spreads__select-list">
            <li
              v-for="(item, idx) in inputsList"
              :key="idx"
              class="spreads__select-item"
            >
              <CustomSelect
                v-if="item.options"
                :options="item.options"
                :search-input="item.searchInput"
                :placeholder="item.placeholder"
                :title="item.title"
                class="main-broker__settings-select"
                @search="searchSymbolsName"
                @select="selectSymbolsName"
              >
                <template #right-icon>
                  <IconsSearch />
                </template>
              </CustomSelect>
              <TheInput
                v-else
                :id="item.id"
                :required="item.required"
                :title="item.title"
                :name="item.name"
                :type="item.type"
                :placeholder="item.placeholder"
                :value="item.value"
                :is-right-button="item.isRightButton"
                class="main-broker__settings-input"
              >
                <template #right-icon>
                  <IconsSearch />
                </template>
              </TheInput>
            </li>
          </ul>
        </div>
        <SpreadsTable
          :header-fields="headerFields"
          :table-items="filteredSpreadsList"
          class="main-broker__table"
          @sort="onSorted"
        />
      </div>
    </div>
  </main>
</template>
