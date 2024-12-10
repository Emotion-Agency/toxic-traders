import type { IOHLCSymbol } from '../ohlc/symbols'

export interface ICalendarEventSymbol {
  calendarEventId: number
  ohlcSymbol: IOHLCSymbol
  ohlcSymbolId: number
  order: number
  tradeDirection: 0 | 1
}

export interface ICalendarEvent {
  id: string
  DbId: number
  actual: string
  comment: string
  country: string
  currency: string
  date: string
  event: string
  forecast: string
  importance: string
  indicator: string
  period: string
  previous: string
  scale: string
  source: string
  title: string
  unit: string
  disable: boolean
  symbols: ICalendarEventSymbol[]
}

export interface ICalendarEventData {
  events: ICalendarEvent[]
  totalCount: number
}

export interface ITableCalendarEvent {
  id: number
  time: string
  event: string
  country: string
  importance: string
  actual: string
  forecast: string
  previous: string
  dev: string | number
  unit: string
  scale: string
  slug: string
  symbols: ICalendarEventSymbol[]
  firstSymbol: ICalendarEventSymbol | undefined
  disable: boolean
}
