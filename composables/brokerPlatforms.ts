import {
  createBrokerPlatforms,
  deleteBrokerPlatforms,
  getBrokerPlatforms,
  updateBrokerPlatforms,
} from '~/api/brokers/brokerPlatforms'

export const useBrokerPlatforms = () => {
  const { addToast } = useToasts()

  const getPlatform = async (brokerId: number) => {
    try {
      const data = await getBrokerPlatforms(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching platform:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching platform. Please try again.',
      })
    }
  }

  const updatePlatform = async (brokerId: number, platformItems: number[]) => {
    try {
      const data = await updateBrokerPlatforms(brokerId, platformItems)

      addToast({
        color: ToastColor.success,
        text: 'Platform successfully updated.',
      })

      return data
    } catch (error) {
      console.error('Error updating platform:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating platform. Please try again.',
      })
    }
  }

  const createPlatform = async (brokerId: number, platformItems: number[]) => {
    try {
      const { platforms } = await createBrokerPlatforms(brokerId, platformItems)

      addToast({
        color: ToastColor.success,
        text: 'Platform successfully created.',
      })

      return platforms
    } catch (error) {
      console.error('Error creating platform:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating platform. Please try again.',
      })
    }
  }

  const deletePlatform = async (brokerId: number) => {
    try {
      const data = await deleteBrokerPlatforms(brokerId)

      addToast({
        color: ToastColor.success,
        text: 'Platform successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting platform:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting platform. Please try again.',
      })
    }
  }

  return { getPlatform, updatePlatform, createPlatform, deletePlatform }
}
