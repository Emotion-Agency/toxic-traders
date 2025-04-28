import type {
  ICreateClientPayload,
  IUpdateClientPayload,
} from '~/types/clients/clients'
import axiosInstance from '../axiosInstance'

export const getClientRequest = async (id: number) => {
  try {
    const res = await axiosInstance.get(`'/Clients/${id}'`, {
      params: {
        id,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}

export const createClientRequest = async (payload: ICreateClientPayload) => {
  try {
    const res = await axiosInstance.post('/Clients', payload)

    return res
  } catch (error) {
    throw error
  }
}

export const updateClientRequest = async (payload: IUpdateClientPayload) => {
  try {
    const res = await axiosInstance.put(`/Clients/${payload.id}`, payload)

    return res
  } catch (error) {
    throw error
  }
}

export const deleteClientRequest = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/Clients/${id}`, {
      params: {
        id,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}
