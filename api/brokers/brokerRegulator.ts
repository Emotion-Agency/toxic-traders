import axiosInstance from '../axiosInstance'
import type {
  iRegulatorData,
  iRegulatorItem,
} from '~/types/broker/brokerRegulator'

export const getBrokerRegulator = async (brokerId: number) => {
  try {
    const { data }: iRegulatorData = await axiosInstance.get(
      'Broker/Regulator',
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

export const createBrokerRegulator = async (brokerId: number) => {
  try {
    const { data }: iRegulatorData = await axiosInstance.post(
      'Broker/Regulator',
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

export const updateBrokerRegulator = async (
  brokerId: number,
  regulators: iRegulatorItem[]
) => {
  try {
    const { data }: iRegulatorData = await axiosInstance.put(
      `Broker/Regulator`,
      regulators,
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

export const deleteBrokerRegulator = async (brokerId: number) => {
  try {
    const { data }: iRegulatorData = await axiosInstance.delete(
      'Broker/Regulator',
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
