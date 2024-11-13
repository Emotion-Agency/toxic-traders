<script lang="ts" setup>
import type { iSelectInput } from '~/types'

const dateOptions = ['Today', 'Tomorrow', 'This week', 'Next week']

const selectedDate = ref<string | null>(null)

const startDate = ref<string>()
const endDate = ref<string>()

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

const onSelect = (e: iSelectInput) => {
  selectedDate.value = e.value

  const today = new Date()
  switch (e.value) {
    case 'Today':
      startDate.value = formatDate(today)
      endDate.value = null
      break
    case 'Tomorrow':
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      startDate.value = formatDate(tomorrow)
      endDate.value = null
      break
    case 'This week':
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      startDate.value = formatDate(startOfWeek)
      endDate.value = formatDate(endOfWeek)
      break
    case 'Next week':
      const startOfNextWeek = new Date(today)
      startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()))
      const endOfNextWeek = new Date(startOfNextWeek)
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6)
      startDate.value = formatDate(startOfNextWeek)
      endDate.value = formatDate(endOfNextWeek)
      break
    default:
      startDate.value = null
      endDate.value = null
  }
}

const isModalOpen = ref(false)
</script>

<template>
  <main>
    <section class="calendar">
      <div class="container calendar__wrapper">
        <h1 class="calendar__title">Calendar</h1>

        <div class="calendar__menu">
          <div class="calendar__select">
            <InputSelect
              :options="dateOptions"
              placeholder="Choose the date"
              id="calendar-date"
              name="Select date"
              title="Select date"
              :is-reset="!!selectedDate"
              :value="selectedDate"
              @select="onSelect"
              @reset="selectedDate = null"
            >
              <InputSelectOption
                v-for="(option, idx) in dateOptions"
                :key="option"
                :option="option"
                :index="idx"
              />
            </InputSelect>
          </div>
          <TheButton @click="isModalOpen = true">
            <template #start-icon>
              <IconsCalendar />
            </template>
            Custom Date
          </TheButton>

          <CalendarCustomDateModal
            v-model:startDate="startDate"
            v-model:endDate="endDate"
            :is-open="isModalOpen"
            @close="isModalOpen = false"
          />
        </div>
      </div>
    </section>

    <section class="calendar-content">
      <div class="calendar-table-wrapper">
        <CalendarTable />
      </div>
    </section>
  </main>
</template>
