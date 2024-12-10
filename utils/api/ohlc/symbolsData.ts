import type { IOHLCData } from '~/types/ohlc/symbols'
import axiosInstance from '../axiosInstance'

export const getOHLCSymbolsData = async (
  startTime: string,
  endTime: string,
  symbol: string
) => {
  try {
    const res = await axiosInstance.get<IOHLCData[]>(
      '/OHLC/OHLCDataForSymbol',
      {
        // dd.MM.yyyy HH:mm:ss
        params: {
          startTime,
          endTime,
          symbol,
        },
      }
    )

    return res?.data
  } catch (error) {
    throw error
  }
}
