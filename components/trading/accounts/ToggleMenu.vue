<script lang="ts" setup>
import type { ICurrencyData } from '~/types/trading-accounts/balancesProfits'
import type { ISummary } from '~/types/trading-accounts/tradingAccounts'

interface IProps {
  isLoading?: boolean
  summary: ISummary | null
}

const props = defineProps<IProps>()

const selectedTab = ref<'profit' | 'total'>('profit')
const sortState = ref<ISortState | null>(null)

const sortData = <T extends Record<string, any>>(
  data: T[],
  sort: ISortState | null
): T[] => {
  if (!sort) return data

  const { sortBy, sortOrder } = sort

  return [...data].sort((a, b) =>
    sortOrder === 1
      ? a[sortBy] > b[sortBy]
        ? 1
        : -1
      : a[sortBy] < b[sortBy]
        ? 1
        : -1
  )
}

const profitData = computed<ICurrencyData[]>(() => {
  if (!props.summary?.totalProfits) return []
  return sortData([props.summary.totalProfits], sortState.value)
})

const totalData = computed<ICurrencyData[]>(() => {
  if (!props.summary?.totalBalances) return []
  return sortData([props.summary.totalBalances], sortState.value)
})

const activeData = computed(() =>
  selectedTab.value === 'profit' ? profitData.value : totalData.value
)

const onSort = (state: ISortState) => {
  sortState.value = state
}
</script>

<template>
  <div class="acc-toggle-menu">
    <UiLoader v-if="isLoading" class="acc-toggle-menu__loader" />
    <div v-else class="acc-toggle-menu__content">
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
        <TradingAccountsSwitchTable
          v-if="activeData.length"
          :balance="activeData"
          @sort="onSort"
        />
      </div>
    </div>
  </div>
</template>
