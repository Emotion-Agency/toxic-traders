import type { iCountries } from '~/types/countries/countries'
import { getCountriesFlag } from '~/utils/api/countries/getCountries'

export const useFlags = () => {
  const countryFlags = useState<iCountries[]>('countryFlags', () => [])

  const getFlags = async (): Promise<iCountries[]> => {
    try {
      if (countryFlags.value.length) return countryFlags.value
      const countries = await getCountriesFlag()

      countryFlags.value = countries

      return countryFlags.value
    } catch (e) {
      console.error(e.message)
      throw e
    }
  }

  return { getFlags }
}
