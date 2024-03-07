<script setup lang="ts">
import { delayPromise } from '@emotionagency/utils'
import { formatBrokerNames } from '~/assets/scripts/FormatBrokerNames'
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokers: iBroker[]
}

const props = defineProps<iProps>()

const brokersTitle = ref<string[] | []>([])

onMounted(async () => {
  await delayPromise(1000)
  brokersTitle.value = formatBrokerNames(props.brokers[0])
})
</script>

<template>
  <table class="table">
    <TableRowHeader :header-fields="brokersTitle" />
    <TableBody :brokers-list="brokers" />
  </table>
</template>
