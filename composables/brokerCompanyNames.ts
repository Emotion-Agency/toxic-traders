import {
  getBrokerCompanyNames,
  getBrokerCompanyNamesById,
} from '~/api/brokers/brokerCompanyNames'

export const useBrokerCompanyNames = () => {
  const { addToast } = useToasts()

  const getCompanyNamesById = async (brokerId: number) => {
    try {
      const { companyNames } = await getBrokerCompanyNamesById(brokerId)

      return companyNames
    } catch (error) {
      console.error('Error fetching company names by ID:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching company names. Please try again.',
      })
      throw error
    }
  }

  const getCompanyNames = async () => {
    try {
      const { companyNames } = await getBrokerCompanyNames()

      return companyNames
    } catch (error) {
      console.error('Error fetching company names:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching company names. Please try again.',
      })
      throw error
    }
  }

  return { getCompanyNames, getCompanyNamesById }
}
