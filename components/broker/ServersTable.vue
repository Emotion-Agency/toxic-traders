<script setup lang="ts">
import type { iBroker } from '~/types/broker/broker'

interface iProps {
  servers: iBroker[]
}

defineProps<iProps>()

const isOpenedServersModal = ref(false)
const headerFields = ['Servers MT4', 'Servers MT5']

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
</script>

<template>
  <div class="servers-table">
    <Table>
      <TableHead :header-fields="headerFields" />
      <TableBody>
        <TableRow v-for="(broker, idx) in servers" :key="idx">
          <TableCell
            v-for="(item, id, index) in broker"
            :key="id"
            :item="item"
            :class="`table-cell--${index}`"
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
