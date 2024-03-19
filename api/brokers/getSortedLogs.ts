import axiosInstance from '../axiosInstance'
import type { iBrokersData } from '~/types/brokers'

export const getSortedBrokers = async () => {
  try {
    const { data }: iBrokersData = await axiosInstance.get(
      'GetSortedLogs?offset=1&count=25&sortBy=companyNames&sortOrder=1'
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
