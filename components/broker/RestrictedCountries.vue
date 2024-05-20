<script setup lang="ts">
import { getBrokerRestrictedCountriesList } from '~/api/brokers/brokerRestrictedCountriesList'
import { getCountriesFlag } from '~/api/countries/getCountries'
import type { iCountries } from '~/types/countries/countries'
import getCountriesFullNames from '~/utils/getFullCountriesNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const countriesFullNames = ref<iCountries[]>([])
const requestCountriesList = ref<string[]>([])
const selectedCountries = ref<number[]>([])
const countriesList = ref<iCountries[]>([])
const filteredSelectedCountries = computed(() => {
  return (
    selectedCountries.value?.map(index => countriesFullNames.value[index]) || []
  )
})

const {
  createRestrictedCountries,
  getRestrictedCountries,
  updateRestrictedCountries,
} = useBrokerRestrictedCountries()

const selectCountries = async (country: string) => {
  const countriesIndex = requestCountriesList.value.findIndex(
    el => el === country
  )

  selectedCountries.value = [...selectedCountries.value, countriesIndex]
  await createRestrictedCountries(props.brokerId, selectedCountries.value)
}

const removeCountries = async (index: number) => {
  selectedCountries.value.splice(index, 1)
  await updateRestrictedCountries(props.brokerId, selectedCountries.value)
}

onMounted(async () => {
  const { restrictedCountries } = await getBrokerRestrictedCountriesList()
  const countriesData = await getRestrictedCountries(props.brokerId)
  const countriesFlags = await getCountriesFlag()

  requestCountriesList.value = restrictedCountries
  countriesList.value = countriesFlags

  countriesFullNames.value = getCountriesFullNames(
    requestCountriesList.value,
    countriesList.value
  )

  selectedCountries.value =
    countriesData?.restrictedCountries?.map(item => item.countryCode) || []

  requestCountriesList.value = countriesFullNames.value.map(
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
        id="restricted-countries"
        :dropdown-list="requestCountriesList"
        :country-list="filteredSelectedCountries"
        badge-variant="outlined"
        @select="selectCountries"
        @remove="removeCountries"
      />
    </TheAccordion>
  </div>
</template>
