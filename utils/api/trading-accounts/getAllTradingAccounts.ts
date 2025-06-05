import axiosInstance from '../axiosInstance'
import type {
  IGetAllTradingAccountsPayload,
  ITradingAccountsData,
} from '~/types/trading-accounts/tradingAccounts'

export const getAllTradingAccountsRequest = async (
  payload?: IGetAllTradingAccountsPayload
): Promise<ITradingAccountsData> => {
  const { data } = await axiosInstance.get<ITradingAccountsData>(
    '/TradingAccounts',
    {
      params: {
        page: payload?.page,
        count: payload?.count,
        sort: payload?.sortBy ?? 'id',
        sortOrder: payload?.sortOrder ?? 0,
      },
    }
  )

  return data
}
