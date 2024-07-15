import axiosInstance from '../axiosInstance'
import type {
  iBrokerServerAccountSymbolsMT4Data,
  iBrokerServerAccountSymbolsMT5Data,
  iBrokerServerAccountSymbolsNamesData,
  iBrokerServerAccountSymbolsSpreadsAllParams,
  iBrokerServerAccountSymbolsSpreadsData,
  iBrokerServerAccountSymbolsSpreadsParams,
} from '~/types/broker/brokerServerAccountSymbols'

export const getBrokerServerAccountSymbolsSpreads = async (
  params: iBrokerServerAccountSymbolsSpreadsParams
) => {
  try {
    const { data }: iBrokerServerAccountSymbolsSpreadsData =
      await axiosInstance.get(`BrokerServerAccountSymbols/spreads`, {
        params: {
          symbolName: params?.symbolName,
          brokerPlatform: params?.brokerPlatform,
          description: params?.description,
          page: params?.page,
          pageSize: params?.pageSize,
          sortBy: params?.sortBy,
          sortOrder: params?.sortOrder,
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

export const getBrokerServerAccountSymbolsSpreadsAll = async (
  params: iBrokerServerAccountSymbolsSpreadsAllParams
) => {
  try {
    const { data }: iBrokerServerAccountSymbolsSpreadsData =
      await axiosInstance.get(`BrokerServerAccountSymbols/spreadsAll/page`, {
        params: {
          page: params?.page,
          pageSize: params?.pageSize,
          sortBy: params?.sortBy,
          sortOrder: params?.sortOrder,
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

export const getBrokerServerAccountSymbolsNames = async () => {
  try {
    const { data }: iBrokerServerAccountSymbolsNamesData =
      await axiosInstance.get(`BrokerServerAccountSymbols/symbols/names`)

    return data
  } catch (e) {
    if (e.response.status !== 400) {
      console.error(e.message)
      throw e
    }
  }
}
