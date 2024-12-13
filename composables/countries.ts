import type { iCountries } from '~/types/countries/countries'
import { getCountriesFlag } from '~/utils/api/countries/getCountries'
import { countriesData } from '~/utils/constants/contriesData'

export const useCountries = () => {
  const countries = useState<iCountries[]>('countries', () => countriesData)
  const isRunned = useState<boolean>('isFlagsLoading', () => false)

  const getFlags = async (): Promise<iCountries[]> => {
    try {
      if (isRunned.value) return countries.value
      if (countries.value.length) return countries.value

      isRunned.value = true

      const data = await getCountriesFlag()

      countries.value = data

      return countries.value
    } catch (e) {
      console.error(e.message)
      isRunned.value = false
      throw e
    }
  }

  const getCountryFlag = (countryCode: string) => {
    const country = countries.value?.find(
      country => country.countryShortName === countryCode
    )
    return country?.countryFlag
  }

  return { getFlags, getCountryFlag, countries }
}
