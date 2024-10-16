import axiosInstance from '../axiosInstance'

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/Auth/login', {
      email,
      password,
    })

    return response.data
  } catch (error) {
    throw error
  }
}
