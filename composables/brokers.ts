import { getBrokerById } from '~/api/brokers/getBrokerById'
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'

export const useBrokers = () => {
  const getAllBrokers = async (offset: number, count: number) => {
    try {
      const { brokers, totalCount } = await getSortedBrokers(offset, count)

      return { brokers, totalCount }
    } catch (error) {
      // alert with error
    }
  }

  const getBroker = async (id: number) => {
    const data = await getBrokerById(id)

    return data
  }

  return { getAllBrokers, getBroker }
}
