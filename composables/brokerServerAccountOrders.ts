import { getBrokerServerAccountOrders } from '~/utils/api/brokers/brokerServerAccountOrders'

export const useBrokerServerAccountOrders = () => {
  const { addToast } = useToasts()

  const getServerAccountOrders = async (serverAccountId: number) => {
    try {
      const data = await getBrokerServerAccountOrders(serverAccountId)

      return data
    } catch (error) {
      console.error('Error fetching server account orders:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server account orders. Please try again.',
      })
    }
  }

  return { getServerAccountOrders }
}
