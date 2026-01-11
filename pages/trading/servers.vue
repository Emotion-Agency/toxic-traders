<script setup lang="ts">
import { useClients } from '~/composables/clients'
import type { IClient } from '~/types/clients/clients'

const router = useRouter()
const route = useRoute()

const { getAllClients, deleteClient, getClient } = useClients()

const servers = ref<IClient[]>([])

const isLoading = ref(false)
const sortedBy = ref((route.query?.sortedBy as string) ?? 'clientname')
const sortedOrder = ref<1 | 2>(1)
const selectedServer = ref<IClient | null>(null)
const deleteModalOpened = ref(false)
const createModalOpened = ref(false)
const updateModalOpened = ref(false)

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

const fetchAllServers = async () => {
  try {
    isLoading.value = true

    const { clients, totalCount } = await getAllClients({
      page: currentPage.value,
      count: itemsCount.value,
      sortBy: removeSpaces(formatToSnakeCase(sortedBy.value)),
      sortOrder: sortedOrder.value,
    })

    servers.value = clients ?? []
    totalCountPages.value = totalCount
  } finally {
    isLoading.value = false
  }
}

const onSort = async (sortState: ISortState) => {
  sortedBy.value = sortState.sortBy
  sortedOrder.value = sortState.sortOrder

  router.push({
    query: {
      ...route.query,
      sortedBy: removeSpaces(formatToSnakeCase(sortedBy.value)),
      sortedOrder: sortedOrder.value,
    },
  })

  await fetchAllServers()
}

const handleCreateModalOpen = () => {
  createModalOpened.value = true
}

const handleCreateModalClose = () => {
  createModalOpened.value = false
}

const handleDeleteModalClose = () => {
  deleteModalOpened.value = false
  selectedServer.value = null
}

const handleDeleteModalOpen = async (id: number) => {
  selectedServer.value = await getClient(id)
  deleteModalOpened.value = true
}

const handleUpdateModalOpen = async (id: number) => {
  selectedServer.value = await getClient(id)
  updateModalOpened.value = true
}

const handleUpdateModalClose = () => {
  updateModalOpened.value = false
  selectedServer.value = null
}

const handleDeleteServer = async () => {
  if (!selectedServer.value) return

  await deleteClient(selectedServer.value?.id)
  await fetchAllServers()

  deleteModalOpened.value = false
  selectedServer.value = null
}

const handleCreateServer = async () => {
  await fetchAllServers()
}

const handleUpdateServer = async () => {
  await fetchAllServers()
}

watch([currentPage, itemsCount], async () => {
  await fetchAllServers()

  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

onMounted(async () => {
  await fetchAllServers()
})
</script>

<template>
  <main class="container">
    <section class="hero-servers">
      <div class="hero-servers__wrapper">
        <h1 class="hero-servers__title">Servers</h1>
        <TheButton
          tag="button"
          class="hero-servers__btn"
          @click="handleCreateModalOpen"
        >
          <template #start-icon>
            <IconsPlus />
          </template>
          Add server
        </TheButton>
      </div>
    </section>

    <section class="servers-content">
      <UiLoader v-if="isLoading" />
      <div v-else-if="servers?.length" class="servers-content__table-wrapper">
        <TradingServersTable
          :servers="servers"
          :default-sort-by="sortedBy"
          :default-sort-order="sortedOrder"
          @sort="onSort"
          @delete="handleDeleteModalOpen"
          @update="handleUpdateModalOpen"
        />
        <ThePagination
          class="servers-content__pagination"
          :total-pages="totalCountPages"
          :current-page="currentPage"
          :options="['25', '50', '100']"
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
      <NotFound v-else message="Oops! No servers found" />
    </section>
    <DeleteModal
      :modal-opened="deleteModalOpened"
      text="Are you sure you want to delete this account? This action cannot be prevented"
      @close="handleDeleteModalClose"
      @delete="handleDeleteServer"
      :is-loading="isLoading"
    />
    <TradingServersCreateServerModal
      :servers="servers"
      :modal-opened="createModalOpened"
      @close="handleCreateModalClose"
      @created="handleCreateServer"
    />
    <TradingServersUpdateServerModal
      :selected-server="selectedServer"
      :servers="servers"
      :modal-opened="updateModalOpened"
      @close="handleUpdateModalClose"
      @updated="handleUpdateServer"
    />
  </main>
</template>
