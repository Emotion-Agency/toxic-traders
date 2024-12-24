import moment from 'moment-timezone'
import type { ICandle, IOHLCData } from '~/types/ohlc/symbols'
import { clientTimezone, serverTimezone } from '~/utils/constants/timezones'

export const symbolToCandleAdapter = (item: IOHLCData): ICandle => {
  const time = moment.tz(item.time, serverTimezone).clone().tz(clientTimezone)

  if (hasDifBetweenDST(item.time)) {
    time.subtract(1, 'hour')
  }

  return {
    x: time.format('YYYY-MM-DD HH:mm:ssZ'),

    y: [item.openPrice, item.highPrice, item.lowPrice, item.closePrice],
  }
}
