import axiosInstance from '../axiosInstance'
import type {
  ICreateTradingAccountPayload,
  IUpdateTradingAccountPayload,
} from '~/types/trading-accounts/tradingAccounts'

export const getTradingAccountRequest = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/TradingAccounts/${id}`)

    return res
  } catch (error) {
    throw error
  }
}

export const createTradingAccountRequest = async (
  payload: ICreateTradingAccountPayload
) => {
  try {
    const res = await axiosInstance.post('/TradingAccounts', payload)

    return res
  } catch (error) {
    throw error
  }
}

export const updateTradingAccountRequest = async (
  payload: IUpdateTradingAccountPayload
) => {
  try {
    const res = await axiosInstance.put(
      `/TradingAccounts/${payload.id}`,
      payload
    )

    return res
  } catch (error) {
    throw error
  }
}

export const deleteTradingAccountRequest = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/TradingAccounts/${id}`, {
      params: {
        id,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}
