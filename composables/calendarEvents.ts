import type { ITableCalendarEvent } from '~/types/calendar/events'
import { calendarEventAdapter } from '~/utils/adapters/calendar/calendarEventAdapter'
import {
  bindOHLCSymbolToEvent,
  disableCalendarEvent,
  getAllCalendarEvents,
  getCalendarEvents,
  getCalendarEventsByTitleAndCountry,
  setImportanceToEvent,
  type ICalendarEvent,
} from '~/utils/api/calendar/calendarEvents'

export const useCalendarEvents = () => {
  const events = ref<ITableCalendarEvent[]>([])
  const totalCount = ref<number>(0)
  const activeEvent = useState<ITableCalendarEvent>('activeEvent', () => null)

  const { toast } = useToasts()

  const prepareEvents = (data: ICalendarEvent[]) => {
    events.value = data
      .map(event => calendarEventAdapter(event))
      .sort((a, b) => new Date(b.time)?.getTime() - new Date(a.time)?.getTime())

    return events.value
  }

  const getEvents = async (page: number, count: number) => {
    try {
      const twoWeeks = 12096e5
      const res = await getAllCalendarEvents({
        page,
        pageSize: count,

        startDate: new Date(new Date().getTime() - twoWeeks).toISOString(),

        endDate: new Date(new Date().getTime() + twoWeeks).toISOString(),
      })
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data.events)
      totalCount.value = data.totalCount
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

  const getAllEventsByPage = async (page: number, count: number) => {
    try {
      const res = await getAllCalendarEvents({ page, pageSize: count })
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data.events)

      totalCount.value = data.totalCount
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const disableEvent = async (
    title: string,
    country: string,
    value: boolean
  ) => {
    try {
      await disableCalendarEvent(title, country, value)
    } catch (error) {
      console.error('Error disabling event:', error)
      toast.error(
        'An error occurred while disabling the event. Please try again.'
      )
    }
  }

  const bindSymbol = async (
    title: string,
    country: string,
    symbolId: number,
    order: number
  ) => {
    try {
      await bindOHLCSymbolToEvent(title, country, symbolId, order)
    } catch (error) {
      console.error('Error binding symbols:', error)
      toast.error('An error occurred while binding symbols. Please try again.')
    }
  }

  const changeImportance = async (
    title: string,
    country: string,
    value: 0 | 1 | 2
  ) => {
    try {
      await setImportanceToEvent(title, country, value)
    } catch (error) {
      console.error('Error changing event importance:', error)
      toast.error(
        'An error occurred while changing event importance. Please try again.'
      )
    }
  }

  return {
    events,
    totalCount,
    activeEvent,
    getEvents,
    getEventsByDate,
    getEventsByName,
    getAllEventsByPage,
    disableEvent,
    bindSymbol,
    changeImportance,
  }
}
