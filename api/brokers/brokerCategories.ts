import axiosInstance from '../axiosInstance'
import type { iCategoriesData } from '~/types/broker/brokerCategories'

export const getBrokerCategories = async (brokerId: number) => {
  try {
    const { data }: iCategoriesData = await axiosInstance.get(
      'Broker/BrokerCategories',
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

export const createBrokerCategories = async (brokerId: number) => {
  try {
    const { data }: iCategoriesData = await axiosInstance.post(
      'Broker/BrokerCategories',
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

export const deleteBrokerCategories = async (brokerId: number) => {
  try {
    const { data }: iCategoriesData = await axiosInstance.delete(
      'Broker/BrokerCategories',
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
