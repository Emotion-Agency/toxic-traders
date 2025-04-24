<script setup lang="ts">
export interface iServersData {
  id: string
  status: string
  name: string
  address: string
}
const router = useRouter()
const route = useRoute()

const servers = ref<iServersData[]>([
  {
    id: '1',
    status: 'online',
    name: 'TradeSphere',
    address: '192.168.1.1:8080',
  },
  {
    id: '2',
    status: 'offline',
    name: 'MarketAnalyzer',
    address: '192.168.1.2:8080',
  },
  {
    id: '3',
    status: 'online',
    name: 'TradeOptimizer',
    address: '192.168.1.3:8080',
  },
  {
    id: '4',
    status: 'offline',
    name: 'RiskManager',
    address: '192.168.1.4:8080',
  },
  {
    id: '5',
    status: 'online',
    name: 'ProfitTracker',
    address: '192.168.1.5:8080',
  },
  {
    id: '6',
    status: 'online',
    name: 'AlgoTrader',
    address: '192.168.1.6:8080',
  },
  {
    id: '7',
    status: 'offline',
    name: 'DataMiner',
    address: '192.168.1.7:8080',
  },
  {
    id: '8',
    status: 'online',
    name: 'SignalProcessor',
    address: '192.168.1.8:8080',
  },
  {
    id: '9',
    status: 'offline',
    name: 'TrendAnalyzer',
    address: '192.168.1.9:8080',
  },
  {
    id: '10',
    status: 'online',
    name: 'PortfolioManager',
    address: '192.168.1.10:8080',
  },
  {
    id: '11',
    status: 'offline',
    name: 'LiquidityMonitor',
    address: '192.168.1.11:8080',
  },
])

const isLoading = ref(false)
const sortedBy = ref((route.query?.sortedBy as string) ?? 'name')
const sortedOrder = ref<1 | 2>(
  route.query?.sortedOrder ? (+route.query?.sortedOrder as 1 | 2) : 1
)
const selectedServerId = ref<string | null>(null)
const deleteModalOpened = ref(false)

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

const sortedServers = computed(() => {
  const key = sortedBy.value
  const order = sortedOrder.value

  return [...servers.value].sort((a, b) => {
    const aVal = a[key as keyof iServersData]
    const bVal = b[key as keyof iServersData]

    if (typeof aVal === 'string') {
      return order === 1
        ? aVal.localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal)
    }

    if (typeof aVal === 'boolean') {
      return order === 1
        ? Number(bVal) - Number(aVal)
        : Number(aVal) - Number(bVal)
    }

    return 0
  })
})

const onSort = async (sortState: ISortState) => {
  sortedBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  if (sortedBy.value === 'ipaddress') sortedBy.value = 'address'
  sortedOrder.value = sortState.sortOrder

  router.push({
    query: {
      ...route.query,
      sortedBy: sortedBy.value,
      sortedOrder: sortedOrder.value,
    },
  })
}

watch([currentPage, itemsCount], async () => {
  router.push({
    query: {
      ...route.query,

      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

const handleDeleteModalClose = () => {
  deleteModalOpened.value = false
}

const handleDeleteModalOpen = (id: string) => {
  selectedServerId.value = id
  deleteModalOpened.value = true
}

const handleDeleteServer = () => {
  if (!selectedServerId.value) return
  servers.value = servers.value.filter(
    server => server.id !== selectedServerId.value
  )
  deleteModalOpened.value = false
  selectedServerId.value = null
}
</script>

<template>
  <main>
    <section class="hero-servers">
      <div class="container hero-servers__wrapper">
        <h1 class="hero-servers__title">Servers</h1>
        <TheButton tag="button" class="hero-servers__btn">
          <template #start-icon>
            <IconsPlus />
          </template>
          Add server
        </TheButton>
      </div>
    </section>

    <UiLoader v-if="isLoading" />
    <NotFound
      v-if="!servers.length && !isLoading"
      message="Oops! No servers found"
    />
    <section v-else-if="servers.length" class="servers-content">
      <div class="container servers-content__table-wrapper">
        <ServersTable
          :servers-data="sortedServers"
          :default-sort-by="sortedBy"
          :default-sort-order="sortedOrder"
          @sort="onSort"
          @delete="handleDeleteModalOpen"
        />
        <ThePagination
          class="servers-content__pagination"
          :total-pages="totalCountPages"
          :current-page="currentPage"
          :options="['25 rows', '50 rows', '100 rows']"
          :items-count="itemsCount"
          :input-value="searchValue"
          input-id="servers-navigation"
          input-name="Servers navigation"
          @next-click="nextPageClick"
          @prev-click="prevPageClick"
          @selected-item="onChangeCount"
          @on-blur-value="onInputBlur"
          @on-change-value="onInputChange"
        />
      </div>
    </section>
    <DeleteModal
      :modal-opened="deleteModalOpened"
      text="Are you sure you want to delete this account? This action cannot be prevented"
      @close="handleDeleteModalClose"
      @delete="handleDeleteServer"
      :is-loading="isLoading"
    />
  </main>
</template>
