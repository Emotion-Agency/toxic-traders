export const transformDateWithTime = (input: string): string => {
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
