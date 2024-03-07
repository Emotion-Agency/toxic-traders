<script setup lang="ts">
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'
import type { iBroker } from '~/types/brokers'

const brokersList = ref<iBroker[]>([])

onMounted(async () => {
  const data = await getSortedBrokers()
  brokersList.value = data.brokers

  console.log(data, brokersList.value)
})
</script>

<template>
  <main>
    <section class="brokers">
      <div class="container brokers__wrapper">
        <div class="brokers__menu-wrapper">
          <h1 class="brokers__title">All Brokers</h1>
          <div class="brokers__menu">
            <TheButton tag="button" button-size="medium" variant="outlined">
              Search
              <template #start-icon>
                <IconsSearch />
              </template>
            </TheButton>
            <TheButton tag="button" button-size="medium" variant="fill">
              Settings
              <template #start-icon>
                <IconsSettings />
              </template>
            </TheButton>
            <TheButton tag="button" button-size="medium" variant="outlined">
              History
            </TheButton>
          </div>
        </div>
        <TableBrokersTable :brokers="brokersList" />
      </div>
    </section>
  </main>
</template>
