import {
  createBrokerCategories,
  deleteBrokerCategories,
  getBrokerCategories,
} from '~/api/brokers/brokerCategories'

export const useBrokerCategories = () => {
  const { addToast } = useToasts()

  const getCategories = async (brokerId: number) => {
    try {
      const { brokerCategories } = await getBrokerCategories(brokerId)

      return brokerCategories
    } catch (error) {
      console.error('Error fetching categories:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching categories. Please try again.',
      })
    }
  }

  const createCategories = async (brokerId: number, category: string) => {
    try {
      const { brokerCategories } = await createBrokerCategories(
        brokerId,
        category
      )

      addToast({
        color: ToastColor.success,
        text: 'Category successfully created.',
      })

      return brokerCategories
    } catch (error) {
      console.error('Error creating categories:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating categories. Please try again.',
      })
    }
  }

  const deleteCategories = async (brokerId: number) => {
    try {
      const data = await deleteBrokerCategories(brokerId)

      addToast({
        color: ToastColor.success,
        text: 'Category successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting categories:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting categories. Please try again.',
      })
    }
  }

  return { getCategories, createCategories, deleteCategories }
}
