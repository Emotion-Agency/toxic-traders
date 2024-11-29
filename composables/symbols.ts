import type { IOHLCSymbol } from '~/types/ohlc/symbols'
import { getBrokerServerAccountSymbolsNames } from '~/utils/api/brokers/brokerServerAccountSymbols'
import { getOHLCSymbols } from '~/utils/api/ohlc/symbols'

export const useSymbols = () => {
  const OHLCsymbols = useState<IOHLCSymbol[]>('OHLCsymbols', () => [])

  const getSymbols = async (): Promise<IOHLCSymbol[]> => {
    try {
      if (OHLCsymbols.value.length) return OHLCsymbols.value
      const data = await getOHLCSymbols()

      OHLCsymbols.value = data

      return OHLCsymbols.value
    } catch (e) {
      console.error(e.message)
      throw e
    }
  }

  return { getSymbols }
}
