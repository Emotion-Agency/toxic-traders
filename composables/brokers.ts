import { getBrokerById } from '~/api/brokers/getBrokerById'
import { getBroker } from '~/api/brokers/getBroker'

export const useBrokers = () => {
  const { addToast } = useToasts()

  const getAllBrokers = async (offset: number, count: number) => {
    try {
      const { brokers, totalCount } = await getBroker(offset, count)

      return { brokers, totalCount }
    } catch (error) {
      console.error('Error fetching brokers:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching brokers. Please try again.',
      })
      throw error
    }
  }

  const getCurrentBroker = async (brokerId: number) => {
    try {
      const data = await getBrokerById(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching current broker:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching current broker. Please try again.',
      })
      throw error
    }
  }

  return { getAllBrokers, getCurrentBroker }
}
