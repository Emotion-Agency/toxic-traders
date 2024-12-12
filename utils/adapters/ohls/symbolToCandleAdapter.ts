import moment from 'moment-timezone'
import type { ICandle, IOHLCData } from '~/types/ohlc/symbols'
import { clientTimezone, serverTimezone } from '~/utils/constants/timezones'

export const symbolToCandleAdapter = (item: IOHLCData): ICandle => {
  return {
    x: moment
      .tz(item.time, serverTimezone)
      .clone()
      .tz(clientTimezone)
      .format('YYYY-MM-DD HH:mm:ssZ'),
    y: [item.openPrice, item.highPrice, item.lowPrice, item.closePrice],
  }
}
