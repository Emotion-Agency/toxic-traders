import { getBrokerServerAccountSymbolsNames } from '~/utils/api/brokers/brokerServerAccountSymbols'

export const useSymbols = () => {
  const symbols = useState<string[]>('symbols', () => [])

  const getSymbols = async (): Promise<string[]> => {
    try {
      if (symbols.value.length) return symbols.value
      const data = await getBrokerServerAccountSymbolsNames()

      symbols.value = data

      return symbols.value
    } catch (e) {
      console.error(e.message)
      throw e
    }
  }

  return { getSymbols }
}
