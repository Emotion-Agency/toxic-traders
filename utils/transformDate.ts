interface iDateTimeParams {
  startDateTime: string
  seconds: number
  timezone: string | number
}

export const formatDate = (input: string): string => {
  const date = new Date(input)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDateWithTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  const pad = (num: number) => num.toString().padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const formatDateAmpm = (input: string): string => {
  const date = new Date(input)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12 || 12

  const formattedHours = String(hours).padStart(2, '0')

  return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`
}

export const formatDateToSeconds = (dateStr: string): number => {
  const date = new Date(dateStr)

  return Math.floor(date.getTime() / 1000)
}

export const getStartDateTime = (startDateTime: string): string => {
  const [dateTime, timeZone] = startDateTime.split(/([+-]\d{2}:\d{2})$/)

  const utcDate = new Date(`${dateTime}Z`)

  const offsetSign = timeZone[0]
  const offsetHours = parseInt(timeZone.slice(1, 3), 10)
  const offsetMinutes = parseInt(timeZone.slice(4, 6), 10)

  const offsetTotalMinutes = offsetHours * 60 + offsetMinutes
  const offsetMilliseconds = offsetTotalMinutes * 60 * 1000

  const adjustedTime = new Date(
    utcDate.getTime() +
      (offsetSign === '+' ? offsetMilliseconds : -offsetMilliseconds)
  )

  const year = adjustedTime.getUTCFullYear()
  const month = String(adjustedTime.getUTCMonth() + 1).padStart(2, '0')
  const day = String(adjustedTime.getUTCDate()).padStart(2, '0')
  const hours = String(adjustedTime.getUTCHours()).padStart(2, '0')
  const minutes = String(adjustedTime.getUTCMinutes()).padStart(2, '0')
  const seconds = String(adjustedTime.getUTCSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// export const getStartDateTime = (startDateTime: string): string => {
//   const [dateTime, timeZone] = startDateTime.split(/([+-]\d{2}:\d{2})$/)

//   const utcDate = new Date(`${dateTime}Z`)

//   const offsetSign = timeZone[0]
//   const offsetHours = parseInt(timeZone.substr(1, 2), 10)
//   const offsetMinutes = parseInt(timeZone.substr(4, 2), 10)

//   const offsetTotalMinutes = offsetHours * 60 + offsetMinutes
//   const offsetMilliseconds = offsetTotalMinutes * 60 * 1000

//   const adjustedTime = new Date(
//     utcDate.getTime() +
//       (offsetSign === '+' ? offsetMilliseconds : -offsetMilliseconds)
//   )

//   const year = adjustedTime.getUTCFullYear()
//   const month = String(adjustedTime.getUTCMonth() + 1).padStart(2, '0')
//   const day = String(adjustedTime.getUTCDate()).padStart(2, '0')
//   const hours = String(adjustedTime.getUTCHours()).padStart(2, '0')
//   const minutes = String(adjustedTime.getUTCMinutes()).padStart(2, '0')
//   const seconds = String(adjustedTime.getUTCSeconds()).padStart(2, '0')

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
// }
export const getEndDateTime = ({
  startDateTime,
  seconds,
  timezone,
}: iDateTimeParams): string => {
  const startDate = new Date(startDateTime)

  let targetOffset: number

  if (typeof timezone === 'string') {
    const timezoneMatch = timezone.match(/GMT([+-]\d+)/)
    if (timezoneMatch) {
      targetOffset = parseInt(timezoneMatch[1]) * 60 * 60 * 1000
    } else {
      throw new Error('Invalid timezone format')
    }
  } else if (typeof timezone === 'number') {
    targetOffset = timezone * 60 * 1000
  } else {
    throw new Error('Timezone must be a number or a string in GMT format')
  }

  const endDate = new Date(startDate.getTime() + seconds * 1000 - targetOffset)
  return endDate.toISOString()
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
