<script setup lang="ts">
import { getBrokerRestrictedCountriesList } from '~/api/brokers/brokerRestrictedCountriesList'
import { getCountriesFlag } from '~/api/countries/getCountries'
import type { iCountries } from '~/types/countries/countries'
import getFullCountriesNames from '~/utils/getFullCountriesNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const fullCountriesNames = ref<iCountries[]>([])
const countriesFullList = ref<string[]>([])
const countriesList = ref<number[]>([])
const flagsList = ref<iCountries[]>([])
const filteredCountriesList = computed(() => {
  return (
    countriesList.value?.map(index => fullCountriesNames.value[index]) || []
  )
})

const {
  createRestrictedCountries,
  getRestrictedCountries,
  updateRestrictedCountries,
} = useBrokerRestrictedCountries()

const selectCountries = async (country: string) => {
  const countriesIndex = countriesFullList.value.findIndex(el => el === country)

  countriesList.value = [...countriesList.value, countriesIndex]
  await createRestrictedCountries(props.brokerId, countriesList.value)
}

const removeCountries = async (index: number) => {
  countriesList.value.splice(index, 1)

  await updateRestrictedCountries(props.brokerId, countriesList.value)
}

onMounted(async () => {
  const { restrictedCountries } = await getBrokerRestrictedCountriesList()
  const countriesData = await getRestrictedCountries(props.brokerId)
  const countriesFlags = await getCountriesFlag()

  countriesFullList.value = restrictedCountries

  flagsList.value = countriesFlags

  fullCountriesNames.value = getFullCountriesNames(
    countriesFullList.value,
    flagsList.value
  )

  countriesList.value =
    countriesData?.restrictedCountries?.map(item => item.countryCode) || []

  countriesFullList.value = fullCountriesNames.value.map(
    item => item.countryFullName
  )
})
</script>

<template>
  <div class="restricted-countries">
    <TheAccordion
      class="restricted-countries__accordion"
      title="Restricted countries"
    >
      <TagsInput
        :dropdown-list="countriesFullList"
        :country-list="filteredCountriesList"
        badge-variant="outlined"
        @select="selectCountries"
        @remove="removeCountries"
      />
    </TheAccordion>
  </div>
</template>
