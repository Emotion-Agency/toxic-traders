import moment from 'moment-timezone'
import { serverTimezone } from './constants/timezones'

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
