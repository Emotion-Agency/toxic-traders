import {
  deleteBrokerServerAccountNotes,
  getBrokerServerAccountNotes,
  updateBrokerServerAccountNotes,
} from '~/utils/api/brokers/brokerServerAccountNotes'

export const useBrokerServerAccountNotes = () => {
  const { toast } = useToasts()

  const getBrokerAccountNotes = async (serverAccountId: number) => {
    try {
      const data = await getBrokerServerAccountNotes(serverAccountId)

      return data
    } catch (error) {
      console.error('Error fetching broker server account notes:', error)
      toast.error(
        'An error occurred while fetching broker server account notes. Please try again.'
      )
    }
  }

  const updateBrokerAccountNotes = async (
    serverAccountId: number,
    notes: string
  ) => {
    try {
      const data = await updateBrokerServerAccountNotes(serverAccountId, notes)

      toast.success('Account notes successfully updated.')

      return data
    } catch (error) {
      console.error('Error updating broker server account notes:', error)
      toast.error(
        'An error occurred while updating broker server account notes. Please try again'
      )
    }
  }

  const deleteBrokerAccountNotes = async (serverAccountId: number) => {
    try {
      const data = await deleteBrokerServerAccountNotes(serverAccountId)

      toast.success('Account notes successfully deleted.')

      return data
    } catch (error) {
      console.error('Error deleting broker server account notes:', error)
      toast.error(
        'An error occurred while deleting broker server account notes. Please try again.'
      )
    }
  }

  return {
    getBrokerAccountNotes,
    updateBrokerAccountNotes,
    deleteBrokerAccountNotes,
  }
}
