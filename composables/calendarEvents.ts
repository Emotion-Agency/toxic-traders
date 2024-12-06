import type { ITableCalendarEvent } from '~/types/calendar/events'
import { calendarEventAdapter } from '~/utils/adapters/calendar/calendarEventAdapter'
import { symbolDirAdapterFromStringToNumber } from '~/utils/adapters/calendar/symbolDirAdapter'
import {
  bindOHLCSymbolToEvent,
  disableCalendarEvent,
  getAllCalendarEvents,
  getAllGroupedCalendarEvents,
  getCalendarEventsByTitleAndCountry,
  setImportanceToEvent,
  setOHLCSymbolTradeDirection,
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

  interface IGetEventsParams {
    page: number
    count: number
    startDate?: string
    endDate?: string
    sort?: 0 | 1
  }

  const getEvents = async ({
    page,
    count,
    startDate,
    endDate,
    sort,
  }: IGetEventsParams) => {
    try {
      const res = await getAllCalendarEvents({
        page,
        pageSize: count,
        startDate,
        endDate,
        sortOrder: sort,
        filter: 2,
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

  const getGroupedEvents = async (page: number, count: number) => {
    try {
      const res = await getAllGroupedCalendarEvents({ page, pageSize: count })
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

  const getFourWeeksEvents = async (
    page: number,
    count: number,
    sort?: 0 | 1
  ) => {
    const twoWeeks = 12096e5
    await getEvents({
      page,
      count,
      sort,
      startDate: new Date(new Date().getTime() - twoWeeks).toISOString(),
      endDate: new Date(new Date().getTime() + twoWeeks).toISOString(),
    })
  }

  const getEventsByName = async (title: string, country: string) => {
    try {
      const res = await getCalendarEventsByTitleAndCountry(title, country, 2)
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
      totalCount.value = data.length
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

  const setSymbolDirection = async (
    title: string,
    country: string,
    symbolId: number,
    tradeDirection: 'Buy' | 'Sell'
  ) => {
    try {
      const res = await setOHLCSymbolTradeDirection(
        title,
        country,
        symbolId,
        symbolDirAdapterFromStringToNumber(tradeDirection)
      )
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      return data
    } catch (error) {
      console.error('Error fetching symbol direction:', error)
      toast.error(
        'An error occurred while fetching symbol direction. Please try again.'
      )
    }
  }

  return {
    events,
    totalCount,
    activeEvent,
    getEvents,
    getGroupedEvents,
    getFourWeeksEvents,
    getEventsByName,
    disableEvent,
    bindSymbol,
    changeImportance,
    setSymbolDirection,
  }
}
