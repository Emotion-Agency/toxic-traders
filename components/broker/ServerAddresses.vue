<script setup lang="ts">
import type { iServerAddress } from '~/types/broker/brokerServerAddresses'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const serverAddresses = ref<iServerAddress[]>([])

const { getServerAddresses } = useBrokerServerAddresses()

onMounted(async () => {
  const serverAddressesRequest = await getServerAddresses(props.brokerId)

  if (serverAddressesRequest?.length) {
    serverAddresses.value = serverAddressesRequest
  }
})
</script>

<template>
  <div class="server-addresses">
    <TheAccordion title="Server Addresses" :is-inputs="true">
      <div
        v-for="(item, idx) in serverAddresses"
        :key="idx"
        class="server-addresses__item"
      >
        <p class="server-addresses__text">
          {{ item?.address }}
        </p>
      </div>
      <div v-if="!serverAddresses?.length" class="server-addresses__item">
        <p class="server-addresses__text">Server address is not found</p>
      </div>
    </TheAccordion>
  </div>
</template>
