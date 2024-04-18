import {
  createBrokerRegulator,
  deleteBrokerRegulator,
  getBrokerRegulator,
  updateBrokerRegulator,
} from '~/api/brokers/brokerRegulator'
import type { iRegulatorItem } from '~/types/broker/brokerRegulator'

export const useBrokerRegulator = () => {
  const getRegulator = async (brokerId: number) => {
    try {
      const { regulators } = await getBrokerRegulator(brokerId)

      return regulators
    } catch (error) {
      // alert with error
    }
  }

  const updateRegulator = async (
    brokerId: number,
    regulator: iRegulatorItem[]
  ) => {
    try {
      const { regulators } = await updateBrokerRegulator(brokerId, regulator)

      return regulators
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
