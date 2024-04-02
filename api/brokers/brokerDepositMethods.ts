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

export const updateBrokerDepositMethods = async (brokerId: number) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.put(
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

export const createBrokerDepositMethods = async (brokerId: number) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.post(
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

export const deleteBrokerDepositMethods = async (brokerId: number) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.delete(
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
