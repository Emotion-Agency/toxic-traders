import {
  getBrokerCompanyNames,
  getBrokerCompanyNamesById,
} from '~/api/brokers/brokerCompanyNames'

export const useBrokerCompanyNames = () => {
  const getCompanyNamesById = async (brokerId: number) => {
    try {
      const { companyNames } = await getBrokerCompanyNamesById(brokerId)

      return companyNames
    } catch (error) {
      // alert with error
    }
  }

  const getCompanyNames = async () => {
    try {
      const { companyNames } = await getBrokerCompanyNames()

      return companyNames
    } catch (error) {
      // alert with error
    }
  }

  return { getCompanyNames, getCompanyNamesById }
}
