import {
  getBrokerServer,
  getBrokerServerById,
} from '~/utils/api/brokers/brokerServer'

export const useBrokerServer = () => {
  const { toast } = useToasts()

  const getAllBrokerServers = async (brokerId: number) => {
    try {
      const { brokerServers } = await getBrokerServer(brokerId)
      const brokerServerAccounts = brokerServers.map(servers =>
        servers.brokerServerAccounts.map(account => {
          return { ...account, serverId: servers.id }
        })
      )

      return { brokerServers, brokerServerAccounts }
    } catch (error) {
      console.error('Error fetching broker servers:', error)
      toast.error(
        'An error occurred while fetching broker servers. Please try again.'
      )
    }
  }

  const getCurrentBrokerServer = async (brokerServerId: number) => {
    try {
      const { data } = await getBrokerServerById(brokerServerId)

      return data
    } catch (error) {
      console.error('Error fetching current broker server:', error)
      toast.error(
        'An error occurred while fetching current broker server. Please try again.'
      )
    }
  }

  return { getAllBrokerServers, getCurrentBrokerServer }
}
