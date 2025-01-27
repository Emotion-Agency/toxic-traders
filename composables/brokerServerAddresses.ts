import { getBrokerServerAddresses } from '~/utils/api/brokers/brokerServerAddresses'

export const useBrokerServerAddresses = () => {
  const { toast } = useToasts()

  const getServerAddresses = async (
    brokerId: number,
    brokerCompanyName: string
  ) => {
    try {
      const { addresses } = await getBrokerServerAddresses(
        brokerId,
        brokerCompanyName
      )

      return addresses
    } catch (error) {
      console.error('Error fetching server addresses:', error)
      toast.error(
        'An error occurred while fetching server addresses. Please try again.'
      )
    }
  }

  return { getServerAddresses }
}
