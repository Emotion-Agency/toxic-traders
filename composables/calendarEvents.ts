import type { ITableCalendarEvent } from '~/types/calendar/events'
import { calendarEventAdapter } from '~/utils/adapters/calendar/calendarEventAdapter'
import { getFourWeeksCalendarEvents } from '~/utils/api/calendar/calendarEvents'

export const useCalendarEvents = () => {
  const events = ref<ITableCalendarEvent[]>([])

  const { toast } = useToasts()

  const getEvents = async () => {
    try {
      const res = await getFourWeeksCalendarEvents()
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      events.value = data.map(event => calendarEventAdapter(event))
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  return { events, getEvents }
}
