import moment from 'moment-timezone'
import { serverTimezone } from './constants/timezones'

declare global {
  interface Date {
    stdTimezoneOffset(): number
    isDstObserved(): boolean
  }
}

Date.prototype.stdTimezoneOffset = function () {
  const jan = new Date(this.getFullYear(), 0, 1)
  const jul = new Date(this.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}

Date.prototype.isDstObserved = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset()
}

export const formatDate = (input: string): string => {
  const date = new Date(input)

  const formatType = 'YYYY-MM-DD'

  return moment(date).format(formatType)
}

export const getDateDay = (input: string): string => {
  return formatDate(input)
}

export const getDateTime = (input: string | number) => {
  const date = new Date(input)

  const formatType = 'HH:mm:ss'

  return moment(date).format(formatType)
}

export const formatDateWithTime = (dateStr: string): string => {
  return `${getDateDay(dateStr)} ${getDateTime(dateStr)}`
}

export const formatDateWithTimeDdMmYyyy = (
  dateStr: string | number,
  tz: string = serverTimezone
): string => {
  const formatType = 'DD.MM.YYYY HH:mm:ss'

  console.log(
    moment.utc(dateStr).tz('America/New_York').format(formatType),
    moment.utc(dateStr).tz(tz).format(formatType)
  )

  return moment(dateStr).tz(tz).format(formatType)
}

export const formatDateAmpm = (input: string): string => {
  const date = new Date(input)

  const formatType = 'YYYY-MM-DD hh:mm:ss A'

  return moment(date).format(formatType)
}

export const formatDateToSeconds = (dateStr: string): number => {
  const date = new Date(dateStr)

  return Math.floor(date.getTime() / 1000)
}

export const minutesToGMT = (input: number | string): string => {
  if (input === 'N/A') {
    return 'N/A'
  }

  const minutes = typeof input === 'string' ? parseFloat(input) : input
  const hours = minutes / 60

  const sign = hours >= 0 ? '+' : '-'
  const absHours = Math.abs(Math.floor(hours))
  const offset = `GMT${sign}${absHours}`

  return offset
}

export const addSeconds = (date: Date, seconds: number): Date => {
  if (date && seconds) {
    return new Date(date.setSeconds(date.getSeconds() + seconds))
  }

  return new Date(Date.now())
}

export const hasDifBetweenDST = (
  dateStr: string | number,
  serverTz: string = 'Europe/Kiev',
  dstTz: string = 'America/New_York'
): boolean => {
  const serverDate = moment(dateStr).tz(serverTz)

  const serverOffset = serverDate.utcOffset()

  const dstOffset = moment(dateStr).tz(dstTz).utcOffset()

  const offsetDifference = Math.abs(dstOffset) - Math.abs(serverOffset)

  // if 120 thats means that the server is not in DST when the New York timezone is in DST
  return offsetDifference === 120
}

export const formatDateWithCustomDST = (
  dateStr: string | number,
  serverTz: string = 'Europe/Kiev',
  dstTz: string = 'America/New_York'
): string => {
  const formatType = 'DD.MM.YYYY HH:mm:ss'

  const serverDate = moment(dateStr).tz(serverTz)

  const hasOffset = hasDifBetweenDST(dateStr, serverTz, dstTz)

  if (hasOffset) {
    serverDate.add(1, 'hour')
  }

  return serverDate.format(formatType)
}
