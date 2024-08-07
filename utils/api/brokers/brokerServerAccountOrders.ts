import type { iBrokerServerAccountOrdersData } from '~/types/broker/brokerServerAccountOrders'
import axiosInstance from '../axiosInstance'

export const getBrokerServerAccountOrders = async (serverAccountId: number) => {
  try {
    const { data }: iBrokerServerAccountOrdersData = await axiosInstance.get(
      'BrokerServerAccount/Orders',
      {
        params: {
          BrokerServerAccountId: serverAccountId,
        },
      }
    )

    return data
  } catch (e) {
    if (e.response.status !== 400) {
      console.error(e.message)
      throw e
    }
  }
}
