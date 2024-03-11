<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokersList: iBroker[]
}

defineProps<iProps>()

// onMounted(() => {
//   const elements = document.querySelectorAll('.table-cell--0')
//   const widthElements = []

//   elements.forEach(el => {
//     widthElements.push(el.offsetWidth)
//   })

//   elements.forEach(el => (el.style.width = `${Math.max(...widthElements)}px`))
// })
</script>

<template>
  <div class="table-body">
    <TableRow v-for="(broker, idx) in brokersList" :key="idx">
      <TableCell
        v-for="(item, id, index) in broker"
        :key="id"
        :item="item"
        :class="`table-cell--${index}`"
        :link="
          broker.companyNames === item && {
            url: broker.companyNames,
            text: broker.companyNames,
          }
        "
      />
    </TableRow>
  </div>
</template>
