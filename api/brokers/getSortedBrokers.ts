import axiosInstance from '../axiosInstance'
import type { iBrokersData } from '~/types/brokers'

export const getSortedBrokers = async (offset: number, count: number) => {
  try {
    const { data }: iBrokersData = await axiosInstance.get('GetSortedBrokers', {
      params: {
        offset,
        count,
        sortOrder: 1,
        sortBy: 'companyNames',
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}
