<script setup lang="ts">
interface iProps {
  brokerId: number
}

defineProps<iProps>()

const { getCompanyNames } = useBrokerCompanyNames()

const websites = ref([])

const getSelectedItem = item => {
  console.log(item)
}

onMounted(async () => {
  const companyNamesRequestData = await getCompanyNames()

  companyNamesRequestData.forEach(item => {
    item.companyNames.forEach(company => {
      websites.value = [...websites.value, company.website].filter(
        website => website !== null
      )
    })
  })
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
    <div class="statistics__table">
      <BrokerStatisticsTable />
    </div>
  </div>
</template>
