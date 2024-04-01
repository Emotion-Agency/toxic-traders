<script setup lang="ts">
import type { iBroker } from '~/types/broker/broker'

interface iProps {
  brokers: iBroker[]
  isSearchOpened: boolean
  headingFields: string[] | []
}

const props = defineProps<iProps>()

// onMounted(() => {
//   console.log(
//     props.brokers.map(broker => {
//       return {
//         ...broker,
//         companyNames: {
//           text: broker.companyNames,
//           url: `/brokers/${broker.companyNames}`,
//         },
//       }
//     })
//   )
// })

// const updatedBrokers = computed(() => {
//   return props.brokers.map(broker => adapter(broker))
// })

const formattedHeadingFields = computed(() => {
  return props.headingFields.map(field => formatNameToNormalCase(field))
})
</script>

<template>
  <Table>
    <TableHead :header-fields="formattedHeadingFields" />
    <TableBody>
      <TableRow v-for="(broker, idx) in brokers" :key="idx">
        <TableCell
          v-for="(item, id, index) in broker"
          :key="id"
          :item="item"
          :class="`table-cell--${index}`"
          :link="
            broker.companyNames === item
              ? {
                  url: `/brokers/${broker.id}`,
                  text: broker.companyNames,
                }
              : null
          "
        />
      </TableRow>
    </TableBody>
  </Table>
</template>
~/types/broker/brokers
