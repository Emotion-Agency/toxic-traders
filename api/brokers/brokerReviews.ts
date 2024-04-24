import axiosInstance from '../axiosInstance'
import type { iBrokerReviewsData } from '~/types/broker/brokerReviews'

export const getBrokerReviews = async (brokerId: number) => {
  try {
    const { data }: iBrokerReviewsData = await axiosInstance.get(
      'Broker/Reviews',
      {
        params: {
          BrokerId: brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const createBrokerReview = async (
  brokerId: number,
  url: string,
  rating: number,
  numberReviews: number
) => {
  try {
    const { data }: iBrokerReviewsData = await axiosInstance.post(
      `Broker/Reviews`,
      null,
      {
        params: {
          BrokerId: brokerId,
          Url: url,
          Rating: rating,
          NumberOfReviews: numberReviews,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
