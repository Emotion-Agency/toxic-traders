<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

import Table from '../Table.vue'

interface IProps {
  events: ITableCalendarEvent[]
  sortState: {
    sortBy?: string
    sortOrder?: 1 | 2
  }
}

const props = defineProps<IProps>()

const emit = defineEmits(['sort'])

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

const countries = ref([])

interface GroupedByDate {
  [key: string]: ITableCalendarEvent[]
}

const eventsGroupedByDate = computed<GroupedByDate>(() => {
  return props.events.reduce((acc, event) => {
    const date = new Date(event.time).toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})
})

const { getFlags } = useFlags()

onMounted(async () => {
  countries.value = await getFlags()
})

const getCountryFlag = (countryCode: string) => {
  const country = countries.value.find(
    country => country.countryShortName === countryCode
  )
  return country?.countryFlag
}

const isNegative = (number: number | string) => {
  return Number(number) < 0
}

const getNumberVariant = (number: number | string) => {
  if (isNaN(Number(number))) {
    return 'neutral'
  }

  if (Number(number) === 0) {
    return 'neutral'
  }

  if (isNegative(number)) {
    return 'negative'
  }

  return 'positive'
}

const $el = ref<HTMLElement | null>(null)

const { activeEvent } = useCalendarEvents()

onMounted(() => {
  setTimeout(() => {
    if (activeEvent.value) {
      const el = document.getElementById(activeEvent.value?.id?.toString())
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, 200)
})
</script>

<template>
  <div ref="$el">
    <Table class="calendar-table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="heading in headings"
            :key="heading"
            :item="heading"
            :is-sort="heading === 'Time'"
            :sort-order="sortState.sortOrder"
            :is-active="sortState.sortBy === heading"
            class="calendar-table__cell"
            :class="[`calendar-table__cell--${toDashCase(heading)}`]"
            @sort="emit('sort', $event)"
          >
            {{ heading }}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <div v-for="date of Object.keys(eventsGroupedByDate)">
          <div class="calendar-table__date">
            <IconsCalendar />
            {{ date }}
          </div>
          <TableRow
            v-for="event of eventsGroupedByDate[date]"
            :key="event.id"
            :id="event.id"
            :link="{
              url: `/calendar/${event.id}?title=${event.event}&country=${event.country}`,
            }"
            :class="[event.id === activeEvent?.id && 'table-row--active']"
          >
            <TableCell
              :item="event.time"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--time`]"
              tooltip-text="By your local time"
            >
              {{ getDateTime(event.time) }}
            </TableCell>
            <TableCell
              :item="event.event"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--event`]"
            >
              <div class="calendar-table__event">
                <img
                  v-if="getCountryFlag(event.country)?.url"
                  class="calendar-table__flag"
                  :src="getCountryFlag(event.country)?.url"
                  :alt="getCountryFlag(event.country).alt"
                />
                <b>{{ event.country }}</b>
                <span>{{ event.event }}</span>
              </div>
            </TableCell>
            <TableCell
              :item="event.importance"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--impact`]"
              :tooltip-text="`Impact: ${event.importance}`"
            >
              <CalendarImpact :impact="Number(event.importance) as 1 | 2 | 3" />
            </TableCell>
            <TableCell
              :item="event.actual"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--actual`]"
              :disable-tooltip="!event.actual"
            >
              <CalendarTableNumber
                :number="event.actual"
                :variant="getNumberVariant(event.dev)"
                :unit="event.unit"
                :scale="event.scale"
              />
            </TableCell>
            <TableCell
              :item="event.forecast"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--forecast`]"
              :disable-tooltip="!event.forecast"
            >
              <CalendarTableNumber
                :number="event.forecast"
                :unit="event.unit"
                :scale="event.scale"
              />
            </TableCell>
            <TableCell
              :item="event.previous"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--previous`]"
              :disable-tooltip="!event.previous"
            >
              <CalendarTableNumber
                :number="event.previous"
                :unit="event.unit"
                :scale="event.scale"
              />
            </TableCell>
            <TableCell
              :item="event.dev"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--dev+-`]"
              :disable-tooltip="!event.dev"
            >
              <CalendarTableNumber
                :variant="getNumberVariant(event.dev)"
                :number="event.dev"
                :unit="event.unit"
                :scale="event.scale"
              />
            </TableCell>
            <TableCell
              :item="null"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--reaction`]"
            >
              +590 pips
            </TableCell>
            <TableCell
              :item="null"
              class="calendar-table__cell"
              :class="[`calendar-table__cell--show-chart`]"
              :disable-tooltip="true"
            >
              <TheButton
                :to="`/chart/${event.country}/${event.event}`"
                class="calendar-table__button"
                size="small"
                @click.stop.prevent
              >
                <template #start-icon>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.375 0C0.474456 0 0.569839 0.0395088 0.640165 0.109835C0.710491 0.180161 0.75 0.275544 0.75 0.375V11.625C0.75 11.7245 0.710491 11.8198 0.640165 11.8902C0.569839 11.9605 0.474456 12 0.375 12C0.275544 12 0.180161 11.9605 0.109835 11.8902C0.0395088 11.8198 0 11.7245 0 11.625V0.375C0 0.275544 0.0395088 0.180161 0.109835 0.109835C0.180161 0.0395088 0.275544 0 0.375 0V0Z"
                      fill="white"
                    />
                    <path
                      d="M4.875 0.75H1.875C1.66789 0.75 1.5 0.917893 1.5 1.125V1.875C1.5 2.08211 1.66789 2.25 1.875 2.25H4.875C5.08211 2.25 5.25 2.08211 5.25 1.875V1.125C5.25 0.917893 5.08211 0.75 4.875 0.75Z"
                      fill="white"
                    />
                    <path
                      d="M8.625 3.75H3.375C3.16789 3.75 3 3.91789 3 4.125V4.875C3 5.08211 3.16789 5.25 3.375 5.25H8.625C8.83211 5.25 9 5.08211 9 4.875V4.125C9 3.91789 8.83211 3.75 8.625 3.75Z"
                      fill="white"
                    />
                    <path
                      d="M4.5 7.125C4.5 7.02554 4.53951 6.93016 4.60984 6.85983C4.68016 6.78951 4.77554 6.75 4.875 6.75H9.375C9.47446 6.75 9.56984 6.78951 9.64017 6.85983C9.71049 6.93016 9.75 7.02554 9.75 7.125V7.875C9.75 7.97446 9.71049 8.06984 9.64017 8.14017C9.56984 8.21049 9.47446 8.25 9.375 8.25H4.875C4.77554 8.25 4.68016 8.21049 4.60984 8.14017C4.53951 8.06984 4.5 7.97446 4.5 7.875V7.125ZM6 10.125C6 10.0255 6.03951 9.93016 6.10983 9.85983C6.18016 9.78951 6.27554 9.75 6.375 9.75H11.625C11.7245 9.75 11.8198 9.78951 11.8902 9.85983C11.9605 9.93016 12 10.0255 12 10.125V10.875C12 10.9745 11.9605 11.0698 11.8902 11.1402C11.8198 11.2105 11.7245 11.25 11.625 11.25H6.375C6.27554 11.25 6.18016 11.2105 6.10983 11.1402C6.03951 11.0698 6 10.9745 6 10.875V10.125Z"
                      fill="currentColor"
                    />
                  </svg>
                </template>
                Chart
              </TheButton>
            </TableCell>
          </TableRow>
        </div>
      </TableBody>
    </Table>
  </div>
</template>
