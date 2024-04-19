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

  const updateDepositMethods = async (
    brokerId: number,
    depositItems: number[]
  ) => {
    try {
      const data = await updateBrokerDepositMethods(brokerId, depositItems)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createDepositMethods = async (
    brokerId: number,
    depositItems: number[]
  ) => {
    try {
      const { depositMethods } = await createBrokerDepositMethods(
        brokerId,
        depositItems
      )

      return depositMethods
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
