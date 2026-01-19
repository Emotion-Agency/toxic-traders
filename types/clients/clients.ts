import type { ITradingAccount } from '../trading-accounts/tradingAccounts'

export interface IClient {
  id: number
  tradingAccounts: ITradingAccount[]
  connectionId: string
  ip: string
  clientName: string
  status: 'Disconnected' | 'Connected'
}

export interface IClientData {
  totalCount: number
  items: IClient[]
}

export interface IGetAllClientsPayload {
  page: number
  count: number
  sortBy?: string
  sortOrder?: 1 | 2
}

export interface ICreateClientPayload {
  clientName: string
  ip: string
}

export interface IUpdateClientPayload {
  id: number
  clientName?: string
  ip?: string
}
