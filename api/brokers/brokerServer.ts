import axiosInstance from '../axiosInstance'
import type { iBrokerServerData } from '~/types/broker/brokerServer'

export const getBrokerServer = async (brokerId: number) => {
  try {
    const { data }: iBrokerServerData = await axiosInstance.get(
      'BrokerServer/BrokerServer',
      {
        params: {
          BrokerId: brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const getBrokerServerById = async (serverId: number) => {
  try {
    const { data }: iBrokerServerData = await axiosInstance.get(
      `BrokerServer/BrokerServer`,
      {
        params: {
          BrokerServerId: serverId,
        },
      }
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
    const { data }: iBrokerServerData = await axiosInstance.post(
      `BrokerServerAccount`,
      {
        params: {
          AccountType: accountType,
          Login: login,
          Password: password,
          BrokerServerId: brokerServerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
