import type { IBindToClientPayload } from '~/types/trading-accounts/tradingAccounts'
import {
  bindToClientRequest,
  unbindFromClientRequest,
} from '~/utils/api/trading-accounts/bindClient'

export const useBindClients = () => {
  const { toast } = useToasts()

  const bindToClient = async (payload: IBindToClientPayload) => {
    try {
      const { data } = await bindToClientRequest(payload)

      toast.success('Successfully bound to client.')
      return data
    } catch (error) {
      console.error('Error while binding to client:', error)
      toast.error('Failed to bind to client. Please try again.')
      throw error
    }
  }

  const unbindFromClient = async (payload: IBindToClientPayload) => {
    try {
      const { data } = await unbindFromClientRequest(payload)

      toast.success('Successfully unbound from client.')
      return data
    } catch (error) {
      console.error('Error while unbinding from client:', error)
      toast.error('Failed to unbind from client. Please try again.')
      throw error
    }
  }

  return {
    bindToClient,
    unbindFromClient,
  }
}
