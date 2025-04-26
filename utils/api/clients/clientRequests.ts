import type {
  ICreateClientPayload,
  IUpdateClientPayload,
} from '~/types/clients/clients'
import axiosInstance from '../axiosInstance'

export const getClientRequest = async (id: string) => {
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
    const res = await axiosInstance.post(`/Clients/${payload.id}`, null, {
      params: {
        id: payload.id,
        clientName: payload.clientName,
        ip: payload.ip,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}

export const deleteClientRequest = async (id: string) => {
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
