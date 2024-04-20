import {
  createBrokerServerLocation,
  deleteBrokerServerLocation,
  getBrokerServerLocation,
} from '~/api/brokers/brokerServerLocation'

export const useBrokerServerLocation = () => {
  const getServerLocation = async (brokerId: number) => {
    try {
      const data = await getBrokerServerLocation(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createServerLocation = async (
    brokerId: number,
    serverLocation: string
  ) => {
    try {
      const data = await createBrokerServerLocation(brokerId, serverLocation)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deleteServerLocation = async (brokerId: number) => {
    try {
      const data = await deleteBrokerServerLocation(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return {
    getServerLocation,
    createServerLocation,
    deleteServerLocation,
  }
}
