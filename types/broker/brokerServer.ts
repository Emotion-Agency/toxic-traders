export interface iBrokerServerDataItem {
  name: string
  licenseNumber: number
  licenseLink: string
}

export interface iBrokerServerData {
  data: {
    brokerServers: {
      serverName: string
      clusterName: string
      serverType: number
      brokerServerAccounts: {
        accountType: string
        login: string
        password: string
        notes: string
        brokerLeverage: number
        brokerServerTimeZone: number
        brokerServerAccountLoginHistory: {
          login: string
          password: string
        }[]
        brokerServerAccountOrders: {
          login: string
          openTime: string
          ticket: number
          type: number
          comment: string
        }[]
        brokerServerAccountSymbolsMT5: {
          marginCurrency: string
          calcMode: number
          precision: number
          points: number
          depthOfMarket: number
          gtcMode: number
          isin: string
          tickSize: number
          currency: string
          contractSize: number
          digits: number
          description: string
          initialMargin: number
          executionType: number
          swapType: number
          swapLong: number
          swapShort: number
          threeDaysSwap: number
          tp: number
          sl: number
          fillPolicy: number
          lotsStep: number
          maxLots: number
          minLots: number
          groupName: string
          tradeMode: number
          brokerServerAccountSymbolMT5CommissionsInfo: {
            instantCommissionType: number
            commissionPeriod: number
            commissionType: number
            brokerServerAccountSymbolMT5CommissionsInfoCommission: {
              unitType: number
              unitMode: number
              unitValue: number
              minValue: number
              maxValue: number
              minUnit: number
              currencyUnit: string
              maxUnit: number
            }[]
          }[]
          spread: number
          newsSpread: number
        }[]
        brokerServerAccountSymbolsMT4: {
          contractSize: number
          digits: number
          tickSize: number
          freezeLevel: number
          point: number
          stopsLevel: number
          swapLong: number
          swapShort: number
          marginCurrency: string
          execution: number
          tradeMode: number
          profitMode: number
          marginMode: number
          symbol: string
          description: string
          margin_hedged: number
          margin_maintenance: number
          margin_divider: number
          margin_initial: number
          minLot: number
          maxLot: number
          lotStep: number
          groupName: string
          spread: number
          newsSpread: number
        }[]
      }[]
      brokerServerIPAddresses: {
        ipAddress: string
      }[]
    }[]
  }
}
