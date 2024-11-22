import type { ITableCalendarEvent } from '~/types/calendar/events'
import { calendarEventAdapter } from '~/utils/adapters/calendar/calendarEventAdapter'
import {
  getCalendarEvents,
  getCalendarEventsByTitleAndCountry,
  getFourWeeksCalendarEvents,
  type ICalendarEvent,
} from '~/utils/api/calendar/calendarEvents'

export const useCalendarEvents = () => {
  const events = ref<ITableCalendarEvent[]>([])

  const { toast } = useToasts()

  const prepareEvents = (data: ICalendarEvent[]) => {
    events.value = data
      .map(event => calendarEventAdapter(event))
      .sort((a, b) => new Date(b.time)?.getTime() - new Date(a.time)?.getTime())

    return events.value
  }

  const getEvents = async () => {
    try {
      const res = await getFourWeeksCalendarEvents()
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const getEventsByDate = async (startDate: string, endDate?: string) => {
    try {
      const res = await getCalendarEvents(startDate, endDate)
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const getEventsByName = async (title: string, country: string) => {
    try {
      const res = await getCalendarEventsByTitleAndCountry(title, country)
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  return { events, getEvents, getEventsByDate, getEventsByName }
}
