import {
  getBrokerServerAccountSymbolsMT4,
  getBrokerServerAccountSymbolsMT5,
  getBrokerServerAccountSymbolsNames,
  getBrokerServerAccountSymbolsSpreads,
  getBrokerServerAccountSymbolsSpreadsAll,
} from '~/api/brokers/brokerServerAccountSymbols'
import type {
  iBrokerServerAccountSymbolsSpreadsAllParams,
  iBrokerServerAccountSymbolsSpreadsParams,
} from '~/types/broker/brokerServerAccountSymbols'

export const useBrokerServerAccountSymbols = () => {
  const { addToast } = useToasts()

  const getServerAccountSymbolsSpreads = async (
    params: iBrokerServerAccountSymbolsSpreadsParams
  ) => {
    try {
      const { brokerServerAccountSymbols } =
        await getBrokerServerAccountSymbolsSpreads(params)

      return brokerServerAccountSymbols
    } catch (error) {
      console.error('Error fetching server account symbols spreads:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols spreads. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsSpreadsAll = async (
    params: iBrokerServerAccountSymbolsSpreadsAllParams
  ) => {
    try {
      const { brokerServerAccountSymbols } =
        await getBrokerServerAccountSymbolsSpreadsAll(params)

      return brokerServerAccountSymbols
    } catch (error) {
      console.error('Error fetching server account symbols spreads:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols spreads. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsNames = async () => {
    try {
      const data = await getBrokerServerAccountSymbolsNames()

      return data
    } catch (error) {
      console.error('Error fetching server account symbols names:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols names. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsMT4 = async (brokerServerAccountId: number) => {
    try {
      const data = await getBrokerServerAccountSymbolsMT4(brokerServerAccountId)

      return data
    } catch (error) {
      console.error('Error fetching server account symbols MT4:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols MT4. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsMT5 = async (brokerServerAccountId: number) => {
    try {
      const data = await getBrokerServerAccountSymbolsMT5(brokerServerAccountId)

      return data
    } catch (error) {
      console.error('Error fetching server account symbols MT5:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols MT5. Please try again.',
      })
    }
  }

  return {
    getServerAccountSymbolsMT4,
    getServerAccountSymbolsMT5,
    getServerAccountSymbolsSpreads,
    getServerAccountSymbolsSpreadsAll,
    getServerAccountSymbolsNames,
  }
}
