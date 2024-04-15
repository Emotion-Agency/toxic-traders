<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const companyNames = ref<iCompanyNamesItem[]>([])

const { getCompanyNamesById } = useBrokerCompanyNames()

onMounted(async () => {
  const data = await getCompanyNamesById(props.brokerId)
  if (data?.length) {
    companyNames.value = data[0]?.companyNames
  }
})
</script>

<template>
  <div class="company-name">
    <TheAccordion title="Company Name">
      <p v-for="(item, idx) in companyNames" :key="idx">
        {{ item?.companyName }}
      </p>
      <p v-if="!companyNames.length">Company names is not found</p>
    </TheAccordion>
  </div>
</template>
