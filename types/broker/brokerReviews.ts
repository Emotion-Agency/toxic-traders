export interface iBrokerReviewsItem {
  id: number
  url: string
  rating: number
  numberOfReviews: number
}

export interface iBrokerReviewsData {
  data: {
    brokerReviews: iBrokerReviewsItem[]
  }
}
