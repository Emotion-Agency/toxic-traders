import axiosInstance from '../axiosInstance'
import type { iCategoriesListData } from '~/types/broker/brokerCategoriesList'

export const getBrokerCategoriesList = async () => {
  try {
    const { data }: iCategoriesListData = await axiosInstance.get(
      'Broker/CategoriesList'
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
