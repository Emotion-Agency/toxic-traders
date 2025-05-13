import {
  updateBalances,
  updateCurrentBalance,
} from '~/utils/api/trading-accounts/updateBalances'

export const useBalances = () => {
  const { toast } = useToasts()

  const updateAllBalances = async () => {
    try {
      const data = await updateBalances()
      toast.success('All balances updated successfully.')

      return data
    } catch (error) {
      console.error('Error fetching all balances:', error)
      toast.error(
        'An error occurred while fetching all balances. Please try again.'
      )
      throw error
    }
  }

  const updateCurrBalance = async (accId: number) => {
    try {
      const data = await updateCurrentBalance(accId)
      toast.success('Current balance updated successfully.')

      return data
    } catch (error) {
      console.error('Error fetching current balance:', error)
      toast.error(
        'An error occurred while fetching current balance. Please try again.'
      )
      throw error
    }
  }

  return {
    updateAllBalances,
    updateCurrBalance,
  }
}
