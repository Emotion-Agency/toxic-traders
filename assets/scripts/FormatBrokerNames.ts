import type { iBroker } from '~/types/brokers'

export const formatBrokerNames = (names: iBroker) => {
  const formattedNames = Object.keys(names).map(name => {
    const format = name
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\d+([a-zA-Z]+)/g, match =>
        match.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')
      )
      .replace(
        /([a-zA-Z])+/g,
        match => match.charAt(0).toUpperCase() + match.slice(1)
      )

    return format
  })

  return formattedNames
}
