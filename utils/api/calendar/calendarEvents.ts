import axiosInstance from '../axiosInstance'

export interface ICalendarEvent {
  actual: string
  comment: string
  country: string
  currency: string
  date: string
  event: string
  forecast: string
  id: string
  importance: string
  indicator: string
  period: string
  previous: string
  scale: string
  source: string
  title: string
  unit: string
}

export const getFourWeeksCalendarEvents = async () => {
  try {
    const res = await axiosInstance.get<ICalendarEvent[]>(
      '/Calendar/GetFourWeeksCalendarEvents'
    )

    return res
  } catch (error) {
    throw error
  }
}
