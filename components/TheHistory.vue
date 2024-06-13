<script setup lang="ts">
import { getLogs } from '~/api/logs/getLogs'
import type { iInput } from '~/types'
import type { iLogItem } from '~/types/logs'

const logsList = ref<iLogItem[]>([])
const currentPage = ref(1)
const totalCountPages = ref(0)
const itemsCount = ref(25)
const searchValue = ref<string>('1')

const computedTotalPages = computed(() => {
  return Math.floor(totalCountPages.value / itemsCount.value)
})

const prevPageClick = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPageClick = () => {
  if (currentPage.value < computedTotalPages.value) {
    currentPage.value++
  }
}

const selectItem = (val: string) => {
  itemsCount.value = Number(val)
}

const onChange = (input: iInput) => {
  const inputPage = input.value

  if (Number(inputPage) > computedTotalPages.value) {
    searchValue.value = computedTotalPages.value.toString()
  }
}

const onBlur = (input: iInput) => {
  currentPage.value = Number(input.value)
}

watch([currentPage, itemsCount], async () => {
  let offset = 1

  if (currentPage.value > 1) {
    offset = currentPage.value * itemsCount.value
  }

  if (offset > totalCountPages.value) {
    offset = totalCountPages.value - 1
  }

  console.log(offset, totalCountPages.value)

  const { logs } = await getLogs(offset, itemsCount.value, 'message', 1)

  logsList.value = logs
})

onMounted(async () => {
  const { logs, totalCount } = await getLogs(
    currentPage.value,
    itemsCount.value,
    'message',
    1
  )

  logsList.value = logs
  totalCountPages.value = totalCount
})

const onSort = data => {
  console.log(data)
}
</script>

<template>
  <div class="history">
    <HistoryTable
      v-if="logsList?.length"
      class="history__table"
      :logs="logsList"
      @sort="onSort"
    />
    <ThePagination
      class="history__pagination"
      :total-pages="totalCountPages"
      :current-page="currentPage"
      :options="['25', '50', '100']"
      :items-count="itemsCount"
      :input-value="searchValue"
      input-id="history-table-navigation"
      input-name="History table navigation"
      @next-click="nextPageClick"
      @prev-click="prevPageClick"
      @selected-item="selectItem"
      @on-blur-value="onBlur"
      @on-change-value="onChange"
    />
  </div>
</template>
