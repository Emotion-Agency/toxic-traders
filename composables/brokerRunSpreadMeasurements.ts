import { createBrokerRunSpreadMeasurements } from '~/utils/api/brokers/brokerRunSpreadMeasurements'
import type { iBrokerRunSpreadMeasurements } from '~/types/broker/brokerRunSpreadMeasurements'

export const useBrokerRunSpreadMeasurements = () => {
  const { toast } = useToasts()

  const createRunSpreadMeasurements = async (
    params: iBrokerRunSpreadMeasurements
  ) => {
    try {
      const data = await createBrokerRunSpreadMeasurements(params)

      toast.success('Run spread measurement successfully created.')

      return data
    } catch (error) {
      console.error('Error creating run spread measurement:', error)
      toast.error(
        'An error occurred while creating run spread measurement. Please try again.'
      )
    }
  }

  return { createRunSpreadMeasurements }
}
