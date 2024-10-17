<script setup lang="ts">
import { getBrokerRestrictedCountriesList } from '~/utils/api/brokers/brokerRestrictedCountriesList'
import { getCountriesFlag } from '~/utils/api/countries/getCountries'
import type { iCountries } from '~/types/countries/countries'
import type { iInputMultiselect } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const countriesFullNames = ref<string[]>([])
const restrictedCountriesList = ref<iCountries[]>([])
const selectedCountries = ref<number[]>([])

const filteredSelectedCountries = computed(() => {
  return restrictedCountriesList.value
    ?.filter(fullCountryObject =>
      selectedCountries.value.includes(+fullCountryObject?.id)
    )
    .map(item => ({
      text: item?.countryFullName,
      icon: {
        url: item?.countryFlag.url,
        alt: item?.countryFlag.alt,
      },
      id: +item?.id,
    }))
})

const {
  createRestrictedCountries,
  getRestrictedCountries,
  updateRestrictedCountries,
} = useBrokerRestrictedCountries()

const getCountriesList = async () => {
  const countriesData = await getRestrictedCountries(props.brokerId)

  selectedCountries.value =
    countriesData?.restrictedCountries?.map(item => item?.countryCode) || []
}

const selectCountries = async (country: string) => {
  const currentCountry = restrictedCountriesList.value?.find(
    item => item.countryFullName === country
  )

  selectedCountries.value = [...selectedCountries.value, +currentCountry?.id]

  await createRestrictedCountries(props.brokerId, selectedCountries.value)

  await getCountriesList()
}

const removeCountries = async (item: iInputMultiselect) => {
  selectedCountries.value = selectedCountries.value.filter(
    countryId => countryId !== item?.id
  )

  await updateRestrictedCountries(props.brokerId, selectedCountries.value)

  await getCountriesList()
}

onMounted(async () => {
  const countriesApi = await getCountriesFlag()
  const countries = await getBrokerRestrictedCountriesList()
  const countryMap = new Map(
    countriesApi.map(country => [country.countryShortName, country])
  )

  restrictedCountriesList.value = Object.entries(countries).reduce(
    (accumulator, [id, shortName]) => {
      if (shortName === countryMap?.get(shortName)?.countryShortName) {
        accumulator.push({
          ...countryMap?.get(shortName),
          id,
        })
      }

      return accumulator
    },
    []
  )

  countriesFullNames.value = restrictedCountriesList.value.map(
    country => country?.countryFullName
  )

  await getCountriesList()
})
</script>

<template>
  <div class="restricted-countries">
    <TheAccordion
      class="restricted-countries__accordion"
      title="Restricted countries"
    >
      <InputMultiselect
        id="restricted-countries"
        :dropdown-list="countriesFullNames"
        :badges-list="filteredSelectedCountries"
        badge-variant="outlined"
        @select="selectCountries"
        @remove="removeCountries"
      />
    </TheAccordion>
  </div>
</template>
