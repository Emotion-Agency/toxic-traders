import type {
  ICalendarEvent,
  ITableCalendarEvent,
} from '~/types/calendar/events'
import { newsTimezoneOffset } from '~/utils/constants/timezones'

export const calendarEventAdapter = (
  event: ICalendarEvent
): ITableCalendarEvent => {
  const getDeviation = () => {
    if (event.actual && !event.forecast && event.previous) {
      return parseFloat(event.actual) - parseFloat(event.previous)
    }

    if ((!event.forecast && !event.previous) || !event.actual) {
      return
    }

    return parseFloat(event.actual) - parseFloat(event.forecast)
  }

  const firstSymbol = event.symbols?.sort((a, b) => a.order - b.order)[0]

  return {
    id: event.DbId,
    time: `${event.date}${newsTimezoneOffset}`,
    event: event.title,
    country: event.country,
    importance: event.importance,
    actual: event.actual,
    forecast: event.forecast,
    previous: event.previous,
    unit: event.unit,
    scale: event.scale,
    dev: getDeviation(),
    slug: createSlugByTitleAndCountry(event.title, event.country),
    symbols: event.symbols?.sort((a, b) => a.order - b.order),
    firstSymbol,
    disable: event.disable,
  }
}
