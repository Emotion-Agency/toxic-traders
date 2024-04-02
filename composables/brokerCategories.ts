import {
  createBrokerCategories,
  deleteBrokerCategories,
  getBrokerCategories,
} from '~/api/brokers/brokerCategories'

export const useBrokerCategories = () => {
  const getCategories = async (brokerId: number) => {
    try {
      const data = await getBrokerCategories(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createCategories = async (brokerId: number) => {
    try {
      const data = await createBrokerCategories(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deleteCategories = async (brokerId: number) => {
    try {
      const data = await deleteBrokerCategories(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getCategories, createCategories, deleteCategories }
}
