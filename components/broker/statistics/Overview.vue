<script setup lang="ts">
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

defineProps<iProps>()
</script>

<template>
  <div class="statistics-content overview">
    <h3 class="statistics-title overview__title">Overview</h3>
    <ul class="statistics-list overview__info">
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem
          title="Website"
          :link="{
            url: activeItem?.webSite,
            text: activeItem?.webSite,
          }"
        />
      </li>
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem
          title="Last updated"
          :text="activeItem?.parsingTimestamp"
        />
      </li>
    </ul>
  </div>
</template>
