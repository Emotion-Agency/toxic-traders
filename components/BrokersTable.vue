<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokers: iBroker[]
}

const props = defineProps<iProps>()

const brokersTitle = ref<string[] | []>([])

onMounted(() => {
  brokersTitle.value = formatBrokerNames(props.brokers[0])
})
</script>

<template>
  <ClientOnly>
    <div class="table">
      <div class="table__container">
        <div class="table__wrapper">
          <TableHead :header-fields="brokersTitle" />
          <TableBody :brokers-list="brokers" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
