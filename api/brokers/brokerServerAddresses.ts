import axiosInstance from '../axiosInstance'
import type { iServerAddressesData } from '~/types/broker/brokerServerAddresses'

export const getBrokerServerAddresses = async (brokerId: number) => {
  try {
    const { data }: iServerAddressesData = await axiosInstance.get(
      'Broker/ServerAddresses',
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
