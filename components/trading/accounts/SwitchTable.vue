<script lang="ts" setup>
import Table from '~/components/Table.vue'
import type { ICurrencyData } from '~/types/trading-accounts/balancesProfits'

interface IProps {
  balance: ICurrencyData[]
}

defineProps<IProps>()

const emit = defineEmits(['sort'])

const isLoading = ref(false)
const headings = ['currency', 'amount']

const formattedHeadingFields = computed(() =>
  headings.map(h => formatNameToNormalCase(h))
)

const { sortState, onSort } = useSort(
  {
    sortBy: '',
    sortOrder: 1,
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
    <Table v-else-if="balance.length" class="switch-table">
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
        <TableRow v-for="account in balance" :key="account.id" :id="account.id">
          <TableCell
            v-for="([key], idx) in Object.entries(account)"
            :key="idx"
            :item="key"
            class="switch-table__cell"
          >
            {{ key || 'N/A' }}
          </TableCell>
          <TableCell
            v-for="([_, value], idx) in Object.entries(account)"
            :key="idx"
            :item="value"
            class="switch-table__cell"
          >
            {{ trimDecimals(value, 2) || 'N/A' }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
