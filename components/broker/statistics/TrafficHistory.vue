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
  <div class="statistics-content traffic-history">
    <h3 class="statistics-title traffic-history__title">Traffic History</h3>
    <ul class="statistics-list traffic-history__info">
      <li class="statistics-items traffic-history__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 3" />
      </li>
      <li class="statistics-items traffic-history__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 3" />
      </li>
      <li class="statistics-items traffic-history__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 3" />
      </li>
    </ul>
  </div>
</template>
