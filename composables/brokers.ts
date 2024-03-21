import { getBrokerById } from '~/api/brokers/getBrokerById'
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'

export const useBrokers = () => {
  const getAllBrokers = async (offset: number) => {
    const data = await getSortedBrokers(offset)

    return data
  }

  const getBroker = async (id: number) => {
    const data = await getBrokerById(id)

    return data
  }

  return { getAllBrokers, getBroker }
}
