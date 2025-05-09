<script lang="ts" setup>
import Table from '~/components/Table.vue'
import type { ITradingAccount } from '~/types/trading-accounts/tradingAccounts'

interface IProps {
  accounts: ITradingAccount[]
  defaultSortBy?: string
  defaultSortOrder?: 1 | 2
}

const props = defineProps<IProps>()

const emit = defineEmits(['sort'])

const isLoading = ref(false)
const headings = ['type', 'currency', 'amount']

const formattedHeadingFields = computed(() =>
  headings.map(h => formatNameToNormalCase(h))
)

const { sortState, onSort } = useSort(
  {
    sortBy: props.defaultSortBy,
    sortOrder: props.defaultSortOrder,
  },
  () => {
    emit('sort', {
      ...sortState.value,
    })
  }
)
</script>

<template>
  <div>
    <UiLoader v-if="isLoading" />
    <Table v-else-if="accounts.length" class="switch-table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in formattedHeadingFields"
            :key="idx"
            :item="headerItem"
            :is-sort="true"
            :sort-order="sortState.sortOrder"
            :is-active="
              sortState.sortBy?.toLowerCase() === headerItem?.toLowerCase() ||
              sortState.sortBy?.toLowerCase() ===
                headings[idx]?.toLowerCase() ||
              sortState.sortBy?.toLowerCase() ===
                formattedHeadingFields[idx]?.toLowerCase()
            "
            class="switch-table__cell"
            :class="[`switch-table__cell--${toDashCase(headerItem)}`]"
            :disable-tooltip="true"
            @sort="onSort"
          >
            {{ headerItem }}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="account in accounts"
          :key="account.id"
          :id="account.id"
        >
          <TableCell
            :item="account.name"
            class="switch-table__cell"
            :class="[`switch-table__cell--type`]"
          >
            {{ account.name }}
          </TableCell>
          <TableCell
            :item="account.tradingAccountBalanceFixed"
            class="switch-table__cell"
            :class="[`switch-table__cell--currency`]"
          >
            {{ account.tradingAccountBalanceFixed }}
          </TableCell>
          <TableCell
            :item="account.balanceType"
            class="switch-table__cell"
            :class="[`switch-table__cell--amount`]"
          >
            {{ account.balanceType === 0 ? 'Personal' : 'Investor' }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
