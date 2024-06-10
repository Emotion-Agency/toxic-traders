import type { iBrokerStatisticEngagement } from '~/types/broker/brokerStatisticEngagement'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

export const brokerStatisticsEngagementAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
): iBrokerStatisticEngagement => {
  const updatedItem: iBrokerStatisticEngagement = {
    ...params,
    countryRank: JSON.parse(params?.countryRank || '[]'),
    categoryRank: JSON.parse(params?.categoryRank || '[]'),
    engagments: JSON.parse(params?.engagments || '[]'),
  }

  const obj = {
    globalRank: updatedItem?.globalRank,
    categoryRank: {
      Rank: updatedItem?.categoryRank?.Rank,
      Category: updatedItem?.categoryRank?.Category,
    },
    countryRank: {
      Country: updatedItem?.countryRank?.Country,
      CountryCode: updatedItem?.countryRank?.CountryCode,
      Rank: updatedItem?.countryRank?.Rank,
    },
    engagmentsVisists: updatedItem?.engagmentsVisists,
    engagments: {
      Month: updatedItem?.engagments?.Month,
      Year: updatedItem?.engagments?.Year,
      Visits: updatedItem?.engagments?.Visits,
    },
    trafficMonthlyAvg: updatedItem?.trafficMonthlyAvg,
    trafficMonthlyCost: updatedItem?.trafficMonthlyCost,
    organicSearchTraffic: updatedItem?.organicSearchTraffic,
  }

  return obj
}
