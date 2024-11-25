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
  symbols: string[]
  disable: boolean
}
