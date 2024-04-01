import axiosInstance from '../axiosInstance'
import type { iDepositMethodsData } from '~/types/broker/brokerDepositMethods'

export const getBrokerDepositMethods = async (brokerId: number) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.get(
      'Broker/DepositMethods',
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
