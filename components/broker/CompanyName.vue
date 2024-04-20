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
    <TheAccordion title="Company Name" :is-inputs="true">
      <div
        v-for="(item, idx) in companyNames"
        :key="idx"
        class="company-name__item"
      >
        <p v-if="companyNames.length" class="company-name__text">
          {{ item?.companyName }}
        </p>
        <p v-else class="company-name__text">Company names is not found</p>
      </div>
    </TheAccordion>
  </div>
</template>
