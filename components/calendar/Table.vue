<script lang="ts" setup>
const headings = [
  'Time',
  'Event',
  'Impact',
  'Actual',
  'Forecast',
  'Previous',
  'Dev+-',
  'Reaction',
  'Show Chart',
]

const { events, getEvents } = useCalendarEvents()

onMounted(async () => {
  // await getEvents()

  console.log(events.value)
})

const toDashCase = (str: string) => str.replace(/\s+/g, '-').toLowerCase()
</script>

<template>
  <Table class="calendar-table">
    <TableHead>
      <TableRow>
        <TableCell
          v-for="heading in headings"
          :key="heading"
          :item="heading"
          :is-sort="heading === 'Time'"
          class="calendar-table__cell"
          :class="[`calendar-table__cell--${toDashCase(heading)}`]"
        >
          {{ heading }}
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody></TableBody>
  </Table>
</template>
