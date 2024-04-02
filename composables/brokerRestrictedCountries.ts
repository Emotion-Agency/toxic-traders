import {
  createBrokerRestrictedCountries,
  deleteBrokerRestrictedCountries,
  getBrokerRestrictedCountries,
  updateBrokerRestrictedCountries,
} from '~/api/brokers/brokerRestrictedCountries'

export const useBrokerRestrictedCountries = () => {
  const getRestrictedCountries = async (brokerId: number) => {
    try {
      const data = await getBrokerRestrictedCountries(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const updateRestrictedCountries = async (brokerId: number) => {
    try {
      const data = await updateBrokerRestrictedCountries(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createRestrictedCountries = async (brokerId: number) => {
    try {
      const data = await createBrokerRestrictedCountries(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deleteRestrictedCountries = async (brokerId: number) => {
    try {
      const data = await deleteBrokerRestrictedCountries(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return {
    getRestrictedCountries,
    updateRestrictedCountries,
    createRestrictedCountries,
    deleteRestrictedCountries,
  }
}
