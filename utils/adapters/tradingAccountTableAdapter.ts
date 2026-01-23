import type {
  ITradingAccount,
  ITradingAccountTableItem,
} from '~/types/trading-accounts/tradingAccounts'

export const tradingAccountTableAdapter = (
  account: ITradingAccount
): ITradingAccountTableItem => {
  return {
    id: account?.id,
    status: account?.lastStatus,
    ping: account?.lastPingMs ? Number(account.lastPingMs) : null,
    name: account?.name ?? 'N/A',
    balance: account?.lastBalance ? Number(account.lastBalance) : 0,
    currency: account?.lastCurrency ?? 'N/A',
    type: account?.balanceTypeName ?? 'N/A',
    platform: account?.brokerServerType,
  }
}
