<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokers: iBroker[]
}

const props = defineProps<iProps>()

const brokersTitle = ref<string[] | []>([])

onMounted(() => {
  brokersTitle.value = formatBrokerNames(props.brokers[0])

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
</script>

<template>
  <ClientOnly>
    <div class="table">
      <div class="table__container">
        <div class="table__wrapper">
          <TableHead :header-fields="brokersTitle" />
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
    </div>
  </ClientOnly>
</template>
