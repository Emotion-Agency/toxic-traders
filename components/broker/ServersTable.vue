<script setup lang="ts">
import type { iBrokerServer } from '~/types/broker/brokerServer'
interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getAllBrokerServers } = useBrokerServer()
const isOpenedServersModal = ref<Array<boolean>>([])
const headerFields = ['Servers MT4', 'Servers MT5']
const serversList = ref<iBrokerServer[]>([])
const filteredServersList = ref([])
const serversConvertedList = computed(() => {
  return serversList.value.map(item => {
    const type0 = item.serverType === 0 ? item : null
    const type1 = item.serverType === 1 ? item : null
    return [type0, type1]
  })
})

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

const showMoreServers = () => {
  filteredServersList.value = serversConvertedList.value
}

const showLessServers = () => {
  filteredServersList.value = serversConvertedList.value.slice(0, 5)
  console.log(serversConvertedList.value)
}

onMounted(async () => {
  const data = await getAllBrokerServers(props.brokerId)

  serversList.value = data?.brokerServers

  isOpenedServersModal.value = new Array(
    serversConvertedList.value.length
  ).fill(false)

  showLessServers()
})

watchEffect(() => {
  console.log(serversConvertedList.value)
})
</script>

<template>
  <div class="servers-table">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in headerFields"
            :key="idx"
            :item="headerItem"
            :class="`table-cell--${idx}`"
            :is-sort="true"
          />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="(item, idx) in filteredServersList" :key="idx">
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
            <ul
              v-for="(address, index) in item"
              :key="index"
              class="servers-table__modal-list"
            >
              <li
                v-for="ip in address?.brokerServerIPAddresses"
                :key="ip?.ipAddress"
                class="servers-table__modal-item"
              >
                <p class="servers-table__modal-numbers">
                  {{ ip?.ipAddress }}
                </p>
                <p class="servers-table__modal-text">
                  {{ address?.clusterName || 'N/A' }}
                </p>
              </li>
            </ul>
          </TheModal>
        </TableRow>
      </TableBody>
    </Table>
    <TheButton
      v-if="
        serversConvertedList.length > 5 &&
        filteredServersList.length !== serversConvertedList.length
      "
      tag="button"
      button-size="small"
      variant="fill"
      class="servers-table__btn"
      @click="showMoreServers"
      >Show more</TheButton
    >
    <TheButton
      v-if="filteredServersList.length > 5"
      tag="button"
      button-size="small"
      variant="fill"
      class="servers-table__btn"
      @click="showLessServers"
      >Show less</TheButton
    >
  </div>
</template>
