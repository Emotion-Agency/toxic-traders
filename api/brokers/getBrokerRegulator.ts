import axiosInstance from '../axiosInstance'
import type { iRegulatorData } from '~/types/broker/brokerRegulator'

export const getBrokerRegulator = async () => {
  try {
    const { data }: iRegulatorData = await axiosInstance.get('Broker/Regulator')

    return data
  } catch (e) {
    console.error(e.message)
  }
}
