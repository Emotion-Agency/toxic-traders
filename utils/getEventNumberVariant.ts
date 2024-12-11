import type { ITableCalendarEvent } from '~/types/calendar/events'

export const isNegative = (number: number | string) => {
  return Number(number) < 0
}

export const getEventNumberVariant = (
  number: number | string,
  event: ITableCalendarEvent
) => {
  const dir = event.firstSymbol?.tradeDirection

  if (isNaN(Number(number))) {
    return 'neutral'
  }

  if (Number(number) === 0) {
    return 'neutral'
  }

  if (isNegative(number) && dir === 0) {
    return 'negative'
  }

  if (!isNegative(number) && dir === 1) {
    return 'positive'
  }

  return 'positive'
}
