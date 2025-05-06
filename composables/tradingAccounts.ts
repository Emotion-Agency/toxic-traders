import type {
  ICreateTradingAccountPayload,
  IGetAllTradingAccountsPayload,
  ITradingAccount,
  ITradingAccountsData,
  IUpdateTradingAccountPayload,
} from '~/types/trading-accounts/tradingAccounts'
import { getAllTradingAccountsRequest } from '~/utils/api/trading-accounts/getAllTradingAccounts'
import {
  createTradingAccountRequest,
  deleteTradingAccountRequest,
  getTradingAccountRequest,
  updateTradingAccountRequest,
} from '~/utils/api/trading-accounts/tradingAccountsRequests'

export const useTradingAccounts = () => {
  const { toast } = useToasts()

  const getAllTradingAccounts = async (
    payload: IGetAllTradingAccountsPayload
  ): Promise<ITradingAccountsData> => {
    try {
      const data = await getAllTradingAccountsRequest(payload)
      return data
    } catch (error) {
      console.error('Error fetching all trading accounts:', error)
      toast.error(
        'An error occurred while fetching all trading accounts. Please try again.'
      )
      throw error
    }
  }

  const getTradingAccount = async (id: number): Promise<ITradingAccount> => {
    try {
      const { data } = await getTradingAccountRequest(id)
      return data
    } catch (error) {
      console.error('Error fetching trading account:', error)
      toast.error(
        'An error occurred while fetching the trading account. Please try again.'
      )
      throw error
    }
  }

  const createTradingAccount = async (
    payload: ICreateTradingAccountPayload
  ) => {
    try {
      const res = await createTradingAccountRequest(payload)
      toast.success('Trading account created successfully.')
      return res
    } catch (error) {
      console.error('Error creating trading account:', error)
      toast.error(
        'An error occurred while creating the trading account. Please try again.'
      )
      throw error
    }
  }

  const updateTradingAccount = async (
    payload: IUpdateTradingAccountPayload
  ) => {
    try {
      const res = await updateTradingAccountRequest(payload)
      toast.success('Trading account updated successfully.')
      return res
    } catch (error) {
      console.error('Error updating trading account:', error)
      toast.error(
        'An error occurred while updating the trading account. Please try again.'
      )
      throw error
    }
  }

  const deleteTradingAccount = async (id: number) => {
    try {
      const res = await deleteTradingAccountRequest(id)
      toast.success('Trading account deleted successfully.')
      return res
    } catch (error) {
      console.error('Error deleting trading account:', error)
      toast.error(
        'An error occurred while deleting the trading account. Please try again.'
      )
      throw error
    }
  }

  return {
    getAllTradingAccounts,
    getTradingAccount,
    createTradingAccount,
    updateTradingAccount,
    deleteTradingAccount,
  }
}
