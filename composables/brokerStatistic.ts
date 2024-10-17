import {
  getBrokerStatisticProviders,
  getCurrentBrokerStatisticProvider,
} from '~/utils/api/brokers/brokerStatisticProviders'
import { getCurrentBrokerStatisticTraffic } from '~/utils/api/brokers/brokerStatisticTraffic'

export const useBrokerStatistic = () => {
  const { toast } = useToasts()

  const getStatisticProviders = async () => {
    try {
      const data = await getBrokerStatisticProviders()

      return data
    } catch (error) {
      console.error('Error fetching statistic providers:', error)

      toast.error(
        'An error occurred while fetching statistic providers. Please try again.'
      )
    }
  }

  const getCurrentStatisticProviders = async (
    brokerCompanyNameId: number,
    providerName: string
  ) => {
    try {
      const { brokerCompanyNameStatistic } =
        await getCurrentBrokerStatisticProvider(
          brokerCompanyNameId,
          providerName
        )

      return brokerCompanyNameStatistic
    } catch (error) {
      console.error(`Error fetching ${providerName} provider:`, error)
      toast.error(
        'An error occurred while fetching provider. Please try again.'
      )
      return []
    }
  }

  const getCurrentStatisticTraffic = async (
    providerName: string,
    brokerId: number
  ) => {
    try {
      const data = await getCurrentBrokerStatisticTraffic(
        providerName,
        brokerId
      )

      return data
    } catch (error) {
      console.error('Error fetching statistic traffic:', error)
      toast.error(
        'An error occurred while fetching statistic traffic. Please try again.'
      )
    }
  }

  return {
    getStatisticProviders,
    getCurrentStatisticProviders,
    getCurrentStatisticTraffic,
  }
}
