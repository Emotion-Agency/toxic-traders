import axiosInstance from '../axiosInstance'
import type { iBrokersData } from '~/types/broker/broker'

export const getBroker = async (offset: number, count: number) => {
  try {
    const { data }: iBrokersData = await axiosInstance.get('Broker', {
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
    throw e
  }
}
