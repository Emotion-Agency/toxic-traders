import axiosInstance from '../axiosInstance'

export const getFourWeeksCalendarEvents = async () => {
  try {
    const res = await axiosInstance.get('/Calendar/GetFourWeeksCalendarEvents')

    return res
  } catch (error) {
    throw error
  }
}
