<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokers: iBroker[]
  isSearchOpened: boolean
  headingFields: string[] | []
}

const props = defineProps<iProps>()
const $table = ref<HTMLElement | null>(null)
const isFullWidth = ref(false)
const observer = ref<MutationObserver>(null)

const detectTableWidth = () => {
  const $container = $table.value.closest('.brokers__wrapper') as HTMLElement
  const $tableBody = $table.value.querySelector('.table-body') as HTMLElement

  const containerWidth = $container.offsetWidth
  const bodyWidth = $tableBody.offsetWidth

  isFullWidth.value = bodyWidth <= containerWidth

  console.log(containerWidth, bodyWidth)
}

onMounted(() => {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  }

  const callback = () => {
    detectTableWidth()
  }

  observer.value = new MutationObserver(callback)

  observer.value.observe($table.value, config)
})

onBeforeUnmount(() => {
  observer.value.disconnect()
})

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
  <div ref="$table" class="table" :class="isFullWidth && 'table--full-width'">
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
                    url: `/brokers/${broker.id}`,
                    text: broker.companyNames,
                  }
                : null
            "
          />
        </TableRow>
      </TableBody>
    </div>
  </div>
</template>
