import type { iCountries } from '~/types/countries/countries'
import { getCountriesFlag } from '~/utils/api/countries/getCountries'

export const useFlags = () => {
  const countryFlags = useState<iCountries[]>('countryFlags', () => [])
  const isRunned = useState<boolean>('isFlagsLoading', () => false)

  const getFlags = async (): Promise<iCountries[]> => {
    try {
      if (isRunned.value) return countryFlags.value
      if (countryFlags.value.length) return countryFlags.value

      isRunned.value = true

      const countries = await getCountriesFlag()

      countryFlags.value = countries

      return countryFlags.value
    } catch (e) {
      console.error(e.message)
      isRunned.value = false
      throw e
    }
  }

  return { getFlags, countryFlags }
}
