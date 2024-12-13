import type {
  ICalendarEvent,
  ITableCalendarEvent,
} from '~/types/calendar/events'
import { calendarEventAdapter } from '~/utils/adapters/calendar/calendarEventAdapter'
import { symbolDirAdapterFromStringToNumber } from '~/utils/adapters/calendar/symbolDirAdapter'
import {
  bindOHLCSymbolToEvent,
  disableCalendarEvent,
  getAllCalendarEvents,
  getAllGroupedCalendarEvents,
  getCalendarEventsByExactTitleAndCountry,
  getCalendarEventsByTitleAndCountry,
  getGroupedCalendarEventsByTitleAndCountry,
  setImportanceToEvent,
  setOHLCSymbolTradeDirection,
  unbindOHLCSymbolToEvent,
} from '~/utils/api/calendar/calendarEvents'
import { countryCodes } from '~/utils/constants/countryCodes'
import { clientTimezoneOffset } from '~/utils/constants/timezones'

export const useCalendarEvents = () => {
  const events = ref<ITableCalendarEvent[]>([
    {
      id: 4912,
      time: '2020-03-19 08:30:00+0',
      serverTime: '2020-03-19T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 4912,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 4912,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 4912,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 4912,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 4912,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 10682,
      time: '2020-06-18 07:30:00+0',
      serverTime: '2020-06-18T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 10682,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 10682,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 10682,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 10682,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 10682,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 16520,
      time: '2020-09-24 07:30:00+0',
      serverTime: '2020-09-24T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 16520,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 16520,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 16520,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 16520,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 16520,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 21976,
      time: '2020-12-17 08:30:00+0',
      serverTime: '2020-12-17T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 21976,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 21976,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 21976,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 21976,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 21976,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 28056,
      time: '2021-03-25 08:30:00+0',
      serverTime: '2021-03-25T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 28056,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 28056,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 28056,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 28056,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 28056,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 33558,
      time: '2021-06-17 07:30:00+0',
      serverTime: '2021-06-17T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 33558,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 33558,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 33558,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 33558,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 33558,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 39310,
      time: '2021-09-23 07:30:00+0',
      serverTime: '2021-09-23T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 39310,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 39310,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 39310,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 39310,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 39310,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 44944,
      time: '2021-12-16 08:30:00+0',
      serverTime: '2021-12-16T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 44944,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 44944,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 44944,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 44944,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 44944,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 51294,
      time: '2022-03-24 08:30:00+0',
      serverTime: '2022-03-24T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.75',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 51294,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 51294,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 51294,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 51294,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 51294,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 57055,
      time: '2022-06-16 07:30:00+0',
      serverTime: '2022-06-16T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '-0.25',
      forecast: '-0.75',
      previous: '-0.75',
      unit: '%',
      scale: '',
      dev: 0.5,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 57055,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 57055,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 57055,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 57055,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 57055,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 63176,
      time: '2022-09-22 07:30:00+0',
      serverTime: '2022-09-22T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '0.5',
      forecast: '0.5',
      previous: '-0.25',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 63176,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 63176,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 63176,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 63176,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 63176,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 68979,
      time: '2022-12-15 08:30:00+0',
      serverTime: '2022-12-15T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1',
      forecast: '1',
      previous: '0.5',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 68979,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 68979,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 68979,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 68979,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 68979,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 75573,
      time: '2023-03-23 08:30:00+0',
      serverTime: '2023-03-23T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1.5',
      forecast: '1.5',
      previous: '1',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 75573,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 75573,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 75573,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 75573,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 75573,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 82073,
      time: '2023-06-22 08:30:00+0',
      serverTime: '2023-06-22T11:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1.75',
      forecast: '1.75',
      previous: '1.5',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 82073,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 82073,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 82073,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 82073,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 82073,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 88207,
      time: '2023-09-21 07:30:00+0',
      serverTime: '2023-09-21T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1.75',
      forecast: '2',
      previous: '1.75',
      unit: '%',
      scale: '',
      dev: -0.25,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 88207,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 88207,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 88207,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 88207,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 88207,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 94214,
      time: '2023-12-14 08:30:00+0',
      serverTime: '2023-12-14T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1.75',
      forecast: '1.75',
      previous: '1.75',
      unit: '',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 94214,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 94214,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 94214,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 94214,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 94214,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 101147,
      time: '2024-03-21 08:30:00+0',
      serverTime: '2024-03-21T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1.5',
      forecast: '1.75',
      previous: '1.75',
      unit: '%',
      scale: '',
      dev: -0.25,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 101147,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 101147,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 101147,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 101147,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 101147,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 113398,
      time: '2024-09-26 07:30:00+0',
      serverTime: '2024-09-26T10:30:00+03:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '2',
      actual: '1',
      forecast: '1',
      previous: '1.25',
      unit: '%',
      scale: '',
      dev: 0,
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 113398,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 113398,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 113398,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 113398,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 113398,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
    {
      id: 132769,
      time: '2024-12-12 08:30:00+0',
      serverTime: '2024-12-12T10:30:00+02:00',
      event: 'SNB Interest Rate Decision',
      country: 'CH',
      importance: '1',
      actual: '',
      forecast: '0.75',
      previous: '1',
      unit: '%',
      scale: '',
      dev: '__vue_devtool_undefined__',
      slug: 'snb-interest-rate-decision-ch',
      symbols: [
        {
          calendarEventId: 132769,
          ohlcSymbolId: 9,
          ohlcSymbol: {
            id: 9,
            symbol: 'CHFJPY.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 0,
          tradeDirection: 0,
        },
        {
          calendarEventId: 132769,
          ohlcSymbolId: 12,
          ohlcSymbol: {
            id: 12,
            symbol: 'EURCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 2,
          tradeDirection: 1,
        },
        {
          calendarEventId: 132769,
          ohlcSymbolId: 40,
          ohlcSymbol: {
            id: 40,
            symbol: 'USDCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 3,
          tradeDirection: 1,
        },
        {
          calendarEventId: 132769,
          ohlcSymbolId: 28,
          ohlcSymbol: {
            id: 28,
            symbol: 'GBPCHF.r',
            serverName: 'FPMarketsLLC-Live',
            serverType: 1,
            ohlcRows: null,
          },
          order: 4,
          tradeDirection: 1,
        },
      ],
      firstSymbol: {
        calendarEventId: 132769,
        ohlcSymbolId: 9,
        ohlcSymbol: {
          id: 9,
          symbol: 'CHFJPY.r',
          serverName: 'FPMarketsLLC-Live',
          serverType: 1,
          ohlcRows: null,
        },
        order: 0,
        tradeDirection: 0,
      },
      disable: false,
    },
  ])
  const totalCount = ref<number>(0)
  const activeEvent = useState<ITableCalendarEvent>('activeEvent', () => null)

  const { toast } = useToasts()

  const prepareEvents = (data: ICalendarEvent[]) => {
    events.value = data.map(event => calendarEventAdapter(event))

    return events.value
  }

  interface IGetEventsParams {
    page: number
    count: number
    startDate?: string
    endDate?: string
    sort?: 0 | 1
  }

  const getEvents = async ({
    page,
    count,
    startDate,
    endDate,
    sort,
  }: IGetEventsParams) => {
    try {
      const res = await getAllCalendarEvents({
        page,
        pageSize: count,
        startDate: startDate
          ? getDateDay(startDate) + `T00:00:00${clientTimezoneOffset}`
          : undefined,
        endDate: endDate
          ? getDateDay(endDate) + `T23:59:59${clientTimezoneOffset}`
          : getDateDay(startDate) + `T23:59:59${clientTimezoneOffset}`,
        sortOrder: sort,
        filter: 2,
      })
      const data = res?.data

      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data.events)

      totalCount.value = data.totalCount
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const getGroupedEvents = async (page: number, count: number) => {
    try {
      const res = await getAllGroupedCalendarEvents({ page, pageSize: count })
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data.events)

      totalCount.value = data.totalCount
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const getWeekEvents = async (page: number, count: number, sort?: 0 | 1) => {
    const today = new Date()

    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    await getEvents({
      page,
      count,
      sort,
      startDate: getDateDay(startOfWeek.toString()),
      endDate: getDateDay(endOfWeek.toString()),
    })
  }

  const getEventsByName = async (title: string, country: string) => {
    try {
      const res = await getCalendarEventsByTitleAndCountry({
        Title: title,
        Country: country,
        Filter: 2,
        page: 1,
        pageSize: 10000,
      })
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
      totalCount.value = data.length
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const getEventsByExactName = async (title: string, country: string) => {
    try {
      const res = await getCalendarEventsByExactTitleAndCountry(
        title,
        country,
        2
      )
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
      totalCount.value = data.length
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const getGroupedEventsByName = async (query: string) => {
    try {
      const [country, ...title] = query.split(' ')

      const isCountry = countryCodes.includes(country?.toUpperCase())

      let res: { data: ICalendarEvent[] } | undefined

      if (isCountry) {
        res = await getGroupedCalendarEventsByTitleAndCountry(
          title?.join(' '),
          country?.toUpperCase()
        )
      } else {
        res = await getGroupedCalendarEventsByTitleAndCountry(query)
      }

      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      prepareEvents(data)
      totalCount.value = data?.length
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  const disableEvent = async (
    title: string,
    country: string,
    value: boolean
  ) => {
    try {
      await disableCalendarEvent(title, country, value)
    } catch (error) {
      console.error('Error disabling event:', error)
      toast.error(
        'An error occurred while disabling the event. Please try again.'
      )
    }
  }

  const bindSymbol = async (
    title: string,
    country: string,
    symbolId: number,
    order: number
  ) => {
    try {
      await bindOHLCSymbolToEvent(title, country, symbolId, order)
    } catch (error) {
      console.error('Error binding symbols:', error)
      toast.error('An error occurred while binding symbols. Please try again.')
    }
  }

  const unbindSymbol = async (
    title: string,
    country: string,
    symbolId: number
  ) => {
    try {
      await unbindOHLCSymbolToEvent(title, country, symbolId)
    } catch (error) {
      console.error('Error unbinding symbols:', error)
      toast.error(
        'An error occurred while unbinding symbols. Please try again.'
      )
    }
  }

  const changeImportance = async (
    title: string,
    country: string,
    value: 0 | 1 | 2
  ) => {
    try {
      await setImportanceToEvent(title, country, value)
    } catch (error) {
      console.error('Error changing event importance:', error)
      toast.error(
        'An error occurred while changing event importance. Please try again.'
      )
    }
  }

  const setSymbolDirection = async (
    title: string,
    country: string,
    symbolId: number,
    tradeDirection: 'Buy' | 'Sell'
  ) => {
    try {
      const res = await setOHLCSymbolTradeDirection(
        title,
        country,
        symbolId,
        symbolDirAdapterFromStringToNumber(tradeDirection)
      )
      const data = res?.data
      if (!data) {
        throw new Error('No data returned from the API')
      }

      return data
    } catch (error) {
      console.error('Error fetching symbol direction:', error)
      toast.error(
        'An error occurred while fetching symbol direction. Please try again.'
      )
    }
  }

  return {
    events,
    totalCount,
    activeEvent,
    getEvents,
    getGroupedEvents,
    getWeekEvents,
    getEventsByName,
    getEventsByExactName,
    getGroupedEventsByName,
    disableEvent,
    bindSymbol,
    unbindSymbol,
    changeImportance,
    setSymbolDirection,
  }
}
