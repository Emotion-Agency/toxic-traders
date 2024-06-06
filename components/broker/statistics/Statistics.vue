<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getCompanyNamesById } = useBrokerCompanyNames()
const { getCurrentStatisticProviders } = useBrokerStatistic()

const companyNamesList = ref<iCompanyNamesItem[]>([])
const websites = ref([])
const statisticsModalOpened = ref(false)
const selectedWebsiteId = ref(null)
const ahrefsStatistic = ref<iBrokerCompanyNameStatisticAhrefs[]>(null)
const semrushStatistic = ref<iBrokerCompanyNameStatisticSemrush[]>(null)
const similarWebStatistic = ref<iBrokerCompanyNameStatisticSimilarWeb[]>(null)
const timeArr = ref([])

const getSelectedItem = (website: string) => {
  selectedWebsiteId.value = companyNamesList.value.find(
    item => item.website === website
  )?.id
}

const statisticsModalOpen = async () => {
  statisticsModalOpened.value = true
  document.body.classList.add('modal-open')

  ahrefsStatistic.value = (await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'Ahrefs'
  )) as iBrokerCompanyNameStatisticAhrefs[]

  semrushStatistic.value = (await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'Semrush'
  )) as iBrokerCompanyNameStatisticSemrush[]

  similarWebStatistic.value = (await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'SimilarWeb'
  )) as iBrokerCompanyNameStatisticSimilarWeb[]

  timeArr.value = [
    ...ahrefsStatistic.value.map(item => `ahrefs - ${item.parsingTimestamp}`),
    ...semrushStatistic.value.map(item => `semrush - ${item.parsingTimestamp}`),
    ...similarWebStatistic.value.map(
      item => `similarWeb - ${item.parsingTimestamp}`
    ),
  ]
}

const statisticsModalClose = () => {
  statisticsModalOpened.value = false
}

onMounted(async () => {
  const { companyNames } = await getCompanyNamesById(props.brokerId)

  companyNamesList.value = companyNames
  websites.value = companyNames.map(item => item.website)

  selectedWebsiteId.value = companyNamesList.value[0]?.id
})
</script>

<template>
  <div class="statistics">
    <CustomSelect
      :options="websites"
      :placeholder="websites[0] || 'Choose website'"
      class="statistics__select"
      @select="getSelectedItem"
    />
    <div class="statistics__table-wrapper">
      <div class="statistics__table">
        <BrokerStatisticsTable
          :broker-id="brokerId"
          :website-id="selectedWebsiteId"
        />
      </div>

      <TheButton
        tag="button"
        button-size="small"
        variant="fill"
        class="statistics__table-btn"
        @click="statisticsModalOpen"
      >
        More info
      </TheButton>
    </div>
    <SlidingModal
      :modal-opened="statisticsModalOpened"
      title="Statistics"
      @close="statisticsModalClose"
    >
      <div class="statistics__modal-wrapper">
        <CustomSelect
          :options="timeArr"
          :placeholder="timeArr[0] || 'Choose item'"
          class="statistics__modal-select"
          @select="getSelectedItem"
        />
        <div class="statistics__modal-content">
          <div class="statistics__info-wrapper">
            <BrokerStatisticsOverview />
            <BrokerStatisticsEngagement />
            <BrokerStatisticsTrafficHistory />
            <BrokerStatisticsMonthlyVisits />
            <BrokerStatisticsTopCountries />
            <BrokerStatisticsTopCountryShares />
          </div>
        </div>
      </div>
    </SlidingModal>
  </div>
</template>
