export interface IOHLCRow {
  time: string
  openPrice: number
  highPrice: number
  lowPrice: number
  closePrice: number
  tickVolume: number
  spread: number
  volume: number
}

export interface IOHLCSymbol {
  id: string
  symbol: string
  serverName: string
  serverType: number
  ohlcRows: IOHLCRow[] | null
}
