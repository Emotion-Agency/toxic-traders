import {
  createBrokerRegulator,
  deleteBrokerRegulator,
  getBrokerRegulator,
  updateBrokerRegulator,
} from '~/api/brokers/brokerRegulator'

export const useBrokerRegulator = () => {
  const getRegulator = async (brokerId: number) => {
    try {
      const data = await getBrokerRegulator(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const updateRegulator = async (brokerId: number) => {
    try {
      const data = await updateBrokerRegulator(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createRegulator = async (brokerId: number) => {
    try {
      const data = await createBrokerRegulator(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deleteRegulator = async (brokerId: number) => {
    try {
      const data = await deleteBrokerRegulator(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getRegulator, updateRegulator, createRegulator, deleteRegulator }
}
