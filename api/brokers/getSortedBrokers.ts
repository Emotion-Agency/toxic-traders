import axiosInstance from '../axiosInstance'

export const getSortedBrokers = async () => {
  try {
    return await axiosInstance.get(
      'GetSortedBrokers?offset=1&count=25&sortBy=companyNames'
    )
  } catch (e) {
    console.error(e.message)
  }
}
