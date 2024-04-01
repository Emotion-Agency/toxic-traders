import axiosInstance from '../axiosInstance'
import type { iPlatformsData } from '~/types/broker/brokerPlatforms'

export const getBrokerPlatforms = async (brokerId: string) => {
  try {
    const { data }: iPlatformsData = await axiosInstance.get(
      'Broker/Platforms',
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
