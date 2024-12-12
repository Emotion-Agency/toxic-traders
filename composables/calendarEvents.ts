import type {
  ICalendarEvent,
  ITableCalendarEvent,
} from '~/types/calendar/events'
import { calendarEventAdapter } from '~/utils/adapters/calendar/calendarEventAdapter'
import { symbolDirAdapterFromStringToNumber } from '~/utils/adapters/calendar/symbolDirAdapter'
import {
  bindOHLCSymbolToEvent,
  disableCalendarEvent,
  getAllCalendarEvents,
  getAllGroupedCalendarEvents,
  getCalendarEventsByTitleAndCountry,
  getGroupedCalendarEventsByTitleAndCountry,
  setImportanceToEvent,
  setOHLCSymbolTradeDirection,
  unbindOHLCSymbolToEvent,
} from '~/utils/api/calendar/calendarEvents'
import { countryCodes } from '~/utils/constants/countryCodes'
import { clientTimezoneOffset } from '~/utils/constants/timezones'

export const useCalendarEvents = () => {
  const events = ref<ITableCalendarEvent[]>([])
  const totalCount = ref<number>(0)
  const activeEvent = useState<ITableCalendarEvent>('activeEvent', () => null)

  const { toast } = useToasts()

  const prepareEvents = (data: ICalendarEvent[]) => {
    events.value = data.map(event => calendarEventAdapter(event))

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
        startDate: startDate
          ? getDateDay(startDate) + `T00:00:00${clientTimezoneOffset}`
          : undefined,
        endDate: endDate
          ? getDateDay(endDate) + `T23:59:59${clientTimezoneOffset}`
          : getDateDay(startDate) + `T23:59:59${clientTimezoneOffset}`,
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

  const getWeekEvents = async (page: number, count: number, sort?: 0 | 1) => {
    const today = new Date()

    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    await getEvents({
      page,
      count,
      sort,
      startDate: getDateDay(startOfWeek.toString()),
      endDate: getDateDay(endOfWeek.toString()),
    })
  }

  const getEventsByName = async (title: string, country: string) => {
    try {
      const res = await getCalendarEventsByTitleAndCountry({
        Title: title,
        Country: country,
        Filter: 2,
        page: 1,
        pageSize: 1000,
      })
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

  const getGroupedEventsByName = async (query: string) => {
    try {
      const [country, ...title] = query.split(' ')

      const isCountry = countryCodes.includes(country?.toUpperCase())

      let res: { data: ICalendarEvent[] } | undefined

      if (isCountry) {
        res = await getGroupedCalendarEventsByTitleAndCountry(
          title?.join(' '),
          country?.toUpperCase()
        )
      } else {
        res = await getGroupedCalendarEventsByTitleAndCountry(query)
      }

      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
      totalCount.value = data?.length
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

  const unbindSymbol = async (
    title: string,
    country: string,
    symbolId: number
  ) => {
    try {
      await unbindOHLCSymbolToEvent(title, country, symbolId)
    } catch (error) {
      console.error('Error unbinding symbols:', error)
      toast.error(
        'An error occurred while unbinding symbols. Please try again.'
      )
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
    getWeekEvents,
    getEventsByName,
    getGroupedEventsByName,
    disableEvent,
    bindSymbol,
    unbindSymbol,
    changeImportance,
    setSymbolDirection,
  }
}
