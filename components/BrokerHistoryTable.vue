<script setup lang="ts">
import { getBrokerLogs } from '~/api/brokers/getBrokerLogs'
import type { iBrokerLogItem } from '~/types/broker/brokerLogs'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const headerFields = ['ID', 'Message', 'Timestamp', 'Level']
const logsList = ref<iBrokerLogItem[]>([])

onMounted(async () => {
  const { brokerLogs } = await getBrokerLogs(props.brokerId)
  logsList.value = brokerLogs
})
</script>

<template>
  <Table>
    <TableHead :header-fields="headerFields" />
    <TableBody>
      <TableRow v-for="(log, idx) in logsList" :key="idx">
        <TableCell
          v-for="(item, id, index) in log"
          :key="id"
          :item="item"
          :class="`table-cell--${index}`"
        />
      </TableRow>
    </TableBody>
  </Table>
</template>
