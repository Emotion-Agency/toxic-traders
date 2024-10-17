import { getBrokerById } from '~/utils/api/brokers/getBrokerById'
import { getBroker, getSearchBroker } from '~/utils/api/brokers/getBroker'
import type {
  iBroker,
  IBrokerSearchParams,
  iBrokerWithStatistic,
} from '~/types/broker/broker'
import { brokerSearchAdapter } from '~/utils/adapters/brokerSearchAdapter'

export const useBrokers = () => {
  const { toast } = useToasts()

  const getAllBrokersBySearch = async (params: IBrokerSearchParams) => {
    try {
      const transformedParams = brokerSearchAdapter(params)

      const { brokers, totalCount } = await getSearchBroker(transformedParams)

      const updatedBrokers = brokers.map(broker => {
        const statistics =
          (broker as iBrokerWithStatistic).brokerCompanyNameStatistic || {}

        const {
          semrush_OrganicSearchTraffic = 'N/A',
          ahrefs_TrafficMonthlyAvg = 'N/A',
          similarWeb_EstimatedMonthlyVisits = 'N/A',
        } = statistics

        const obj = {
          ...broker,
          semrush_OrganicSearchTraffic,
          ahrefs_TrafficMonthlyAvg,
          similarWeb_EstimatedMonthlyVisits,
        }

        delete (obj as iBrokerWithStatistic)?.brokerCompanyNameStatistic

        return obj
      })

      return { updatedBrokers, totalCount }
    } catch (error) {
      console.error('Error fetching brokers:', error)
      toast.error('An error occurred while fetching brokers. Please try again.')
    }
  }

  const getAllBrokers = async (offset: number, count: number) => {
    try {
      const { brokers, totalCount } = await getBroker(offset, count)

      return { brokers, totalCount }
    } catch (error) {
      console.error('Error fetching brokers:', error)

      toast.error('An error occurred while fetching brokers. Please try again.')
    }
  }

  const getCurrentBroker = async (brokerId: number) => {
    try {
      const data = await getBrokerById(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching current broker:', error)

      toast.error(
        'An error occurred while fetching current broker. Please try again.'
      )
    }
  }

  return { getAllBrokers, getAllBrokersBySearch, getCurrentBroker }
}
