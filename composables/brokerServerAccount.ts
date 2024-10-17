import {
  createBrokerServerAccount,
  deleteBrokerServerAccount,
  updateBrokerServerAccount,
} from '~/utils/api/brokers/brokerServerAccount'

export const useBrokerServerAccount = () => {
  const { toast } = useToasts()

  const createBrokerAccount = async (
    accountType: string,
    login: string,
    password: string,
    brokerServerId: number
  ) => {
    try {
      const data = await createBrokerServerAccount(
        accountType,
        login,
        password,
        brokerServerId
      )

      toast.success('Account successfully created.')

      return data
    } catch (error) {
      console.error('Error creating broker server account:', error)

      toast.error(
        'An error occurred while creating server account. Please try again.'
      )
    }
  }

  const updateBrokerAccount = async (
    brokerServerAccountId: number,
    accountType: string,
    login: string,
    password: string
  ) => {
    try {
      const data = await updateBrokerServerAccount(
        brokerServerAccountId,
        accountType,
        login,
        password
      )

      toast.success('Account successfully updated.')

      return data
    } catch (error) {
      console.error('Error updating broker server account:', error)
      toast.error(
        'An error occurred while updating server account. Please try again.'
      )
    }
  }

  const deleteBrokerAccount = async (brokerServerId: number) => {
    try {
      const data = await deleteBrokerServerAccount(brokerServerId)

      toast.success('Account successfully deleted.')

      return data
    } catch (error) {
      console.error('Error deleting broker server account:', error)
      toast.error(
        'An error occurred while deleting server account. Please try again.'
      )
    }
  }

  return { createBrokerAccount, updateBrokerAccount, deleteBrokerAccount }
}
