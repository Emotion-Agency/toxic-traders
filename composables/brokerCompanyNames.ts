import {
  getBrokerCompanyNames,
  getBrokerCompanyNamesById,
} from '~/utils/api/brokers/brokerCompanyNames'

export const useBrokerCompanyNames = () => {
  const { toast } = useToasts()

  const getCompanyNamesById = async (brokerId: number) => {
    try {
      const data = await getBrokerCompanyNamesById(brokerId)

      return data.companyNames[0]
    } catch (error) {
      console.error('Error fetching company names by ID:', error)
      toast.error(
        'An error occurred while fetching company names. Please try again.'
      )
    }
  }

  const getCompanyNames = async () => {
    try {
      const { companyNames } = await getBrokerCompanyNames()

      return companyNames
    } catch (error) {
      console.error('Error fetching company names:', error)
      toast.error(
        'An error occurred while fetching company names. Please try again.'
      )
    }
  }

  return { getCompanyNames, getCompanyNamesById }
}
