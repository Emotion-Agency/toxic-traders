import { getBrokerById } from '~/api/brokers/getBrokerById'
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'
// import { getSortedLogs } from '~/api/brokers/getSortedLogs'

export const useBrokers = () => {
  const getAllBrokers = async () => {
    const data = await getSortedBrokers()

    return data
  }

  const getBroker = async (id: number) => {
    const data = await getBrokerById(id)

    return data
  }

  return { getAllBrokers, getBroker }
}
