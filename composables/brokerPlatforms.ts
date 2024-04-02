import {
  createBrokerPlatforms,
  deleteBrokerPlatforms,
  getBrokerPlatforms,
  updateBrokerPlatforms,
} from '~/api/brokers/brokerPlatforms'

export const useBrokerPlatforms = () => {
  const getPlatforms = async (brokerId: number) => {
    try {
      const data = await getBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const updatePlatforms = async (brokerId: number) => {
    try {
      const data = await updateBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createPlatforms = async (brokerId: number) => {
    try {
      const data = await createBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deletePlatforms = async (brokerId: number) => {
    try {
      const data = await deleteBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getPlatforms, updatePlatforms, createPlatforms, deletePlatforms }
}
