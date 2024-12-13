<script setup lang="ts">
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

import { brokerStatisticsCountrySharesAdapter } from '~/utils/adapters/brokerStatisticsCountryShares'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const topCountryShares = ref<
  {
    Country: number
    CountryCode: string
    Value: string
  }[]
>([])

const { countries } = useCountries()

const countriesWithFlag = computed(() => {
  return topCountryShares.value.map(item => {
    const matchingFlag = countries.value.find(
      flag =>
        flag.countryShortName.toLowerCase() === item.CountryCode.toLowerCase()
    )

    return {
      countryFullName: matchingFlag.countryFullName,
      countryShortName: item.CountryCode.toUpperCase(),
      countryFlag: matchingFlag.countryFlag,
      countryText: item.Value,
      countryCode: item.CountryCode,
    }
  })
})

watch(
  () => props.activeItem,
  () => {
    topCountryShares.value = brokerStatisticsCountrySharesAdapter(
      props.activeItem
    )
  }
)

onMounted(async () => {
  topCountryShares.value = brokerStatisticsCountrySharesAdapter(
    props.activeItem
  )
})
</script>

<template>
  <div class="statistics-content country-share">
    <h3 class="statistics-title country-share__title">Top Country Shares</h3>
    <ul class="statistics-list country-share__info">
      <li
        v-for="(item, idx) in countriesWithFlag"
        :key="idx"
        class="statistics-items country-share__info-column"
      >
        <BrokerStatisticsInfoItem
          :title="item.countryFullName"
          :text="item.countryText"
          :img="item.countryFlag"
        />
      </li>
      <li
        v-if="!countriesWithFlag.length"
        class="statistics-items country-share__info-column"
      >
        <BrokerStatisticsInfoItem title="Country name" text="N/A" />
      </li>
    </ul>
  </div>
</template>
~/assets/api/countries/getCountries~/utils/api/countries/getCountries
