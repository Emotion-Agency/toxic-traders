import axiosInstance from '../axiosInstance'
import type { ITradingAccountPayload } from '~/types/trading-accounts/tradingAccounts'

export const getTradingAccountRequest = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/TradingAccounts/${id}`)

    return res
  } catch (error) {
    throw error
  }
}

export const createTradingAccountRequest = async (
  payload: ITradingAccountPayload
) => {
  try {
    const res = await axiosInstance.post('/TradingAccounts', payload)

    return res
  } catch (error) {
    throw error
  }
}

export const updateTradingAccountRequest = async (
  payload: ITradingAccountPayload,
  id: number
) => {
  try {
    const res = await axiosInstance.put(`/TradingAccounts/${id}`, payload)

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

export const checkAllTradingAccountsRequest = async () => {
  try {
    const res = await axiosInstance.post('/TradingAccounts/CheckAll')
    return res
  } catch (error) {
    throw error
  }
}

export const checkTradingAccountRequest = async (id: number) => {
  try {
    const res = await axiosInstance.post(`/TradingAccounts/${id}/Check`)
    return res
  } catch (error) {
    throw error
  }
}
