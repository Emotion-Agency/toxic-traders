import axiosInstance from '../axiosInstance'

export const updateBalances = async () => {
  const { data } = await axiosInstance.get('/TradingAccounts/UpdateBalances')

  return data
}

export const updateCurrentBalance = async (accId: number) => {
  const { data } = await axiosInstance.get(
    `/TradingAccounts/${accId}/UpdateBalances`
  )

  return data
}
