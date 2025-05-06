import type { IBalancesProfits } from '~/types/trading-accounts/balancesProfits'
import axiosInstance from '../axiosInstance'

export const getBalancesProfits = async (): Promise<IBalancesProfits> => {
  const { data } = await axiosInstance.get<IBalancesProfits>(
    '/TradingAccounts/BalancesProfits'
  )

  return data
}
