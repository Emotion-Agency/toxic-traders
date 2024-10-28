export interface iOrder {
  id: number
  symbol: string
  description: string
  lotN: number
  lotA: number
  lotT: number
  slppN: number
  slppA: number
  slppT: number
  profN: number
  profA: number
  profT: number
  sl: number
  whenBE: number
  whereBE: number
  trailWhen: number
  trailStep: number
  reverse: boolean
  spread: number
  timer: number
  usePairSuffix: boolean
}

export interface iTradingAccount {
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
  // orders: iOrder[]
}

export interface iClient {
  id: number
  tradingAccounts: iTradingAccount[]
  connectionId: string
  ip: string
  clientName: string
  status: string
}

export interface iUser {
  id: number
  eventId: string
  clients: iClient[]
  eventStatus: number
}
