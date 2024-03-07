<script setup lang="ts">
import type { iBroker } from '~/types/brokers'

interface iProps {
  brokersList: iBroker[]
}

defineProps<iProps>()
</script>

<template>
  <tbody>
    <TableRow v-for="(broker, idx) in brokersList" :key="idx">
      <TableCell v-for="(item, id) in broker" :key="id" :broker="item" />
    </TableRow>
  </tbody>
</template>
