import axiosInstance from '../axiosInstance'
import type { iBrokerServerData } from '~/types/broker/brokerServer'

export const getBrokerServer = async (brokerId: number) => {
  try {
    const { data }: iBrokerServerData = await axiosInstance.get(
      'Broker/BrokerServer',
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

export const getBrokerServerById = async (brokerServerId: number) => {
  try {
    const { data }: iBrokerServerData = await axiosInstance.get(
      `Broker/BrokerServer/${brokerServerId}`
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const createBrokerServerAccount = async (
  accountType: string,
  login: string,
  password: string,
  brokerServerId: number
) => {
  try {
    const { data }: iBrokerServerData = await axiosInstance.get(
      `BrokerServerAccount`,
      {
        params: {
          accountType,
          login,
          password,
          brokerServerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
