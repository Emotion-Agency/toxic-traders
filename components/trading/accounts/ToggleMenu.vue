<script lang="ts" setup>
import { getBalancesProfits } from '~/utils/api/trading-accounts/balancesProfits'
import type { ICurrencyData } from '~/types/trading-accounts/balancesProfits'

const profitData = ref<ICurrencyData[]>([])
const totalData = ref<ICurrencyData[]>([])
const selectedTab = ref<'profit' | 'total'>('profit')
const isLoading = ref(false)

const onSort = async (sortState: ISortState) => {
  if (selectedTab.value === 'profit') {
    profitData.value = profitData.value.sort((a, b) => {
      if (sortState.sortOrder === 1) {
        return a[sortState.sortBy] > b[sortState.sortBy] ? 1 : -1
      } else {
        return a[sortState.sortBy] < b[sortState.sortBy] ? 1 : -1
      }
    })
  } else {
    totalData.value = totalData.value.sort((a, b) => {
      if (sortState.sortOrder === 1) {
        return a[sortState.sortBy] > b[sortState.sortBy] ? 1 : -1
      } else {
        return a[sortState.sortBy] < b[sortState.sortBy] ? 1 : -1
      }
    })
  }
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

      <TradingAccountsSwitchTable
        v-else-if="profitData.length || totalData.length"
        :balance="selectedTab === 'profit' ? profitData : totalData"
        @sort="onSort"
      />
    </div>
  </div>
</template>
