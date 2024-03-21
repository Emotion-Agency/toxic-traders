import axiosInstance from '../axiosInstance'
import type { iBrokerData } from '~/types/brokers'

export const getBrokerById = async (id: number) => {
  try {
    const { data }: iBrokerData = await axiosInstance.get(`GetBrokerById`, {
      params: {
        id,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}
