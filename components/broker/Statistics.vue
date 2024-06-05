<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'

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

const getSelectedItem = (website: string) => {
  selectedWebsiteId.value = companyNamesList.value.find(
    item => item.website === website
  )?.id
}

const statisticsModalOpen = async () => {
  statisticsModalOpened.value = true
  document.body.classList.add('modal-open')

  const data = await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'Ahrefs'
  )

  console.log(data)
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
      Statistics modal
    </SlidingModal>
  </div>
</template>
