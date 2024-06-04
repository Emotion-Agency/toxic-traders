<script setup lang="ts">
interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getCompanyNamesById } = useBrokerCompanyNames()

const websites = ref([])
const statisticsModalOpened = ref(false)

const getSelectedItem = (website: string) => {
  console.log(website)
}

const statisticsModalOpen = () => {
  statisticsModalOpened.value = true
  document.body.classList.add('modal-open')
}

const statisticsModalClose = () => {
  statisticsModalOpened.value = false
}

onMounted(async () => {
  const { companyNames } = await getCompanyNamesById(props.brokerId)

  websites.value = companyNames.map(item => item.website)
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
        <BrokerStatisticsTable :broker-id="brokerId" />
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
