import type { IOHLCSymbol } from '~/types/ohlc/symbols'
import axiosInstance from '../axiosInstance'

export interface ICalendarEventSymbol {
  calendarEventId: number
  ohlcSymbol: IOHLCSymbol
  ohlcSymbolId: number
  order: number
  tradeDirection: 0 | 1
}

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
  symbols: ICalendarEventSymbol[]
}

export interface ICalendarEventData {
  events: ICalendarEvent[]
  totalCount: number
}

interface IGetAllCalendarEvents {
  page: number
  pageSize: number
  startDate?: Date | string
  endDate?: Date | string
}

interface IGetAllCalendarEventsUngrouped extends IGetAllCalendarEvents {
  sortOrder?: 0 | 1
  filter?: 0 | 1 | 2
}

interface IGetCalendarEventsByTitleAndCountry {
  Title: string
  Country: string
  Filter: 0 | 1 | 2
  page: number
  pageSize: number
}

export const getCalendarEventsByTitleAndCountry = async ({
  Title,
  Country,
  Filter,
  page,
  pageSize,
}: IGetCalendarEventsByTitleAndCountry) => {
  try {
    const res = await axiosInstance.get<ICalendarEvent[]>(
      '/Calendar/GetAllCalendarEventsByTitleAndCountryFiltered',
      {
        params: {
          Title,
          Country,
          Filter,
          page,
          pageSize,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const getAllGroupedCalendarEvents = async ({
  page,
  pageSize,
  startDate,
  endDate,
}: IGetAllCalendarEvents) => {
  try {
    const res = await axiosInstance.get<ICalendarEventData>(
      '/Calendar/GetCalendarEvents',
      {
        params: {
          page,
          pageSize,
          startDate: startDate ?? '2021-01-01 00:00:00',
          endDate: endDate ?? new Date(Date.now()),
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const getAllCalendarEvents = async ({
  page,
  pageSize,
  startDate,
  endDate,
  sortOrder,
  filter,
}: IGetAllCalendarEventsUngrouped) => {
  try {
    const res = await axiosInstance.get<ICalendarEventData>(
      '/Calendar/GetAllCalendarEvents',
      {
        params: {
          page,
          pageSize,
          startDate,
          endDate,
          sortOrder: sortOrder ?? 0,
          filter: filter ?? 0,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const disableCalendarEvent = async (
  title: string,
  country: string,
  value: boolean
) => {
  try {
    const res = await axiosInstance.put(
      '/Calendar/SetDisableByTitleAndCountry',
      null,
      {
        params: {
          Title: title,
          Country: country,
          value,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const setImportanceToEvent = async (
  title: string,
  country: string,
  value: 0 | 1 | 2
) => {
  try {
    const res = await axiosInstance.put(
      '/Calendar/SetImportanceByTitleAndCountry',
      null,
      {
        params: {
          Title: title,
          Country: country,
          value: value.toString(),
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const bindOHLCSymbolToEvent = async (
  title: string,
  country: string,
  symbolId: number,
  order: number
) => {
  try {
    const res = await axiosInstance.post(
      '/Calendar/BindOHLCSymbolByTitleAndCountry',
      null,
      {
        params: {
          Title: title,
          Country: country,
          symbolId,
          order,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const unbindOHLCSymbolToEvent = async (
  title: string,
  country: string,
  symbolId: number
) => {
  try {
    const res = await axiosInstance.delete(
      '/Calendar/UnbindOHLCSymbolByTitleAndCountry',
      {
        params: {
          Title: title,
          Country: country,
          symbolId,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const setOHLCSymbolTradeDirection = async (
  title: string,
  country: string,
  symbolId: number,
  tradeDirection: 0 | 1
) => {
  try {
    const res = await axiosInstance.put(
      'Calendar/SetOHLCSymbolTradeDirectionByTitleAndCountry',
      null,
      {
        params: {
          Title: title,
          Country: country,
          symbolId,
          tradeDirection,
        },
      }
    )

    return res
  } catch (error) {
    throw error
  }
}
