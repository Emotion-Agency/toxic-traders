export const serverTimezone = 'Europe/Kiev'
export const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const newsTimezone = 'Europe/London'

export const serverTimezoneOffset =
  getTimezoneOffsetByLocaleConverted(serverTimezone)
export const clientTimezoneOffset =
  getTimezoneOffsetByLocaleConverted(clientTimezone)

export const newsTimezoneOffset =
  getTimezoneOffsetByLocaleConverted(newsTimezone)
