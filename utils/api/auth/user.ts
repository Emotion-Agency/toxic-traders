import type { iUser } from '~/types/settings/users'
import axiosInstance from '../axiosInstance'

export const getUserByIdRequest = async (id: number) => {
  try {
    const response = await axiosInstance.get<iUser>(`/Auth/userById`, {
      params: {
        targetUserId: id,
      },
    })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const getUserByEmailRequest = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/Auth/user`, {
      params: {
        email,
      },
    })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const deleteUserRequest = async (email: string) => {
  try {
    const response = await axiosInstance.delete(`/Auth/delete`, {
      data: email,
    })
    return response?.data
  } catch (error) {
    throw error
  }
}
