import {
  createBrokerReview,
  getBrokerReviews,
  updateBrokerReview,
} from '~/api/brokers/brokerReviews'

export const useBrokerReviews = () => {
  const { addToast } = useToasts()

  const getReviews = async (brokerId: number) => {
    try {
      const data = await getBrokerReviews(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching reviews:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching reviews. Please try again.',
      })
    }
  }

  const updateReview = async (
    brokerReviewId: number,
    serviceName: string,
    url: string,
    rating: number,
    numberReviews: number
  ) => {
    try {
      const data = await updateBrokerReview(
        brokerReviewId,
        serviceName,
        url,
        rating,
        numberReviews
      )

      return data
    } catch (error) {
      console.error('Error updating review:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating review. Please try again.',
      })
    }
  }

  const createReview = async (
    brokerId: number,
    url: string,
    rating: number,
    numberReviews: number,
    serviceName: string
  ) => {
    try {
      const data = await createBrokerReview(
        brokerId,
        url,
        rating,
        numberReviews,
        serviceName
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

  return { getReviews, createReview, updateReview }
}
