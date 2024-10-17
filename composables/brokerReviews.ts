import {
  createBrokerReview,
  deleteBrokerReview,
  getBrokerReviews,
  updateBrokerReview,
} from '~/utils/api/brokers/brokerReviews'

export const useBrokerReviews = () => {
  const { toast } = useToasts()

  const getReviews = async (brokerId: number) => {
    try {
      const data = await getBrokerReviews(brokerId)

      return (
        Object.values(data)?.filter(el => !!el && typeof el !== 'string') || []
      )
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error('An error occurred while fetching reviews. Please try again.')
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

      toast.success('Review successfully updated.')

      return data
    } catch (error) {
      console.error('Error updating review:', error)
      toast.error('An error occurred while updating review. Please try again.')
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

      toast.success('Review successfully created.')

      return data
    } catch (error) {
      console.error('Error creating review:', error)
      toast.error('An error occurred while creating review. Please try again.')
    }
  }

  const deleteReview = async (brokerReviewId: number) => {
    try {
      const data = await deleteBrokerReview(brokerReviewId)

      toast.success('Review successfully deleted.')

      return data
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('An error occurred while deleting review. Please try again.')
    }
  }

  return { getReviews, createReview, updateReview, deleteReview }
}
