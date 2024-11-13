import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { ICalendarEvent } from '~/utils/api/calendar/calendarEvents'

export const calendarEventAdapter = (
  event: ICalendarEvent
): ITableCalendarEvent => {
  const getDeviation = () => {
    console.log(event.actual, event.forecast)

    if (!!event.actual || !!event.forecast) {
      return 'N/A'
    }

    return parseFloat(event.actual) - parseFloat(event.forecast)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  return {
    time: event.date,
    event: event.title,
    country: event.country,
    importance: event.importance,
    actual: event.actual,
    forecast: event.forecast,
    previous: event.previous,
    dev: getDeviation(),
  }
}
