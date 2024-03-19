import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'

export const useBrokers = () => {
  const getAllBrokers = async () => {
    const data = await getSortedBrokers()

    return data
  }

  return { getAllBrokers }
}
