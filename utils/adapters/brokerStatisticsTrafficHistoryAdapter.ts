import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import type { iBrokerStatisticTrafficHistory } from '~/types/broker/brokerStatisticTrafficHistory'

export const brokerStatisticsTrafficHistoryAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
) => {
  const trafficHistory: iBrokerStatisticTrafficHistory[] = JSON.parse(
    params?.trafficHistory || '[]'
  )

  const updatedItem = trafficHistory.map(item => ({
    date: item.date,
    organic: numberToString(item.organic, 2),
  }))

  return updatedItem
}
