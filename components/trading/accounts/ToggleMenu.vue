<script lang="ts" setup>
import { getBalancesProfits } from '~/utils/api/trading-accounts/balancesProfits'

const router = useRouter()
const route = useRoute()

const sortedBy = ref((route.query?.sortedBy as string) ?? 'name')
const sortedOrder = ref<1 | 2>(1)
const profitData = ref<Record<string, number>[]>([])
const totalData = ref<Record<string, number>[]>([])
const selectedTab = ref<'profit' | 'total'>('profit')
const isLoading = ref(false)

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
}

onMounted(async () => {
  try {
    isLoading.value = true
    const { totalProfits, totalBalances } = await getBalancesProfits()
    profitData.value.push(totalProfits)
    totalData.value.push(totalBalances)
  } catch (error) {
    console.error('Error fetching balances and profits:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="acc-toggle-menu">
    <div class="acc-toggle-menu__btns">
      <TheButton
        class="acc-toggle-menu__btn"
        :class="{ 'acc-toggle-menu__btn--active': selectedTab === 'profit' }"
        tag="button"
        button-size="small"
        variant="fill"
        @click="selectedTab = 'profit'"
      >
        Profit
      </TheButton>
      <TheButton
        class="acc-toggle-menu__btn"
        :class="{ 'acc-toggle-menu__btn--active': selectedTab === 'total' }"
        tag="button"
        button-size="small"
        variant="fill"
        @click="selectedTab = 'total'"
      >
        Total
      </TheButton>
    </div>
    <div class="acc-toggle-menu__tables">
      <UiLoader v-if="isLoading" class="acc-toggle-menu__loader" />
      <div v-else-if="profitData.length || totalData.length">
        {{ selectedTab === 'profit' ? profitData : totalData }}
      </div>

      <!-- <TradingAccountsSwitchTable
        :accounts="profitData || totalData"
        :default-sort-by="sortedBy"
        :default-sort-order="sortedOrder"
        @sort="onSort"
      /> -->
    </div>
  </div>
</template>
