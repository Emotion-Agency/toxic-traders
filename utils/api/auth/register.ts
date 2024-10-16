import axiosInstance from '../axiosInstance'

export const registerRequest = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    const response = await axiosInstance.post('/Auth/register', {
      email,
      password,
      role,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
