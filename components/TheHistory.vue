<script setup lang="ts">
import type { iLogs } from '~/types/logs'

interface iProps {
  logs: iLogs[]
}

defineProps<iProps>()
</script>

<template>
  <div class="history">
    <HistoryTable :logs="logs" />
  </div>
</template>
