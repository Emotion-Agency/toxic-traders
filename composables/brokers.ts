import { getBrokerById } from '~/api/brokers/getBrokerById'
import { getBroker } from '~/api/brokers/getBroker'

export const useBrokers = () => {
  const getAllBrokers = async (offset: number, count: number) => {
    try {
      const { brokers, totalCount } = await getBroker(offset, count)

      return { brokers, totalCount }
    } catch (error) {
      // alert with error
    }
  }

  const getCurrentBroker = async (brokerId: number) => {
    try {
      const data = await getBrokerById(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getAllBrokers, getCurrentBroker }
}
