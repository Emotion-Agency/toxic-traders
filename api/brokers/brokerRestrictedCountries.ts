import axiosInstance from '../axiosInstance'
import type { iRestrictedCountriesData } from '~/types/broker/brokerRestrictedCountries'

export const getBrokerRestrictedCountries = async (brokerId: number) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.get(
      'Broker/RestrictedCountries',
      {
        params: {
          brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const createBrokerRestrictedCountries = async (brokerId: number) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.post(
      'Broker/RestrictedCountries',
      {
        params: {
          brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const updateBrokerRestrictedCountries = async (brokerId: number) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.put(
      'Broker/RestrictedCountries',
      {
        params: {
          brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const deleteBrokerRestrictedCountries = async (brokerId: number) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.delete(
      'Broker/RestrictedCountries',
      {
        params: {
          brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
