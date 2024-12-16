export const getTimezoneOffsetByLocale = (
  locale: string,
  date: string | Date = new Date()
) => {
  // Get the UTC offset in minutes
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: locale }))

  const offset = (utcDate.getTime() - localDate.getTime()) / 60000 // Convert milliseconds to minutes

  return offset
}

export const getTimezoneOffsetByLocaleConverted = (
  locale: string,
  date = new Date()
) => {
  return getGMTTime(-getTimezoneOffsetByLocale(locale, date))
}
