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
    <div class="table__wrapper">
      <table class="table">
        <TableHeader :header-fields="brokersTitle" />
        <TableBody :brokers-list="brokers" />
      </table>
    </div>
  </ClientOnly>
</template>
