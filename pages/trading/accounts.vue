<script setup lang="ts">
import type {
  ISummary,
  ITradingAccount,
  ITradingAccountPayload,
  ITradingAccountTableItem,
} from '~/types/trading-accounts/tradingAccounts'
import { tradingAccountTableAdapter } from '~/utils/adapters/tradingAccountTableAdapter'

const router = useRouter()
const route = useRoute()

const {
  getAllTradingAccounts,
  deleteTradingAccount,
  getTradingAccount,
  createTradingAccount,
  updateTradingAccount,
  checkAllTradingAccounts,
} = useTradingAccounts()

const { updateCurrBalance } = useBalances()
const { bindToClient } = useBindClients()

const accounts = ref<ITradingAccountTableItem[]>([])
const summary = ref<ISummary | null>(null)
const selectedAccount = ref<ITradingAccount | null>(null)
const deleteModalOpened = ref(false)
const createAccountModalOpened = ref(false)
const updateAccountModalOpened = ref(false)
const isLoading = ref(false)
const isSummaryLoading = ref(false)
const isChecking = ref(false)

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

const checkAllAccounts = async () => {
  try {
    isChecking.value = true

    const {
      accounts,
      totalCount,
      summary: summaryData,
    } = await checkAllTradingAccounts()

    accounts.value = accounts.map(tradingAccountTableAdapter)
    summary.value = summaryData
    totalCountPages.value = totalCount
  } finally {
    isChecking.value = false
    isLoading.value = false
  }
}

const fetchAccounts = async () => {
  try {
    isLoading.value = true

    const { items, totalCount } = await getAllTradingAccounts({
      page: currentPage.value,
      count: itemsCount.value,
    })

    accounts.value = items.map(tradingAccountTableAdapter)
    totalCountPages.value = totalCount
  } finally {
    isLoading.value = false
  }
}

const fetchSummary = async () => {
  try {
    isSummaryLoading.value = true

    const { summary: summaryData } = await getAllTradingAccounts({
      page: 1,
      count: 1,
    })

    summary.value = summaryData
  } finally {
    isSummaryLoading.value = false
  }
}

const onSort = (sortState: ISortState) => {
  accounts.value = accounts.value.sort((a, b) => {
    if (sortState.sortOrder === 1) {
      return a[sortState.sortBy] > b[sortState.sortBy] ? 1 : -1
    } else {
      return a[sortState.sortBy] < b[sortState.sortBy] ? 1 : -1
    }
  })
  // sortedBy.value = sortState.sortBy
  // sortedOrder.value = sortState.sortOrder

  // router.push({
  //   query: {
  //     ...route.query,
  //     sortedBy: removeSpaces(formatToSnakeCase(sortedBy.value)),
  //     sortedOrder: sortedOrder.value,
  //   },
  // })

  // await fetchAllAccounts()
}

const handleDeleteModalClose = () => {
  deleteModalOpened.value = false
  selectedAccount.value = null
}

const handleDeleteModalOpen = async (id: number) => {
  selectedAccount.value = await getTradingAccount(id)
  deleteModalOpened.value = true
}

const handleCreateAccountModalClose = () => {
  createAccountModalOpened.value = false
}

const handleCreateAccountModalOpen = () => {
  createAccountModalOpened.value = true
}

const handleCreateAccount = async ({
  acc,
  clientId,
}: {
  acc: ITradingAccountPayload
  clientId: number
}) => {
  await createTradingAccount(acc)
  // await bindToClient(clientId, acc?.id)
  createAccountModalOpened.value = false
  await fetchAccounts()
  await fetchSummary()
}

const handleUpdateAccountModalOpen = async (id: number) => {
  selectedAccount.value = await getTradingAccount(id)
  updateAccountModalOpened.value = true
}

const handleUpdateAccountModalClose = () => {
  updateAccountModalOpened.value = false
}

const handleUpdateAccount = async (acc: ITradingAccountPayload) => {
  await updateTradingAccount(acc, selectedAccount.value?.id)
  updateAccountModalOpened.value = false
  await fetchAccounts()
  await fetchSummary()
}

const handleCheckConnection = async (id: number) => {
  try {
    isLoading.value = true
    await updateCurrBalance(id)
  } finally {
    isLoading.value = false
  }
}

const handleCheckAccounts = async () => {
  await checkAllAccounts()
}

const handleDeleteServer = async () => {
  if (!selectedAccount.value) return

  await deleteTradingAccount(selectedAccount.value?.id)
  await fetchAccounts()
  await fetchSummary()

  deleteModalOpened.value = false
  selectedAccount.value = null
}

watch([currentPage, itemsCount], async () => {
  await fetchAccounts()

  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

onMounted(async () => {
  await fetchAccounts()
  await fetchSummary()
})
</script>

<template>
  <main class="container">
    <TradingAccountsTopBar
      :is-checking="isChecking"
      @create-account="handleCreateAccountModalOpen"
      @check-accounts="handleCheckAccounts"
    />
    <section class="acc-content">
      <div class="acc-content__wrapper">
        <div class="acc-content__table-wrapper">
          <div v-if="isLoading" class="acc-content__loader-wrapper">
            <UiLoader class="acc-content__loader" />
          </div>
          <div v-else-if="accounts?.length" class="acc-content__table">
            <TradingAccountsTable
              :accounts="accounts"
              @sort="onSort"
              @delete="handleDeleteModalOpen"
              @check="handleCheckConnection"
              @update="handleUpdateAccountModalOpen"
            />
            <ThePagination
              class="acc-content__pagination"
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
          <NotFound v-else message="Oops! No accounts found" />
        </div>
        <div class="acc-content__info">
          <TradingAccountsToggleMenu
            :summary="summary"
            :is-loading="isSummaryLoading"
          />
        </div>
      </div>
    </section>
    <DeleteModal
      :modal-opened="deleteModalOpened"
      text="Are you sure you want to delete this account? This action cannot be prevented"
      @close="handleDeleteModalClose"
      @delete="handleDeleteServer"
      :is-loading="isLoading"
    />
    <TradingAccountsCreateAccountModal
      :modal-opened="createAccountModalOpened"
      @close="handleCreateAccountModalClose"
      @create="handleCreateAccount"
    />
    <TradingAccountsUpdateAccountModal
      :selected-account="selectedAccount"
      :modal-opened="updateAccountModalOpened"
      @close="handleUpdateAccountModalClose"
      @update="handleUpdateAccount"
    />
  </main>
</template>

<style scoped lang="scss">
.acc-content {
  padding-bottom: 32px;
}

.acc-content__wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 24px;
  flex-wrap: nowrap;
  height: 100%;
}

.acc-content__loader-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.acc-content__loader {
  position: relative;
  top: auto;
  left: auto;
  transform: none;
}

.acc-content__table-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-width: 0;
  width: 100%;
}

.acc-content__table {
  position: relative;
  width: 100%;
}

.acc-content__pagination {
  margin-top: 46px;
}

.acc-content__info {
  display: flex;
  flex-direction: column;
  width: 448px;
}
</style>
