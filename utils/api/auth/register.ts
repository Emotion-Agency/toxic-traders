import axiosInstance from '../axiosInstance'

export interface IRegisterRequest {
  email: string
  password: string
  role: string
  allowDBAccess?: boolean
  traderIdAttachTo?: string
}

export const registerRequest = async ({
  email,
  password,
  role,
  allowDBAccess,
  traderIdAttachTo,
}: IRegisterRequest) => {
  try {
    const response = await axiosInstance.post('/Auth/register', {
      email,
      password,
      role,
      allowDBAccess,
      // traderIdAttachTo: traderIdAttachTo || 0,
    })
    return response?.data
  } catch (error) {
    throw error
  }
}
