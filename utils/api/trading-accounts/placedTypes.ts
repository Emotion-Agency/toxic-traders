import type { iPlacedType } from '~/types/trading-accounts/placedTypes'
import axiosInstance from '../axiosInstance'

export const getPlacedTypeMT4 = async () => {
  try {
    const { data }: iPlacedType = await axiosInstance.get(
      'Enum/PlacedTypeMt4Enum'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const getPlacedTypeMT5 = async () => {
  try {
    const { data }: iPlacedType = await axiosInstance.get(
      'Enum/PlacedTypeMt5Enum'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
