import {
  createBrokerReview,
  getBrokerReviews,
} from '~/api/brokers/brokerReviews'

export const useBrokerReviews = () => {
  const { addToast } = useToasts()

  const getReviews = async (brokerId: number) => {
    try {
      const { brokerReviews } = await getBrokerReviews(brokerId)

      return brokerReviews
    } catch (error) {
      console.error('Error fetching reviews:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching reviews. Please try again.',
      })
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
      console.error('Error creating review:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating review. Please try again.',
      })
    }
  }

  return { getReviews, createReview }
}
