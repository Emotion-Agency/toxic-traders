import type { iCountriesFlagItem } from '~/types'

const getFullCountriesNames = (
  shortCountriesNames: string[],
  countries: iCountriesFlagItem[]
) => {
  const matchingCountries = countries.filter(country =>
    shortCountriesNames.includes(country.flagShortName)
  )

  return matchingCountries.map(country => {
    return {
      name: country.flagFullName,
      flagImg: {
        url: country.flagImg.url,
        alt: country.flagImg.alt,
      },
    }
  })
}

export default getFullCountriesNames
