export interface ITradingAccount {
  id: number
  name: string
  login: string
  password: string
  symbolSpec: string
  brokerName: string
  brokerServer: string
  brokerServerType: number
  placedTypeMt4: number
  placedTypeMt5: number
  profitCommission: number
  balanceType: number
  brokerServerIPsAndPing: Record<string, unknown>
  orders: unknown[]
  templates: unknown[]
  clientId: number
}

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
  clients: IClient[]
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
