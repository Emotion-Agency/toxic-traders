import axiosInstance from '../axiosInstance'
import type { iPlatformsData } from '~/types/broker/brokerPlatforms'

export const getBrokerPlatforms = async (brokerId: number) => {
  try {
    const { data }: iPlatformsData = await axiosInstance.get(
      'Broker/Platforms',
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

export const createBrokerPlatforms = async (
  brokerId: number,
  platformItems: number[]
) => {
  try {
    const { data }: iPlatformsData = await axiosInstance.post(
      `Broker/Platforms`,
      platformItems,
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

export const updateBrokerPlatforms = async (
  brokerId: number,
  platformItems: number[]
) => {
  try {
    const { data }: iPlatformsData = await axiosInstance.put(
      'Broker/Platforms',
      platformItems,
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

export const deleteBrokerPlatforms = async (brokerId: number) => {
  try {
    const { data }: iPlatformsData = await axiosInstance.delete(
      'Broker/Platforms',
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
