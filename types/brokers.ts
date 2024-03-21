export interface iBroker {
  baseBrokerServerLocation?: string | null
  brokerCategory?: string | null
  brokerDepositMethods?: string | null
  brokerLeverage?: string | null
  brokerPlatforms?: string | null
  brokerReviewsForexPeaceArmyRating?: string | null
  brokerReviewsForexPeaceArmyReviewsCount?: string | null
  brokerReviewsFx123Rating?: string | null
  brokerReviewsFx123ReviewsCount?: string | null
  brokerReviewsTrustPilotRating?: string | null
  brokerReviewsTrustPilotReviewsCount?: string | null
  brokerReviewsWikifxRating?: string | null
  brokerReviewsWikifxReviewsCount?: string | null
  brokerServerTimezone?: string | null
  brokerServersMT4ServerNames?: string | null
  brokerServersMT5ServerNames?: string | null
  companyNames?: string | null
  createdDate?: string | null
  regulatorName?: string | null
  restrictedCountries?: string | null
  website?: string | null
  id?: number | null
}

export interface iBrokersData {
  data: {
    brokers: iBroker[]
    totalCount: number
    message: string
  }
}

export interface iBrokerData {
  data: iBroker
}

// export type iBrokerData = iBroker
