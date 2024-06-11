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

watch(
  () => props.activeItem,
  () => {
    topCountryShares.value = brokerStatisticsCountrySharesAdapter(
      props.activeItem
    )
    console.log(props.activeItem)
  }
)

onMounted(() => {
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
        v-for="(item, idx) in topCountryShares"
        :key="idx"
        class="statistics-items country-share__info-column"
      >
        <BrokerStatisticsInfoItem
          :title="`${item.Country} ${item.CountryCode}`"
          :text="item.Value"
        />
      </li>
      <li
        v-if="!topCountryShares.length"
        class="statistics-items country-share__info-column"
      >
        <BrokerStatisticsInfoItem title="Country name" text="N/A" />
      </li>
    </ul>
  </div>
</template>
