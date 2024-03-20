import axiosInstance from '../axiosInstance'
import type { iLogsData } from '~/types/logs'

export const getSortedLogs = async () => {
  try {
    const { data }: iLogsData = await axiosInstance.get(
      'GetSortedLogs?offset=1&count=25&sortBy=companyNames&sortOrder=1'
    )

    return data
  } catch (e) {
    console.error(e.message)
  }
}
