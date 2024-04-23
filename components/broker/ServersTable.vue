<script setup lang="ts">
import type { iBrokerServer } from '~/types/broker/brokerServer'
interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const isOpenedServersModal = ref<Array<boolean>>([])
const headerFields = ['Servers MT4', 'Servers MT5']
const serversList = ref<iBrokerServer[]>([])
const { getAllBrokerServers } = useBrokerServer()

const serversModalOpen = (index: number) => {
  if (!serversConvertedList.value[index]) {
    isOpenedServersModal.value[index] = false
  } else {
    isOpenedServersModal.value[index] = true
  }
}

const serversModalClose = (index: number) => {
  isOpenedServersModal.value[index] = false
}

const serversConvertedList = computed(() => {
  return serversList.value.map(item => {
    const type0 = item.serverType === 0 ? item : null
    const type1 = item.serverType === 1 ? item : null
    return [type0, type1]
  })
})

onMounted(async () => {
  const data = await getAllBrokerServers(props.brokerId)

  serversList.value = data?.brokerServers

  isOpenedServersModal.value = new Array(
    serversConvertedList.value.length
  ).fill(false)

  console.log(serversConvertedList.value)
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
            @open="serversModalOpen(idx)"
          />
          <TheModal
            :modal-opened="isOpenedServersModal[idx]"
            title="Server info"
            @close="serversModalClose(idx)"
          >
            <ul class="servers-table__modal-list">
              <li
                v-for="(address, index) in item"
                :key="index"
                class="servers-table__modal-item"
              >
                <div
                  v-for="ip in address?.brokerServerIPAddresses"
                  :key="ip.ipAddress"
                >
                  <p class="servers-table__modal-numbers">
                    {{ ip.ipAddress }}
                  </p>
                  <p class="servers-table__modal-text">
                    {{ address?.clusterName || 'N/A' }}
                  </p>
                </div>
              </li>
            </ul>
          </TheModal>
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
  </div>
</template>
