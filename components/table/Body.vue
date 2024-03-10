<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokersList: iBroker[]
}

defineProps<iProps>()

onMounted(() => {})
</script>

<template>
  <div class="table-body">
    <TableRow v-for="(broker, idx) in brokersList" :key="idx">
      <TableCell
        v-for="(item, id, index) in broker"
        :key="id"
        :item="item"
        :class="`table-cell--${index}`"
        :style="{ width: `${item}px` }"
      />
    </TableRow>
  </div>
</template>
