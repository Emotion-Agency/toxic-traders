import { getBrokerServerAddresses } from '~/api/brokers/brokerServerAddresses'

export const useBrokerServerAddresses = () => {
  const getServerAddresses = async (brokerId: number) => {
    try {
      const { brokerServerAddresses } = await getBrokerServerAddresses(brokerId)

      return brokerServerAddresses
    } catch (error) {
      // alert with error
    }
  }

  return { getServerAddresses }
}
