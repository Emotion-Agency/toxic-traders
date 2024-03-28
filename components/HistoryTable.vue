<script setup lang="ts">
import type { iLogs } from '~/types/logs'

interface iProps {
  logs: iLogs[]
}

defineProps<iProps>()

const headerFields = ['ID', 'Message', 'Timestamp', 'Level']
</script>

<template>
  <div class="table">
    <div class="table__wrapper">
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
    </div>
  </div>
</template>
