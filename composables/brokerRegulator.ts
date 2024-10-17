import {
  createBrokerRegulator,
  deleteBrokerRegulator,
  getBrokerRegulator,
  updateBrokerRegulator,
} from '~/utils/api/brokers/brokerRegulator'
import type { iRegulatorItem } from '~/types/broker/brokerRegulator'

export const useBrokerRegulator = () => {
  const { toast } = useToasts()

  const getRegulator = async (brokerId: number) => {
    try {
      const { regulators } = await getBrokerRegulator(brokerId)

      return regulators
    } catch (error) {
      console.error('Error fetching regulator:', error)
      toast.error(
        'An error occurred while fetching regulator. Please try again.'
      )
    }
  }

  const updateRegulator = async (
    brokerId: number,
    regulator: iRegulatorItem[]
  ) => {
    try {
      const { regulators } = await updateBrokerRegulator(brokerId, regulator)

      toast.success('Regulator successfully updated.')

      return regulators
    } catch (error) {
      console.error('Error updating regulator:', error)
      toast.error('Error updating regulator. Please try again.')
    }
  }

  const createRegulator = async (brokerId: number) => {
    try {
      const data = await createBrokerRegulator(brokerId)
      toast.success('Regulator successfully created.')

      return data
    } catch (error) {
      console.error('Error creating regulator:', error)
      toast.error(
        'An error occurred while creating regulator. Please try again.'
      )
    }
  }

  const deleteRegulator = async (brokerId: number) => {
    try {
      const data = await deleteBrokerRegulator(brokerId)

      toast.success('Regulator successfully deleted.')

      return data
    } catch (error) {
      console.error('Error deleting regulator:', error)
      toast.error(
        'An error occurred while deleting regulator. Please try again.'
      )
    }
  }

  return { getRegulator, updateRegulator, createRegulator, deleteRegulator }
}
