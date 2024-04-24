import {
  getBrokerServer,
  getBrokerServerById,
} from '~/api/brokers/brokerServer'

export const useBrokerServer = () => {
  const { addToast } = useToasts()

  const getAllBrokerServers = async (brokerId: number) => {
    try {
      const data = await getBrokerServer(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching broker servers:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching broker servers. Please try again.',
      })
      throw error
    }
  }

  const getCurrentBrokerServer = async (brokerServerId: number) => {
    try {
      const data = await getBrokerServerById(brokerServerId)

      return data
    } catch (error) {
      console.error('Error fetching current broker server:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching current broker server. Please try again.',
      })
      throw error
    }
  }

  return { getAllBrokerServers, getCurrentBrokerServer }
}
