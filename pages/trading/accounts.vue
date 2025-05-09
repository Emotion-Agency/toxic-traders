<script setup lang="ts">
import type {
  ITradingAccount,
  ITradingAccountWithBalance,
} from '~/types/trading-accounts/tradingAccounts'
import { getBalancesProfits } from '~/utils/api/trading-accounts/balancesProfits'

const router = useRouter()
const route = useRoute()

const { getAllTradingAccounts, deleteTradingAccount, getTradingAccount } =
  useTradingAccounts()

const accounts = ref<ITradingAccountWithBalance[]>([])
const newAccounts = ref([])

const isLoading = ref(false)
const sortedBy = ref((route.query?.sortedBy as string) ?? 'name')
const sortedOrder = ref<1 | 2>(1)

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
      sortBy: removeSpaces(formatToSnakeCase(sortedBy.value)),
      sortOrder: sortedOrder.value,
    })

    const { balancesProfits } = await getBalancesProfits()

    accounts.value = items.map(account => {
      const balance = balancesProfits.find(
        balance => balance.tradingAccountId === account.id
      )

      if (!balance) return

      return {
        id: account.id,
        status: balance.onlineStatus,
        ping: balance.lastPing,
        name: account.name,
        balance: balance.balance,
        currency: balance.currency,
        type: balance.balanceType,
        platform: account.brokerServerType,
      }
    })

    console.log(accounts.value)

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

  await fetchAllAccounts()
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
          <TheButton tag="button" class="hero-accounts__btn">
            <template #start-icon>
              <IconsPlus />
            </template>
            Add account
          </TheButton>
          <TheButton tag="button" variant="outlined" class="hero-accounts__btn">
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
          <UiLoader v-if="isLoading" />
          <div v-else-if="accounts.length" class="acc-content__table-wrapper">
            <TradingAccountsTable
              :accounts="accounts"
              :default-sort-by="sortedBy"
              :default-sort-order="sortedOrder"
              @sort="onSort"
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
  </main>
</template>
