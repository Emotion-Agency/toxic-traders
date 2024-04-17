import {
  createBrokerPlatforms,
  deleteBrokerPlatforms,
  getBrokerPlatforms,
  updateBrokerPlatforms,
} from '~/api/brokers/brokerPlatforms'

export const useBrokerPlatforms = () => {
  const getPlatform = async (brokerId: number) => {
    try {
      const data = await getBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const updatePlatform = async (brokerId: number) => {
    try {
      const data = await updateBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createPlatform = async (brokerId: number) => {
    try {
      const data = await createBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deletePlatform = async (brokerId: number) => {
    try {
      const data = await deleteBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getPlatform, updatePlatform, createPlatform, deletePlatform }
}
