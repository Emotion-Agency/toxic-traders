import {
  createBrokerDepositMethods,
  deleteBrokerDepositMethods,
  getBrokerDepositMethods,
  updateBrokerDepositMethods,
} from '~/api/brokers/brokerDepositMethods'

export const useBrokerDepositMethods = () => {
  const getDepositMethods = async (brokerId: number) => {
    try {
      const data = await getBrokerDepositMethods(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const updateDepositMethods = async (brokerId: number) => {
    try {
      const data = await updateBrokerDepositMethods(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createDepositMethods = async (brokerId: number) => {
    try {
      const data = await createBrokerDepositMethods(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deleteDepositMethods = async (brokerId: number) => {
    try {
      const data = await deleteBrokerDepositMethods(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return {
    getDepositMethods,
    updateDepositMethods,
    createDepositMethods,
    deleteDepositMethods,
  }
}
