import type { iCountries } from '~/types/countries/countries'

const getCountriesFullNames = (
  shortCountriesNames: string[],
  countries: iCountries[]
) => {
  const countryMap = new Map(
    countries.map(country => [country.countryShortName, country])
  )

  const matchingCountries = shortCountriesNames
    .map(shortName => countryMap.get(shortName))
    .filter(Boolean) as iCountries[]

  return matchingCountries
}

export default getCountriesFullNames
