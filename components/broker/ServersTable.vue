<script setup lang="ts">
import type { iBrokerServer } from '~/types/broker/brokerServer'
interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const isOpenedServersModal = ref(false)
const headerFields = ['Servers MT4', 'Servers MT5']
const serversList = ref<iBrokerServer[]>([])
const { getAllBrokerServers } = useBrokerServer()

const serversModalOpen = () => {
  isOpenedServersModal.value = true
}

const serversModalClose = () => {
  isOpenedServersModal.value = false
}

onMounted(async () => {
  const data = await getAllBrokerServers(props.brokerId)

  serversList.value = data?.brokerServers
})

const serversConvertedList = computed(() => {
  return serversList.value.map(item => {
    const type0 = item.serverType === 0 ? item : null
    const type1 = item.serverType === 1 ? item : null
    return [type0, type1]
  })
})
</script>

<template>
  <div class="servers-table">
    <Table>
      <TableHead :header-fields="headerFields" />
      <TableBody>
        <TableRow v-for="(item, idx) in serversConvertedList" :key="idx">
          <TableCell
            v-for="(cell, i) in item"
            :key="i"
            :item="cell?.serverName || 'N/A'"
            :class="`table-cell--${i}`"
            :is-modal="!!cell?.serverName"
            @open="serversModalOpen"
          />
        </TableRow>
      </TableBody>
    </Table>
    <TheButton
      tag="button"
      button-size="small"
      variant="fill"
      class="servers-table__btn"
      >Show more</TheButton
    >
    <TheModal
      :modal-opened="isOpenedServersModal"
      title="Server info"
      @close="serversModalClose"
    >
      <ul class="servers-table__modal-list">
        <li class="servers-table__modal-item">
          <p class="servers-table__modal-numbers">127.0.0.1:443</p>
          <p class="servers-table__modal-text">Data Center LD4</p>
        </li>
      </ul>
    </TheModal>
  </div>
</template>
