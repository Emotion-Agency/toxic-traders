import axiosInstance from '../axiosInstance'
import type {
  iBrokerServerAccountSymbolsMT4Data,
  iBrokerServerAccountSymbolsMT5Data,
} from '~/types/broker/brokerServerAccountSymbols'

export const getBrokerServerAccountSymbolsMT4 = async (
  brokerServerAccountId: number
) => {
  try {
    const { data }: iBrokerServerAccountSymbolsMT4Data =
      await axiosInstance.get(`BrokerServerAccountSymbols/symbols/mt4`, {
        params: {
          BrokerServerAccountId: brokerServerAccountId,
        },
      })

    return data
  } catch (e) {
    if (e.response.status !== 400) {
      console.error(e.message)
      throw e
    }
  }
}

export const getBrokerServerAccountSymbolsMT5 = async (
  brokerServerAccountId: number
) => {
  try {
    const { data }: iBrokerServerAccountSymbolsMT5Data =
      await axiosInstance.get(`BrokerServerAccountSymbols/symbols/mt5`, {
        params: {
          BrokerServerAccountId: brokerServerAccountId,
        },
      })

    return data
  } catch (e) {
    if (e.response.status !== 400) {
      console.error(e.message)
      throw e
    }
  }
}
