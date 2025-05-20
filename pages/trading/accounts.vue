<script setup lang="ts">
import type {
  ICreateTradingAccountPayload,
  ITradingAccount,
  ITradingAccountWithBalance,
} from '~/types/trading-accounts/tradingAccounts'
import { getBalancesProfits } from '~/utils/api/trading-accounts/balancesProfits'

const router = useRouter()
const route = useRoute()

const {
  getAllTradingAccounts,
  deleteTradingAccount,
  getTradingAccount,
  createTradingAccount,
} = useTradingAccounts()

const { updateCurrBalance } = useBalances()
const { toast } = useToasts()

const accounts = ref<ITradingAccountWithBalance[]>([])
const selectedAccount = ref<ITradingAccount | null>(null)
const deleteModalOpened = ref(false)
const createAccountModalOpened = ref(false)
const isLoading = ref(false)

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

const fetchAllAccounts = async () => {
  try {
    isLoading.value = true

    const { items, totalCount } = await getAllTradingAccounts({
      page: currentPage.value,
      count: itemsCount.value,
    })

    const { balancesProfits } = await getBalancesProfits()

    accounts.value = items.map(account => {
      const balance = balancesProfits.find(
        balance => balance?.tradingAccountId === account?.id
      )

      return {
        id: account?.id,
        status: balance?.onlineStatus,
        ping: balance?.lastPing,
        name: account?.name,
        balance: balance?.balance,
        currency: balance?.currency,
        type: balance?.balanceType,
        platform: account?.brokerServerType,
      }
    })

    totalCountPages.value = totalCount
  } finally {
    isLoading.value = false
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

const handleCreateAccount = async (acc: ICreateTradingAccountPayload) => {
  await createTradingAccount(acc)
  await fetchAllAccounts()
  createAccountModalOpened.value = false
}

const handleCheckConnection = async (id: number) => {
  await updateCurrBalance(id)
}

const handleCheckAccounts = async () => {
  await fetchAllAccounts()
  toast.success('Accounts successfully checked.')
}

const handleDeleteServer = async () => {
  if (!selectedAccount.value) return

  await deleteTradingAccount(selectedAccount.value?.id)
  await fetchAllAccounts()

  deleteModalOpened.value = false
  selectedAccount.value = null
}

watch([currentPage, itemsCount], async () => {
  await fetchAllAccounts()

  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

onMounted(async () => {
  await fetchAllAccounts()
})
</script>

<template>
  <main class="container">
    <section class="hero-accounts">
      <div class="hero-accounts__wrapper">
        <h1 class="hero-accounts__title">Accounts</h1>
        <div class="hero-accounts__btns">
          <TheButton
            tag="button"
            class="hero-accounts__btn"
            @click="handleCreateAccountModalOpen"
          >
            <template #start-icon>
              <IconsPlus />
            </template>
            Add account
          </TheButton>
          <TheButton
            tag="button"
            variant="outlined"
            class="hero-accounts__btn"
            @click="handleCheckAccounts"
          >
            <template #start-icon>
              <IconsSuccess />
            </template>
            Check accounts
          </TheButton>
          <TheButton
            tag="button"
            variant="outlined"
            class="hero-accounts__btn"
            disabled
          >
            <template #start-icon>
              <IconsPlus />
            </template>
            Add investor account
          </TheButton>
        </div>
      </div>
    </section>
    <section class="acc-content">
      <div class="acc-content__wrapper">
        <div class="acc-content__table">
          <UiLoader v-if="isLoading" class="acc-content__loader" />
          <div v-else-if="accounts.length" class="acc-content__table-wrapper">
            <TradingAccountsTable
              :accounts="accounts"
              @sort="onSort"
              @delete="handleDeleteModalOpen"
              @check="handleCheckConnection"
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
        </div>
        <div class="acc-content__info">
          <TradingAccountsToggleMenu />
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
  </main>
</template>
