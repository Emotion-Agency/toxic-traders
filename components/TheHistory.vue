<script setup lang="ts">
import { getLogs } from '~/api/logs/getLogs'
import type { iLogItem } from '~/types/logs'

const logs = ref<iLogItem[]>([])
const currentPage = ref(1)
const totalCountPages = ref(0)
const itemsCount = ref(10)

onMounted(async () => {
  const data = await getLogs(currentPage.value, itemsCount.value, 'message', 1)

  logs.value = data.logs
})
</script>

<template>
  <div class="history">
    <HistoryTable v-if="logs?.length" :logs="logs" />
  </div>
</template>
