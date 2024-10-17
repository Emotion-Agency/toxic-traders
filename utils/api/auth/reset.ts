import axiosInstance from '../axiosInstance'

export const forgotPasswordRequest = async (email: string) => {
  try {
    const res = await axiosInstance.post('/Auth/forgotPassword', { email })
    return res?.data
  } catch (error) {
    throw error
  }
}

export const resetPasswordRequest = async (
  email: string,
  password: string,
  token: string
) => {
  try {
    const res = await axiosInstance.post('/Auth/resetPassword', {
      email,
      password,
      token,
    })
    return res?.data
  } catch (error) {
    throw error
  }
}
