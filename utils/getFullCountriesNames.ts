import type { iCountries } from '~/types/countries/countries'

const getFullCountriesNames = (
  shortCountriesNames: string[],
  countries: iCountries[]
) => {
  const matchingCountries = countries.filter(country =>
    shortCountriesNames.includes(country.countryShortName)
  )

  return matchingCountries.map(country => {
    return {
      countryFullName: country.countryFullName,
      countryShortName: country.countryShortName,
      countryFlag: {
        url: country.countryFlag.url,
        alt: country.countryFlag.alt,
      },
    }
  })
}

export default getFullCountriesNames
