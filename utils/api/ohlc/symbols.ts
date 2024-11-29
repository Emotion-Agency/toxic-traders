import type { IOHLCSymbol } from '~/types/ohlc/symbols'
import axiosInstance from '../axiosInstance'

export const getOHLCSymbols = async () => {
  try {
    const res = await axiosInstance.get<IOHLCSymbol[]>('/OHLC/OHLCSymbols')

    return res?.data
  } catch (error) {
    throw error
  }
}
