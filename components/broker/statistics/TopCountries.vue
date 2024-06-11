<script setup lang="ts">
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import { brokerStatisticsTopCountriesAdapter } from '~/utils/adapters/brokerStatisticsTopCountriesAdapter'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const topCountries = ref<{ country: string; share: string }[]>([])

watch(
  () => props.activeItem,
  () => {
    topCountries.value = brokerStatisticsTopCountriesAdapter(props.activeItem)
  }
)

onMounted(() => {
  topCountries.value = brokerStatisticsTopCountriesAdapter(props.activeItem)
})
</script>

<template>
  <div class="statistics-content top-countries">
    <h3 class="statistics-title top-countries__title">Top Countries</h3>
    <ul class="statistics-list top-countries__info">
      <li
        v-for="(item, idx) in topCountries"
        :key="idx"
        class="statistics-items top-countries__info-column"
      >
        <BrokerStatisticsInfoItem :title="item.country" :text="item.share" />
      </li>
      <li
        v-if="!topCountries.length"
        class="statistics-items top-countries__info-column"
      >
        <BrokerStatisticsInfoItem title="Country name" text="N/A" />
      </li>
    </ul>
  </div>
</template>
