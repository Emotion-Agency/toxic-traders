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
  brokerServerTypeName: string
  placedTypeMt4: number
  placedTypeMt4Name: string
  placedTypeMt5: number
  placedTypeMt5Name: string
  profitCommission: number
  balanceType: number
  balanceTypeName: string
  tradingAccountBalanceFixed: number
  clientId: number
  lastStatus: 'Online' | 'Offline'
  lastPingMs: number
  lastCurrency: string
  lastBalance: number
  lastEquity: number
  lastTotalDeposits: number
  lastTotalWithdrawals: number
  lastTradingProfit: number
  lastInvestorShare: number
  lastCheckedAt: string
  lastError: string
  displayBalance: number
  displayProfit: number
}

export interface ITradingAccountTableItem {
  id: number
  balance: number
  currency: string
  name: string
  ping: number
  platform: number
  status: 'Online' | 'Offline'
  type: string
}

export interface ISummary {
  totalBalances: Record<string, number>
  totalProfits: Record<string, number>
}

export interface ITradingAccountsData {
  items: ITradingAccount[]
  totalCount: number
  summary: ISummary
}

export interface ITradingAccountPayload {
  name: string
  login: string
  password: string
  // servers?: IBindToClientPayload
  brokerServerType?: number
  brokerName?: string
  brokerServer?: string
  symbolSpec?: string
  placedTypeMt4?: string
  placedTypeMt5?: string
}

export interface IBindToClientPayload {
  tradingAccountId: number
  clientId: number
}
