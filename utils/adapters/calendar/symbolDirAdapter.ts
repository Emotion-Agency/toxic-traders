export const symbolDirAdapterFromStringToNumber = (
  symbol: 'Buy' | 'Sell'
): 0 | 1 => {
  if (symbol === 'Buy') return 0
  if (symbol === 'Sell') return 1

  throw new Error('Invalid symbol direction')
}

export const symbolDirAdapterFromNumberToString = (
  symbol: 0 | 1
): 'Buy' | 'Sell' => {
  if (symbol === 0) return 'Buy'
  if (symbol === 1) return 'Sell'

  throw new Error('Invalid symbol direction')
}
