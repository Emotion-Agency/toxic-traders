import {
  getBrokerServerAccountSymbolsMT4,
  getBrokerServerAccountSymbolsMT5,
} from '~/api/brokers/brokerServerAccountSymbols'

export const useBrokerServerAccountSymbols = () => {
  const { addToast } = useToasts()

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

  return { getServerAccountSymbolsMT4, getServerAccountSymbolsMT5 }
}
