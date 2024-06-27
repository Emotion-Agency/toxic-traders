<script setup lang="ts">
import Clock from '~/components/icons/Clock.vue'
import type { iBrokerServerAccountTable } from '~/types/broker/brokerServerAccountSymbols'

interface iProps {
  tableItems: iBrokerServerAccountTable[]
  headerFields: string[]
  defaultSortBy?: string
}

const props = defineProps<iProps>()

const isOpenedScheduleModals = ref<Array<boolean>>([])
const isOpenedModals = ref<Array<boolean>>([])

const emit = defineEmits(['sort'])

const { sortState, onSort } = useSort(
  {
    sortBy: props.defaultSortBy,
  },
  () => emit('sort', sortState.value)
)

const onModalOpen = (index: number) => {
  isOpenedModals.value[index] = true
  document.body.classList.add('modal-open')
}

const onModalClose = (index: number) => {
  isOpenedModals.value[index] = false
}

const onScheduleOpen = (index: number) => {
  isOpenedScheduleModals.value[index] = true
  document.body.classList.add('modal-open')
}

const onScheduleClose = (index: number) => {
  isOpenedScheduleModals.value[index] = false
}

const notSortableFields = ['schedule']

const isSortable = (field: string) => {
  return !notSortableFields.includes(field)
}
</script>

<template>
  <div class="type-of-account-table">
    <div class="type-of-account-table__wrapper">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              v-for="(headerItem, idx) in headerFields"
              :key="idx"
              :item="formatNameToNormalCase(headerItem)"
              :class="`table-cell--${idx}`"
              :is-sort="isSortable(headerItem)"
              :sort-order="sortState.sortOrder"
              :is-active="sortState.sortBy === headerItem"
              @sort="onSort"
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
              :is-modal="cell === item?.currency"
              :custom-component="cell === item?.schedule ? Clock : null"
              @open="onModalOpen(idx)"
              @click-custom-component="onScheduleOpen(idx)"
            />

            <TheModal
              :modal-opened="isOpenedModals[idx] || false"
              title="Modal"
              @close="onModalClose(idx)"
            >
              Modal {{ item }}
            </TheModal>
            <TheModal
              :modal-opened="isOpenedScheduleModals[idx] || false"
              title="Schedule Modal"
              @close="onScheduleClose(idx)"
            >
              Modal {{ item }}
            </TheModal>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
