export interface IGetAllTradingAccountsPayload {
  page: number
  count: number
  sortBy?: string
  sortOrder?: 1 | 2
}

export interface IMT4Order {
  id: number
  ticket: number
  openTime: string
  closeTime: string
  expiration: string
  type: number
  lots: number
  symbol: string
  openPrice: number
  stopLoss: number
  takeProfit: number
  closePrice: number
  magicNumber: number
  swap: number
  commission: number
  comment: string
  profit: number
  rateOpen: number
  rateClose: number
  rateMargin: number
  state: number
}

export interface IMT5Order {
  id: number
  ticket: number
  profit: number
  closeProfit: number
  swap: number
  commission: number
  fee: number
  closePrice: number
  closeTime: string
  closeLots: number
  closeVolume: number
  closeComment: string
  openPrice: number
  openTime: string
  lots: number
  volume: number
  contractSize: number
  expertId: number
  placedType: number
  orderType: number
  dealType: number
  symbol: string
  comment: string
  state: number
  stopLoss: number
  takeProfit: number
  requestId: number
  digits: number
  profitRate: number
  stopLimitPrice: number
  expirationType: number
  expirationTime: string
  fillPolicy: number
  openTimestampUTC: number
  closeTimestampUTC: number
}

export interface IOrder {
  id: number
  symbol: string
  description: string
  lotN: number
  lotA: number
  lotT: number
  slppN: number
  slppA: number
  slppT: number
  slppStatus: boolean
  profN: number
  profA: number
  profT: number
  sl: number
  whenBE: number
  whereBE: number
  trailWhen: number
  trailStep: number
  trailReachedStep: number
  timer: number
  timerEnded: boolean
  reverse: boolean
  spread: number
  usePairSuffix: boolean
  status: number
  balanceFixed: number
  openedDateTime: string
  openedPrice: number
  openedLots: number
  openedType: number
  mT4Order: IMT4Order
  mT5Order: IMT5Order
  tradingAccountId: number
}

export type TTemplate = Omit<
  IOrder,
  | 'id'
  | 'mT4Order'
  | 'mT5Order'
  | 'status'
  | 'balanceFixed'
  | 'openedDateTime'
  | 'openedPrice'
  | 'openedLots'
  | 'openedType'
> & {
  id: number
}

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
  brokerServerIPsAndPing: Record<string, number>
  orders: IOrder[]
  templates: TTemplate[]
  tradingAccountBalanceFixed: number
  clientId: number
}

export interface ITradingAccountWithBalance {
  id: number
  balance: number
  currency: string
  name: string
  ping: number
  platform: number
  status: number
  type: string
}

export interface ITradingAccountsData {
  totalCount: number
  items: ITradingAccount[]
}

export interface ICreateTradingAccountPayload {
  name: string
  login: string
  password: string
  brokerServer?: string
  brokerServerType?: number
  brokerName?: string
  symbolSpec?: string
  placedTypeMt4?: number
  placedTypeMt5?: number
}

export interface IUpdateTradingAccountPayload {
  id: string
  name: string
  login: string
  password: string
  brokerServer?: string
  brokerServerType?: number
  brokerName?: string
  symbolSpec?: string
  placedTypeMt4?: number
  placedTypeMt5?: number
}
