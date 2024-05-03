import axiosInstance from '../axiosInstance'
import type { iLogsData } from '~/types/logs'

export const getLogs = async (
  offset: number,
  count: number,
  sortBy: string,
  sortOrder: number
) => {
  try {
    const { data }: iLogsData = await axiosInstance.get('Log', {
      params: {
        offset,
        count,
        sortBy,
        sortOrder,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
