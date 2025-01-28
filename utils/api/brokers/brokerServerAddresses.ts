import axiosInstance from '../axiosInstance'
import type { iServerAddressesData } from '~/types/broker/brokerServerAddresses'

export const getBrokerServerAddresses = async (brokerId: number) => {
  try {
    const { data }: iServerAddressesData = await axiosInstance.get(
      `Broker/BrokerCompanyNameAddresses/${brokerId}`
    )

    return data
  } catch (e) {
    if (e.response.status === 400) {
      return { addresses: [] }
    }
    console.error(e.message)
    throw e
  }
}
