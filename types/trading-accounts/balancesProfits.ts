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

export interface IBalancesProfits {
  totalAccountsCount: number
  totalBalances: Record<string, number>
  totalProfits: Record<string, number>
  balancesProfits: IBalancesProfitsItem[]
}
