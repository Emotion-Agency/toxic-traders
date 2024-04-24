import {
  createBrokerRegulator,
  deleteBrokerRegulator,
  getBrokerRegulator,
  updateBrokerRegulator,
} from '~/api/brokers/brokerRegulator'
import type { iRegulatorItem } from '~/types/broker/brokerRegulator'

export const useBrokerRegulator = () => {
  const { addToast } = useToasts()

  const getRegulator = async (brokerId: number) => {
    try {
      const { regulators } = await getBrokerRegulator(brokerId)

      return regulators
    } catch (error) {
      console.error('Error fetching regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching regulator. Please try again.',
      })
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
      console.error('Error updating regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating regulator. Please try again.',
      })
    }
  }

  const createRegulator = async (brokerId: number) => {
    try {
      const data = await createBrokerRegulator(brokerId)

      return data
    } catch (error) {
      console.error('Error creating regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating regulator. Please try again.',
      })
    }
  }

  const deleteRegulator = async (brokerId: number) => {
    try {
      const data = await deleteBrokerRegulator(brokerId)

      return data
    } catch (error) {
      console.error('Error deleting regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting regulator. Please try again.',
      })
    }
  }

  return { getRegulator, updateRegulator, createRegulator, deleteRegulator }
}
