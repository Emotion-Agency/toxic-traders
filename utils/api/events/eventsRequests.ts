import type {
  ICreateEventPayload,
  IUpdateEventPayload,
} from '~/types/events/events'
import axiosInstance from '../axiosInstance'

export const getEventsRequest = async () => {
  try {
    const res = await axiosInstance.get('/Events')

    return res
  } catch (error) {
    throw error
  }
}

export const createEventRequest = async (payload: ICreateEventPayload) => {
  try {
    const res = await axiosInstance.post('/Events', payload)

    return res
  } catch (error) {
    throw error
  }
}

export const updateEventRequest = async (
  payload: IUpdateEventPayload,
  id: number
) => {
  try {
    const res = await axiosInstance.put(`/Events/${id}`, payload)

    return res
  } catch (error) {
    throw error
  }
}

export const deleteEventRequest = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/Events/${id}`, {
      params: {
        id,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}
