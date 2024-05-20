import axiosInstance from '../axiosInstance'
import type { iStatisticProviderData } from '~/types/broker/brokerStatisticProvider'

export const getBrokerStatisticProviders = async () => {
  try {
    const { data }: iStatisticProviderData = await axiosInstance.get(
      'Broker/BrokerCompanyNamesStatisticProviders'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
