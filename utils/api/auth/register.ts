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
    const objToSend = {
      email,
      password,
      role,
      allowDBAccess: allowDBAccess || false,
    }

    if (traderIdAttachTo) {
      objToSend['traderIdAttachTo'] = traderIdAttachTo
    }

    const response = await axiosInstance.post('/Auth/register', objToSend)
    return response?.data
  } catch (error) {
    throw error
  }
}
