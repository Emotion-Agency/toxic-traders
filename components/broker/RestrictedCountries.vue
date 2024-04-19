<script setup lang="ts">
import { getBrokerRestrictedCountriesList } from '~/api/brokers/brokerRestrictedCountriesList'
import { getCountriesList } from '~/api/countries/getCountriesList'
import type { iCountriesFlagItem } from '~/types'
import getFullCountriesNames from '~/utils/getFullCountriesNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const countriesFullList = ref<string[]>([])
const countriesList = ref<number[]>([])
const flagsList = ref<iCountriesFlagItem[]>([])
const filteredCountriesList = computed(() => {
  return removeUnderlines(
    countriesList.value?.map(index => countriesFullList.value[index]) || []
  )
})

const {
  createRestrictedCountries,
  getRestrictedCountries,
  updateRestrictedCountries,
} = useBrokerRestrictedCountries()

const selectCountries = async (country: string) => {
  const countriesIndex = countriesFullList.value.findIndex(el => el === country)

  countriesList.value.push(countriesIndex)
  await createRestrictedCountries(props.brokerId, countriesList.value)
}

const removeCountries = async (index: number) => {
  countriesList.value.splice(index, 1)

  await updateRestrictedCountries(props.brokerId, countriesList.value)
}

onMounted(async () => {
  const { restrictedCountries } = await getBrokerRestrictedCountriesList()
  const countriesData = await getRestrictedCountries(props.brokerId)

  countriesFullList.value = removeUnderlines(restrictedCountries)
  countriesList.value =
    countriesData?.restrictedCountries?.map(item => item.countryCode) || []

  const countries = await getCountriesList()
  flagsList.value = countries
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
        :badges-list="filteredCountriesList"
        badge-variant="outlined"
        @select="selectCountries"
        @remove="removeCountries"
      />
    </TheAccordion>
  </div>
</template>
