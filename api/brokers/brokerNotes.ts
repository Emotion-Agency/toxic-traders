import axiosInstance from '../axiosInstance'
import type { iNotesData } from '~/types/broker/brokerNotes'

export const getBrokerNotes = async (brokerId: number) => {
  try {
    const { data }: iNotesData = await axiosInstance.get('Broker/Notes', {
      params: {
        brokerId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const updateBrokerNotes = async (brokerId: number) => {
  try {
    const { data }: iNotesData = await axiosInstance.get('Broker/Notes', {
      params: {
        brokerId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const createBrokerNotes = async (brokerId: number) => {
  try {
    const { data }: iNotesData = await axiosInstance.get('Broker/Notes', {
      params: {
        brokerId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const deleteBrokerNotes = async (brokerId: number) => {
  try {
    const { data }: iNotesData = await axiosInstance.get('Broker/Notes', {
      params: {
        brokerId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}
