import type { iCountriesFlagItem } from '~/types'

const getFullCountriesNames = (
  shortCountriesNames: string[],
  countries: iCountriesFlagItem[]
) => {
  const matchingCountries = countries.filter(country =>
    shortCountriesNames.includes(country.flagShortName)
  )
  const fullCountriesNames = matchingCountries.map(
    country => country.flagFullName
  )

  return fullCountriesNames
}

export default getFullCountriesNames
