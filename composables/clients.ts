import type {
  IClient,
  IClientData,
  IGetAllClientsPayload,
  ICreateClientPayload,
  IUpdateClientPayload,
} from '~/types/clients/clients'
import {
  createClientRequest,
  deleteClientRequest,
  getClientRequest,
  updateClientRequest,
} from '~/utils/api/clients/clientRequests'
import { getAllClientsRequest } from '~/utils/api/clients/getAllClients'

export const useClients = () => {
  const { toast } = useToasts()

  const getAllClients = async (
    payload: IGetAllClientsPayload
  ): Promise<IClientData> => {
    try {
      const data = await getAllClientsRequest(payload)
      return data
    } catch (error) {
      console.error('Error fetching all clients:', error)
      toast.error(
        'An error occurred while fetching all clients. Please try again.'
      )
      throw error
    }
  }

  const getClient = async (id: number): Promise<IClient> => {
    try {
      const { data } = await getClientRequest(id)
      return data
    } catch (error) {
      console.error('Error fetching client:', error)
      toast.error(
        'An error occurred while fetching the client. Please try again.'
      )
      throw error
    }
  }

  const createClient = async (payload: ICreateClientPayload) => {
    try {
      const res = await createClientRequest(payload)
      toast.success('Client created successfully.')
      return res
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error(
        'An error occurred while creating the client. Please try again.'
      )
      throw error
    }
  }

  const updateClient = async (payload: IUpdateClientPayload) => {
    try {
      const res = await updateClientRequest(payload)
      toast.success('Client updated successfully.')
      return res
    } catch (error) {
      console.error('Error updating client:', error)
      toast.error(
        'An error occurred while updating the client. Please try again.'
      )
      throw error
    }
  }

  const deleteClient = async (id: number) => {
    try {
      const res = await deleteClientRequest(id)
      toast.success('Client deleted successfully.')
      return res
    } catch (error) {
      console.error('Error deleting client:', error)
      toast.error(
        'An error occurred while deleting the client. Please try again.'
      )
      throw error
    }
  }

  return { getAllClients, getClient, createClient, updateClient, deleteClient }
}
