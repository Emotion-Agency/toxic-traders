import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { ICalendarEvent } from '~/utils/api/calendar/calendarEvents'

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

  return {
    id: event.id,
    time: `${event.date}+0`,
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
    symbols: event.symbols,
    disable: event.disable,
  }
}
