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
    <TableHead>
      <TableRow>
        <TableCell
          v-for="(headerItem, idx) in headerFields"
          :key="idx"
          :item="headerItem"
          :class="`table-cell--${idx}`"
          :is-sort="true"
        />
      </TableRow>
    </TableHead>
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
