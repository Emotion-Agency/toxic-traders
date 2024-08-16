export const getGMTOffset = (minutes: number): string | number => {
  if (!minutes) return 0
  const sign = minutes >= 0 ? '+' : '-'
  const hours = Math.abs(minutes) / 60

  return `GMT${sign}${hours}`
}
