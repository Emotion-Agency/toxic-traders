<script lang="ts" setup>
import Table from '~/components/Table.vue'
import type { ITradingAccountWithBalance } from '~/types/trading-accounts/tradingAccounts'

interface IProps {
  accounts: ITradingAccountWithBalance[]
}

defineProps<IProps>()

const emit = defineEmits(['sort', 'delete', 'update', 'check'])

const headings = [
  'status',
  'ping',
  'name',
  'balance',
  'currency',
  'type',
  'platform',
  'actions',
]

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

const notSortableFields = ['Actions']

const isSortable = (field: string) => {
  return !notSortableFields.includes(field)
}

const serverStatus = (status?: number) =>
  ({
    0: { id: 'offline', text: 'Offline' },
    1: { id: 'online', text: 'Online' },
  })[status!] ?? { id: 'unknown', text: 'Offline' }
</script>

<template>
  <div>
    <Table class="accounts-table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in formattedHeadingFields"
            :key="idx"
            :item="headerItem"
            :is-sort="isSortable(headerItem)"
            :sort-order="sortState.sortOrder"
            :is-active="
              sortState.sortBy?.toLowerCase() === headerItem?.toLowerCase() ||
              sortState.sortBy?.toLowerCase() ===
                headings[idx]?.toLowerCase() ||
              sortState.sortBy?.toLowerCase() ===
                formattedHeadingFields[idx]?.toLowerCase()
            "
            class="accounts-table__cell"
            :class="[`accounts-table__cell--${toDashCase(headerItem)}`]"
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
          :key="account?.id"
          :id="account?.id"
        >
          <TableCell
            :item="account?.status"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--status`]"
            :disable-tooltip="true"
          >
            <div
              class="accounts-table__status"
              :class="`accounts-table__status--${serverStatus(account?.status)?.id?.toLowerCase()}`"
            >
              <span />
              <p class="accounts-table__status-text">
                {{ serverStatus(account?.status)?.text }}
              </p>
            </div>
          </TableCell>
          <TableCell
            :item="account?.ping"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--ping`]"
          >
            {{ account?.ping || 'N/A' }}{{ !account?.ping ? '' : 'ms' }}
          </TableCell>
          <TableCell
            :item="account?.name"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--name`]"
          >
            {{ account?.name || 'N/A' }}
          </TableCell>
          <TableCell
            :item="account?.balance"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--balance`]"
          >
            {{ account?.balance || 'N/A' }}
          </TableCell>
          <TableCell
            :item="account?.currency"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--currency`]"
          >
            {{ account?.currency || 'N/A' }}
          </TableCell>
          <TableCell
            :item="account?.type"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--type`]"
          >
            {{ account?.type || 'N/A' }}
          </TableCell>
          <TableCell
            :item="account?.platform"
            class="accounts-table__cell"
            :class="[`accounts-table__cell--platform`]"
          >
            {{ account?.platform === 0 ? 'MT4' : 'MT5' }}
          </TableCell>
          <TableCell
            class="accounts-table__cell"
            :class="[`accounts-table__cell--actions`]"
            :disable-tooltip="true"
          >
            <TradingAccountsActionDropdown
              @delete="emit('delete', account?.id)"
              @check="emit('check', account?.id)"
              @update="emit('update', account?.id)"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
