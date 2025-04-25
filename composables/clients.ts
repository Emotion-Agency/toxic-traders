import type { IClient, IGetAllClientsPayload } from '~/types/clients/clients'
import { getAllClientsRequest } from '~/utils/api/clients/getAllClients'

export const useClients = () => {
  const { toast } = useToasts()

  const getAllClients = async (
    payload: IGetAllClientsPayload
  ): Promise<IClient[] | undefined> => {
    try {
      const data = await getAllClientsRequest(payload)

      return data
    } catch (error) {
      console.error('Error fetching all clients:', error)
      toast.error(
        'An error occurred while fetching all clients. Please try again.'
      )
    }
  }

  return { getAllClients }
}
