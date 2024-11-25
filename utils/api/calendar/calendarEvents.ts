import axiosInstance from '../axiosInstance'

export interface ICalendarEvent {
  id: number
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
  symbols: string[]
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

export const getCalendarEvents = async (
  startDate: string,
  endDate?: string
) => {
  try {
    const res = await axiosInstance.get<ICalendarEvent[]>(
      '/Calendar/GetCalendarEvents',
      {
        params: {
          startDate,
          endDate: endDate || startDate,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const getCalendarEventsByTitleAndCountry = async (
  Title: string,
  Country: string
) => {
  try {
    const res = await axiosInstance.get<ICalendarEvent[]>(
      '/Calendar/GetCalendarEventsByTitleAndCountry',
      {
        params: {
          Title,
          Country,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const getAllCalendarEvents = async (page: number, pageSize: number) => {
  try {
    const res = await axiosInstance.get<ICalendarEvent[]>(
      '/Calendar/GetCalendarEvents',
      {
        params: {
          page,
          pageSize,
          startDate: '2021-01-01 00:00:00',
          endDate: new Date(Date.now()),
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}
