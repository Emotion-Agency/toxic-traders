<script setup lang="ts">
const { getServerAccountSymbolsSpreads } = useBrokerServerAccountSymbols()
const params = ref({
  symbolName: 'O2D_CFD.DE',
  brokerPlatform: -1,
  description: 'none',
  page: 0,
  pageSize: -1,
  sortBy: 'Spread',
  sortOrder: 1,
})

const selectData = ref([
  {
    options: ['Option 1', 'Option 2', 'Option 3'],
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
])

const searchItems = (val: string) => {
  console.log(val)
}

// const onSorted = (sortState: ISortState) => {
//   filteredTableItems.value = filteredTableItems.value?.sort((a, b) => {
//     if (sortState.sortOrder === 1) {
//       return a[sortState.sortBy] > b[sortState.sortBy] ? 1 : -1
//     } else {
//       return a[sortState.sortBy] < b[sortState.sortBy] ? 1 : -1
//     }
//   })
// }

// const headerFields = computed(() => {
//   return getBrokerHeadings(filteredTableItems.value[0] ?? {})
// })

onMounted(async () => {
  const data = await getServerAccountSymbolsSpreads(params.value)

  console.log(data)
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
              v-for="(item, idx) in selectData"
              :key="idx"
              class="spreads__select-item"
            >
              <CustomSelect
                :options="item.options"
                :search-input="item.searchInput"
                :placeholder="item.placeholder"
                :title="item.title"
                class="main-broker__settings-select"
                @search="searchItems"
              >
                <template #right-icon>
                  <IconsSearch />
                </template>
              </CustomSelect>
            </li>
          </ul>
        </div>
        <!-- <SpreadsTable
          :header-fields="headerFields"
          :table-items="filteredTableItems"
          @sort="onSorted"
        /> -->
      </div>
    </div>
  </main>
</template>
