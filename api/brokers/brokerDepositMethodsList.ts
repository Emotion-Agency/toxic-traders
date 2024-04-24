import axiosInstance from '../axiosInstance'
import type { iDepositMethodsListData } from '~/types/broker/brokerDepositMethods'

export const getBrokerDepositMethodsList = async () => {
  try {
    const { data }: iDepositMethodsListData = await axiosInstance.get(
      'Broker/BrokerDepositMethodsEnum'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
