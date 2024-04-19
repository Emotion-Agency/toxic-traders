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

  const updateRestrictedCountries = async (
    brokerId: number,
    countriesItems: number[]
  ) => {
    try {
      const data = await updateBrokerRestrictedCountries(
        brokerId,
        countriesItems
      )

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createRestrictedCountries = async (
    brokerId: number,
    countriesItems: number[]
  ) => {
    try {
      const { restrictedCountries } = await createBrokerRestrictedCountries(
        brokerId,
        countriesItems
      )

      return restrictedCountries
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
