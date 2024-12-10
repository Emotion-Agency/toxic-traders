<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

interface IProps {
  event: ITableCalendarEvent
}

const props = defineProps<IProps>()

onMounted(() => {
  console.log(props.event)
})
</script>

<template>
  <button @click.stop.prevent class="calendar-table__reaction">
    +590 pips
  </button>
</template>
