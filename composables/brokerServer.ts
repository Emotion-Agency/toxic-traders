import {
  getBrokerServer,
  getBrokerServerById,
} from '~/api/brokers/brokerServer'

export const useBrokerServer = () => {
  const getAllBrokerServers = async (brokerId: number) => {
    try {
      const data = await getBrokerServer(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const getCurrentBrokerServer = async (brokerServerId: number) => {
    try {
      const data = await getBrokerServerById(brokerServerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getAllBrokerServers, getCurrentBrokerServer }
}
