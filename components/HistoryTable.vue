<script setup lang="ts">
import type { iLogItem } from '~/types/logs'

interface iProps {
  logs: iLogItem[]
}

defineProps<iProps>()

const headerFields = ['ID', 'Message', 'Timestamp', 'Level']
</script>

<template>
  <Table :with-log="true">
    <TableHead :header-fields="headerFields" />
    <TableBody>
      <TableRow v-for="(log, idx) in logs" :key="idx">
        <TableCell
          v-for="(item, id, index) in log"
          :key="id"
          :item="item"
          :class="`table-cell--${index}`"
        />
      </TableRow>
    </TableBody>
  </Table>
</template>
