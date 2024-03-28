import axiosInstance from '../axiosInstance'
import type { iRegulationData } from '~/types/regulation'

export const getBrokerRegulator = async () => {
  try {
    const { data }: iRegulationData = await axiosInstance.get(
      'Broker/Regulator'
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
