import {
  createBrokerNotes,
  deleteBrokerNotes,
  getBrokerNotes,
  updateBrokerNotes,
} from '~/api/brokers/brokerNotes'

export const useBrokerNotes = () => {
  const { addToast } = useToasts()

  const getNotes = async (brokerId: number) => {
    try {
      const data = await getBrokerNotes(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching notes. Please try again.',
      })
      throw error
    }
  }

  const updateNotes = async (brokerId: number, notes: string) => {
    try {
      const data = await updateBrokerNotes(brokerId, notes)

      return data
    } catch (error) {
      console.error('Error updating notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating notes. Please try again.',
      })
      throw error
    }
  }

  const createNotes = async (brokerId: number, notes: string) => {
    try {
      const data = await createBrokerNotes(brokerId, notes)

      return data
    } catch (error) {
      console.error('Error creating notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating notes. Please try again.',
      })
      throw error
    }
  }

  const deleteNotes = async (brokerId: number) => {
    try {
      const data = await deleteBrokerNotes(brokerId)

      return data
    } catch (error) {
      console.error('Error deleting notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting notes. Please try again.',
      })
      throw error
    }
  }

  return { getNotes, updateNotes, deleteNotes, createNotes }
}
