import {
  getBrokerServerAccountSymbolsDescriptions,
  getBrokerServerAccountSymbolsMT4,
  getBrokerServerAccountSymbolsMT5,
  getBrokerServerAccountSymbolsNames,
  getBrokerServerAccountSymbolsSpreads,
  getBrokerServerAccountSymbolsSpreadsAll,
  getBrokerServerAccountSymbolsSpreadsCurrent,
  getBrokerServerAccountSymbolsSpreadsSchedule,
} from '~/utils/api/brokers/brokerServerAccountSymbols'
import type {
  iBrokerServerAccountSymbolsParams,
  iBrokerServerAccountSymbolsSpreadsAllParams,
  iBrokerServerAccountSymbolsSpreadsCurrent,
  iBrokerServerAccountSymbolsSpreadsParams,
  iBrokerServerAccountSymbolsSpreadsScheduleParams,
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

  const getServerAccountSymbolsSpreadsSchedule = async (
    params: iBrokerServerAccountSymbolsSpreadsScheduleParams
  ) => {
    try {
      const data = await getBrokerServerAccountSymbolsSpreadsSchedule(params)

      return data
    } catch (error) {
      console.error(
        'Error fetching server account symbols spreads schedule:',
        error
      )
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols spreads schedule. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsSpreadsAll = async (
    params: iBrokerServerAccountSymbolsSpreadsAllParams
  ) => {
    try {
      const data = await getBrokerServerAccountSymbolsSpreadsAll(params)

      return data
    } catch (error) {
      console.error('Error fetching server account symbols spreads:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols spreads. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsSpreadsCurrent = async (
    params: iBrokerServerAccountSymbolsSpreadsCurrent
  ) => {
    try {
      const data = await getBrokerServerAccountSymbolsSpreadsCurrent(params)

      return data
    } catch (error) {
      console.error('Error fetching server account symbols spreads:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols spreads. Please try again.',
      })
      throw error
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

  const getServerAccountSymbolsDescriptions = async () => {
    try {
      const data = await getBrokerServerAccountSymbolsDescriptions()

      return data
    } catch (error) {
      console.error('Error fetching server account symbols names:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols names. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsMT4 = async (
    params: iBrokerServerAccountSymbolsParams
  ) => {
    try {
      const { brokerServerAccountSymbolMt4, totalCount } =
        await getBrokerServerAccountSymbolsMT4(params)

      return {
        brokerServerAccountSymbolMt4,
        totalCount,
      }
    } catch (error) {
      console.error('Error fetching server account symbols MT4:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account symbols MT4. Please try again.',
      })
    }
  }

  const getServerAccountSymbolsMT5 = async (
    params: iBrokerServerAccountSymbolsParams
  ) => {
    try {
      const { brokerServerAccountSymbolMt5, totalCount } =
        await getBrokerServerAccountSymbolsMT5(params)

      return {
        brokerServerAccountSymbolMt5,
        totalCount,
      }
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
    getServerAccountSymbolsDescriptions,
    getServerAccountSymbolsSpreadsSchedule,
    getServerAccountSymbolsSpreadsCurrent,
  }
}
