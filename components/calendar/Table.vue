<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

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
const isLoading = ref(false)

interface GroupedByDate {
  [key: string]: ITableCalendarEvent[]
}

const eventsGroupedByDate = computed<GroupedByDate>(() => {
  return events.value.reduce((acc, event) => {
    const date = new Date(event.time).toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})
})

onMounted(async () => {
  try {
    isLoading.value = true
    await getEvents()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <UiLoader v-if="isLoading" />
    <Table v-show="!isLoading" class="calendar-table">
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
      <TableBody>
        <div
          class="calendar-table__date"
          v-for="date of Object.keys(eventsGroupedByDate)"
        >
          <div>{{ date }}</div>
          <TableRow v-for="(event, idx) of eventsGroupedByDate[date]">
            <TableCell
              :item="event.time"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--time`]"
            >
              {{ getDateTime(event.time) }}
            </TableCell>
            <TableCell
              :item="event.event"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--event`]"
            >
              {{ event.country }} {{ event.event }}
            </TableCell>
            <TableCell
              :item="event.importance"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--impact`]"
            >
              {{ event.importance }}
            </TableCell>
            <TableCell
              :item="event.actual"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--actual`]"
            >
              {{ event.actual }}
            </TableCell>
            <TableCell
              :item="event.forecast"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--forecast`]"
            >
              {{ event.forecast }}
            </TableCell>
            <TableCell
              :item="event.previous"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--previous`]"
            >
              {{ event.previous }}
            </TableCell>
            <TableCell
              :item="event.dev"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--dev+-`]"
            >
              {{ event.dev }}
            </TableCell>
            <TableCell
              :item="event.dev"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--reaction`]"
            >
              {{ event.dev }}
            </TableCell>
            <TableCell
              :item="event.dev"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--show-chart`]"
            >
              {{ event.dev }}
            </TableCell>
          </TableRow>
        </div>
      </TableBody>
    </Table>
  </div>
</template>
