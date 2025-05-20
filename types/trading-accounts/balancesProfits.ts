export interface IBalancesProfitsItem {
  tradingAccountId: number
  currency: string
  balance: number
  balanceType: string
  profit: number
  profitCommission: number
  lastPing: number
  onlineStatus: number
}

export type ICurrencyData = Record<string, number>

export interface IBalancesProfits {
  totalAccountsCount: number
  totalBalances: ICurrencyData
  totalProfits: ICurrencyData
  balancesProfits: IBalancesProfitsItem[]
}
