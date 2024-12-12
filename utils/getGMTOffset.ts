export const getGMTOffset = (minutes: number): string | number => {
  if (!minutes) return 0
  const sign = minutes >= 0 ? '+' : '-'
  const hours = Math.abs(minutes) / 60

  return `GMT${sign}${hours}`
}

export const getGMTTime = (minutes: number): string | number => {
  if (!isNumber(minutes)) return null
  const sign = minutes >= 0 ? '+' : '-'
  const hours = Math.abs(minutes) / 60

  if (Number.isInteger(hours)) {
    return `${sign}${hours}`
  }

  const [h, m] = hours.toString().split('.')

  return `${sign}${h}:${Math.round(+`0.${m}` * 60)}`
}
