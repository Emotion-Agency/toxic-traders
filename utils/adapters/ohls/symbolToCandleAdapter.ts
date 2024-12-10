import type { ICandle, IOHLCData } from '~/types/ohlc/symbols'

export const symbolToCandleAdapter = (item: IOHLCData): ICandle => {
  return {
    x: getDateTime(item.time),
    y: [item.openPrice, item.highPrice, item.lowPrice, item.closePrice],
  }
}
