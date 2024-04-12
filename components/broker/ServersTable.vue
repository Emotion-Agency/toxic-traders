<script setup lang="ts">
interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const isOpenedServersModal = ref(false)
const headerFields = ['Servers MT4', 'Servers MT5']
const serversList = ref([])
const { getAllBrokerServers } = useBrokerServer()

// const getBrokerServersLink = (broker: iBroker, item: string | number) => {
//   const isMT4Server = broker.brokerServersMT4ServerNames === item
//   const isMT5Server = broker.brokerServersMT5ServerNames === item

//   if (isMT4Server || isMT5Server) {
//     return {
//       url: `/brokers/${broker.id}`,
//       text: isMT4Server
//         ? broker.brokerServersMT4ServerNames
//         : broker.brokerServersMT5ServerNames,
//     }
//   } else {
//     return null
//   }
// }

const serversModalOpen = () => {
  isOpenedServersModal.value = true
}

const serversModalClose = () => {
  isOpenedServersModal.value = false
}

onMounted(async () => {
  const data = await getAllBrokerServers(props.brokerId)

  serversList.value = data?.brokerServers

  console.log(serversList.value)

  const servers = serversList.value.map(item => item.serverType)

  const groupedData = serversList.value.reduce((acc, currentItem) => {
    const serverType = currentItem.serverType
    if (!acc[serverType]) {
      acc[serverType] = []
    }
    acc[serverType].push(currentItem)
    return acc
  }, {})

  // Convert object to array of arrays
  const result = Object.values(groupedData)

  console.log(result)

  // serversMT4List.value = data.brokerServers.filter(
  //   item => item.serverType === 0
  // )

  // serversMT5List.value = data.brokerServers.filter(
  //   item => item.serverType === 1
  // )

  // console.log(serversMT4List.value, serversMT5List.value)
})
</script>

<template>
  <div class="servers-table">
    <Table>
      <TableHead :header-fields="headerFields" />
      <TableBody>
        <TableRow v-for="(item, idx) in serversList" :key="idx">
          <TableCell
            v-if="item.serverType === 0"
            :item="item.serverName"
            :class="`table-cell--${idx}`"
            :is-modal="true"
            @open="serversModalOpen"
          />

          <TableCell
            v-if="item.serverType === 1"
            :item="item.serverName"
            :class="`table-cell--${idx}`"
            :is-modal="true"
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
      servers modal
    </TheModal>
  </div>
</template>
