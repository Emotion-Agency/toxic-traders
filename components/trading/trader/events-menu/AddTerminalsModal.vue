<script lang="ts" setup>
import type { ITradingAccount } from '~/types/trading-accounts/tradingAccounts'

interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close', 'next'])

const { getAllTradingAccounts } = useTradingAccounts()

const tradingAccounts = ref<ITradingAccount[]>([])
const isLoading = ref(false)
const headerFields = ['Checkbox', 'Server', 'Balance', 'Type']

const selectedAccounts = ref<ITradingAccount[]>([])

const isAllSelected = computed(
  () =>
    tradingAccounts.value.length > 0 &&
    tradingAccounts.value.every(acc =>
      selectedAccounts.value.some(a => a?.id === acc?.id)
    )
)

const fetchTradingAccounts = async () => {
  try {
    isLoading.value = true
    const { items } = await getAllTradingAccounts()

    tradingAccounts.value = items
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = () => {
  emit('next', selectedAccounts.value)
}

const handleCreateModalClose = () => {
  emit('close')
}

const toggleSelectAllAccounts = (payload: {
  value: string
  isChecked: boolean
}) => {
  selectedAccounts.value = payload.isChecked ? [...tradingAccounts.value] : []
}

const toggleSelectAccount = (
  payload: { value: string; isChecked: boolean },
  account: ITradingAccount
) => {
  selectedAccounts.value = payload.isChecked
    ? [...selectedAccounts.value, account]
    : selectedAccounts.value.filter(a => a.id !== account.id)
}

const onSorted = () => {
  tradingAccounts.value = tradingAccounts.value.sort((a, b) => {
    if (sortState.value.sortOrder === 1) {
      return a[sortState.value.sortBy] > b[sortState.value.sortBy] ? 1 : -1
    } else {
      return a[sortState.value.sortBy] < b[sortState.value.sortBy] ? 1 : -1
    }
  })
}

const { sortState, onSort } = useSort(
  {
    sortBy: 'ID',
  },
  onSorted
)

onMounted(async () => {
  await fetchTradingAccounts()
})
</script>

<template>
  <SlidingModal
    :modal-opened="modalOpened"
    title="Add terminals"
    @close="handleCreateModalClose"
  >
    <form novalidate @submit.prevent="handleSubmit" class="add-terminals-modal">
      <div class="add-terminals-modal__modal-content">
        <UiLoader v-if="isLoading" class="calendar-chart__loader" />
        <Table v-else-if="tradingAccounts.length">
          <TableHead>
            <TableRow>
              <TableCell
                v-for="(headerItem, idx) in headerFields"
                :key="idx"
                :item="headerItem"
                :class="[
                  `table-cell--${idx}`,
                  `table-cell--${headerFields[idx]}`,
                ]"
                :is-sort="headerItem.toLowerCase() !== 'checkbox'"
                :sort-order="sortState.sortOrder"
                :is-active="
                  sortState.sortBy?.toLowerCase() ===
                    headerItem?.toLowerCase() ||
                  sortState.sortBy?.toLowerCase() ===
                    headerFields[idx]?.toLowerCase()
                "
                disable-tooltip
                @sort="onSort"
              >
                <div
                  v-if="headerItem.toLowerCase() === 'checkbox'"
                  class="table-cell__checkbox"
                >
                  <InputCheckbox
                    name="Choose all terminals"
                    value=""
                    :id="`table-cell-${headerFields[idx]}`"
                    :checked="isAllSelected"
                    @input-value="toggleSelectAllAccounts"
                  />
                </div>
                <div v-else>
                  {{ headerItem }}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow v-for="(account, idx) in tradingAccounts" :key="idx">
              <TableCell
                item="choose"
                :disable-tooltip="true"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                <InputCheckbox
                  name="Choose terminal"
                  value=""
                  :id="`access-${account.id}`"
                  :checked="selectedAccounts.some(a => a.id === account.id)"
                  @input-value="
                    payload => toggleSelectAccount(payload, account)
                  "
                />
              </TableCell>
              <TableCell
                :item="account?.brokerServer"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                {{ account?.brokerServer || 'N/A' }}
              </TableCell>
              <TableCell
                :item="account?.tradingAccountBalanceFixed"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                {{ account?.tradingAccountBalanceFixed || 'N/A' }}
              </TableCell>
              <TableCell
                :item="account?.brokerServerType"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                {{
                  account?.brokerServerType === 1
                    ? 'MT5'
                    : account?.brokerServerType === 0
                      ? 'MT4'
                      : 'N/A'
                }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="add-terminals-modal__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="handleCreateModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          type="submit"
          :disabled="!selectedAccounts.length"
        >
          Next
        </TheButton>
      </div>
    </form>
  </SlidingModal>
</template>
