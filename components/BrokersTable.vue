<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokers: iBroker[]
  isSearchOpened: boolean
  headingFields: string[] | []
}

const props = defineProps<iProps>()

onMounted(() => {
  console.log(
    props.brokers.map(broker => {
      return {
        ...broker,
        companyNames: {
          text: broker.companyNames,
          url: `/brokers/${broker.companyNames}`,
        },
      }
    })
  )
})

const formattedHeadingFields = computed(() => {
  return props.headingFields.map(field => formatNameToNormalCase(field))
})
</script>

<template>
  <ClientOnly>
    <div class="table">
      <div class="table__wrapper">
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
                      url: `/brokers/${broker.companyNames}`,
                      text: broker.companyNames,
                    }
                  : null
              "
            />
          </TableRow>
        </TableBody>
      </div>
    </div>
  </ClientOnly>
</template>
