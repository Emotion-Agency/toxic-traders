<script setup lang="ts">
import type { iServerAddress } from '~/types/broker/brokerServerAddresses'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const serverAddresses = ref<iServerAddress[]>([])
const showAllAddresses = ref(false)
const filteredServerAddresses = computed(() => {
  return serverAddresses.value.filter(item => {
    if (showAllAddresses.value === false) {
      return serverAddresses.value[0] === item
    } else {
      return serverAddresses.value
    }
  })
})

const { getServerAddresses } = useBrokerServerAddresses()

const showMoreServerAddresses = () => {
  showAllAddresses.value = true
}

const showLessServerAddresses = () => {
  showAllAddresses.value = false
}

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
        v-for="(item, idx) in filteredServerAddresses"
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

      <OptionalButton
        v-if="serverAddresses.length > 1 && !showAllAddresses"
        @on-click="showMoreServerAddresses"
        >Show more</OptionalButton
      >
      <OptionalButton
        v-if="filteredServerAddresses.length > 1"
        @on-click="showLessServerAddresses"
        >Show less</OptionalButton
      >
    </TheAccordion>
  </div>
</template>
