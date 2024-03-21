import axiosInstance from '../axiosInstance'
import type { iBrokersData } from '~/types/brokers'

export const getSortedBrokers = async (offset: number) => {
  try {
    const { data }: iBrokersData = await axiosInstance.get('GetSortedBrokers', {
      params: {
        offset,
        count: 25,
        sortOrder: 1,
        sortBy: 'companyNames',
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}
