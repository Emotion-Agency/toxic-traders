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
  const trafficObject: iBrokerStatisticTrafficHistory = JSON.parse(
    params?.estimatedMonthlyVisits || '[]'
  )

  const objectsOfArray: { title: string; text: string }[] = []

  for (const [title, text] of Object.entries(trafficObject)) {
    const transformedText = numberToString(text, 2)
    objectsOfArray.push({ title, text: transformedText })
  }

  return objectsOfArray
}
