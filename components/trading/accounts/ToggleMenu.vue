<script lang="ts" setup>
const router = useRouter()
const route = useRoute()

const sortedBy = ref((route.query?.sortedBy as string) ?? 'name')
const sortedOrder = ref<1 | 2>(1)
const profitData = ref(['Profit'])
const totalData = ref(['Total'])
const selectedTab = ref<'profit' | 'total'>('profit')

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
      {{ selectedTab === 'profit' ? profitData : totalData }}
      <!-- <TradingAccountsSwitchTable
        :accounts="profitData || totalData"
        :default-sort-by="sortedBy"
        :default-sort-order="sortedOrder"
        @sort="onSort"
      /> -->
    </div>
  </div>
</template>
