import axiosInstance from '../axiosInstance'

export const getSortedBrokers = async () => {
  try {
    const { data } = await axiosInstance.get(
      'GetSortedBrokers?offset=1&count=25&sortBy=companyNames'
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
