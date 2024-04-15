import {
  createBrokerReview,
  getBrokerReviews,
} from '~/api/brokers/brokerReviews'

export const useBrokerReviews = () => {
  const getReviews = async (brokerId: number) => {
    try {
      const data = await getBrokerReviews(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createReview = async (
    brokerId: number,
    url: string,
    rating: number,
    numberReviews: number
  ) => {
    try {
      const data = await createBrokerReview(
        brokerId,
        url,
        rating,
        numberReviews
      )

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getReviews, createReview }
}
