import axiosInstance from '../axiosInstance'
import type { iLogsData } from '~/types/logs'

export const getSortedLogs = async (offset: number) => {
  try {
    const { data }: iLogsData = await axiosInstance.get('GetSortedLogs', {
      params: {
        offset,
        count: 25,
        sortOrder: 1,
        sortBy: 'companyNames',
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
  }
}
