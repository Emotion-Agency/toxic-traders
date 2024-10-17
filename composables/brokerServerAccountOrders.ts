import { getBrokerServerAccountOrders } from '~/utils/api/brokers/brokerServerAccountOrders'

export const useBrokerServerAccountOrders = () => {
  const { toast } = useToasts()

  const getServerAccountOrders = async (serverAccountId: number) => {
    try {
      const data = await getBrokerServerAccountOrders(serverAccountId)

      return data
    } catch (error) {
      console.error('Error fetching server account orders:', error)

      toast.error(
        'An error occurred while fetching server account orders. Please try again.'
      )
    }
  }

  return { getServerAccountOrders }
}
