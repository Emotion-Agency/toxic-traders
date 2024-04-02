import axiosInstance from '../axiosInstance'
import type { iLogsData } from '~/types/logs'

export const getLogs = async (offset: number) => {
  try {
    const { data }: iLogsData = await axiosInstance.get('Log', {
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
