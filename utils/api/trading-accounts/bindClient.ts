import type { IBindToClientPayload } from '~/types/trading-accounts/tradingAccounts'
import axiosInstance from '../axiosInstance'

export const bindToClientRequest = async (payload: IBindToClientPayload) => {
  try {
    const res = await axiosInstance.post(
      `/TradingAccounts/${payload?.tradingAccountId}/BindToClient/${payload?.clientId}`,
      payload
    )

    return res
  } catch (error) {
    throw error
  }
}

export const unbindFromClientRequest = async (
  payload: IBindToClientPayload
) => {
  try {
    const res = await axiosInstance.post(
      `/TradingAccounts/${payload?.tradingAccountId}/UbindFromClient`,
      payload
    )

    return res
  } catch (error) {
    throw error
  }
}
