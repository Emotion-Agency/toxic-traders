import axios from 'axios'
import type { iCountriesFlagItem } from '~/types'

export const getCountriesList = async () => {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all')

    const countries: iCountriesFlagItem[] = data.map(item => {
      return {
        flagFullName: item.name.common,
        flagShortName: item.cca2,
        flagImg: {
          url: item.flags.png,
          alt: item.flags.alt,
        },
      }
    })

    return countries
  } catch (e) {
    console.error(e.message)
  }
}
