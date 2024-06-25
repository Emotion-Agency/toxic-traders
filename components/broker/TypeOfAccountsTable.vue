<script setup lang="ts">
import type {
  iBrokerServerAccountSymbolsMT4,
  iBrokerServerAccountSymbolsMT5,
} from '~/types/broker/brokerServerAccountSymbols'

interface iProps {
  accountId: number
  serverType: number | null
}

const props = defineProps<iProps>()

const { getServerAccountSymbolsMT4, getServerAccountSymbolsMT5 } =
  useBrokerServerAccountSymbols()
const headerFields = ref<string[]>([])

const serverAccountSymbolsMT4 = ref<iBrokerServerAccountSymbolsMT4[]>([])
const serverAccountSymbolsMT5 = ref<iBrokerServerAccountSymbolsMT5[]>([])
const isLoading = ref(true)

const tableItems = computed(() => {
  if (serverAccountSymbolsMT4.value.length) {
    return serverAccountSymbolsMT4.value.map(item => {
      return {
        currency: item.marginCurrency,
        description: item.description,
        // schedule: item.,
        digits: item.digits,
        contractSize: item.contractSize,
        minLots: item.minLot,
        maxLots: item.maxLot,
        spread: item.spread,
        newsSpread: item.newsSpread,
        tickSize: item.tickSize,
        // commision: item.,
        // id: item.,
        lotsStep: item.lotStep,
        tradeMode: item.tradeMode,
        // fillPolicy: item.,
        // isin: item.,
      }
    })
  }

  if (serverAccountSymbolsMT5.value.length) {
    return serverAccountSymbolsMT5.value.map(item => {
      return {
        currency: item.marginCurrency,
        description: item.description,
        // schedule: item.,
        digits: item.digits,
        contractSize: item.contractSize,
        minLots: item.minLots,
        maxLots: item.maxLots,
        spread: item.spread,
        newsSpread: item.newsSpread,
        tickSize: item.tickSize,
        commision: item.brokerServerAccountSymbolMT5CommissionsInfo,
        // id: item.,
        lotsStep: item.lotsStep,
        tradeMode: item.tradeMode,
        fillPolicy: item.fillPolicy,
        isin: item.isin,
      }
    })
  }

  return []
})

watch(
  () => props.serverType,
  async () => {
    try {
      isLoading.value = true
      if (props.serverType === 0) {
        serverAccountSymbolsMT4.value = await getServerAccountSymbolsMT4(
          props.accountId
        )
      }

      if (props.serverType === 1) {
        serverAccountSymbolsMT5.value = await getServerAccountSymbolsMT5(
          props.accountId
        )
      }
    } finally {
      isLoading.value = false
    }

    headerFields.value = Object.keys(tableItems.value[0])
  }
)

const onModalOpen = () => {}
</script>

<template>
  <div class="type-of-account-table">
    <div v-if="!isLoading" class="type-of-account-table__wrapper">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              v-for="(headerItem, idx) in headerFields"
              :key="idx"
              :item="formatNameToNormalCase(headerItem)"
              :class="`table-cell--${idx}`"
              :is-sort="true"
            />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow v-for="(item, idx) in tableItems" :key="idx">
            <TableCell
              v-for="(cell, i) in item"
              :key="i"
              :item="cell || 'N/A'"
              :class="`table-cell--${i}`"
              @open="onModalOpen"
            />
          </TableRow>
        </TableBody>
      </Table>
      <!-- <ThePagination
        class="type-of-account-table__pagination"
        :total-pages="totalCountPages"
        :current-page="currentPage"
        :options="['25 rows', '50 rows', '100 rows']"
        :items-count="itemsCount"
        :input-value="searchValue"
        input-id="brokers-navigation"
        input-name="Brokers navigation"
        @next-click="nextPageClick"
        @prev-click="prevPageClick"
        @selected-item="onChangeCount"
        @on-blur-value="onInputBlur"
        @on-change-value="onInputChange"
      /> -->
    </div>
    <UiLoader v-else />
  </div>
</template>
