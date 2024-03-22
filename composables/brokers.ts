import { getBrokerById } from '~/api/brokers/getBrokerById'
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'

export const useBrokers = () => {
  const getAllBrokers = async (offset: number) => {
    const { brokers, totalCount } = await getSortedBrokers(offset)

    return { brokers, totalCount }
  }

  const getBroker = async (id: number) => {
    const data = await getBrokerById(id)

    return data
  }

  return { getAllBrokers, getBroker }
}
