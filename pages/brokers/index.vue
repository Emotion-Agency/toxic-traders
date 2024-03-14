<script setup lang="ts">
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'
import type { iBroker } from '~/types/brokers'

const brokersList = ref<iBroker[]>([])
const isLoading = ref(true)
const isSearchOpened = ref(false)
const isSettingsOpened = ref(false)
const isHistoryOpened = ref(false)

const toggleSearch = () => {
  isSearchOpened.value = !isSearchOpened.value
}

const openSettings = () => {
  isSettingsOpened.value = true
  document.body.classList.add('modal-open')
}

const closeSettings = () => {
  isSettingsOpened.value = false
}

const openHistory = () => {
  isHistoryOpened.value = true
  document.body.classList.add('modal-open')
}

const closeHistory = () => {
  isHistoryOpened.value = false
}

onMounted(async () => {
  isLoading.value = true

  const data = await getSortedBrokers()

  isLoading.value = false

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
            <TheButton
              tag="button"
              button-size="medium"
              variant="outlined"
              @click="toggleSearch"
            >
              {{ isSearchOpened ? 'Hide Search' : 'Search' }}
              <template #start-icon>
                <IconsSearch />
              </template>
            </TheButton>
            <TheButton
              tag="button"
              button-size="medium"
              variant="fill"
              @click="openSettings"
            >
              Settings
              <template #start-icon>
                <IconsSettings />
              </template>
            </TheButton>
            <TheButton tag="button" button-size="medium" variant="outlined" @click="openHistory">
              History
            </TheButton>
          </div>
        </div>
        <div
          class="brokers__content"
          :class="isSearchOpened && 'brokers__content--search'"
        >
          <div v-if="brokersList.length" class="brokers__table-wrapper">
            <BrokersSearch :is-opened="isSearchOpened" />
            <BrokersTable
              :is-search-opened="isSearchOpened"
              :brokers="brokersList"
            />
            <ThePagination class="brokers__pagination" :total-pages="5" />
          </div>
          <div v-else-if="isLoading && !brokersList.length">
            <UiLoader />
          </div>
          <div v-else>No items found</div>
        </div>
      </div>
    </section>
    <TheModal
      :modal-opened="isSettingsOpened"
      title="Choose needed properties"
      class-name="brokers__modal"
      @close="closeSettings"
    >
      <TheSettings />
    </TheModal>
    <SlidingModal
      :modal-opened="isHistoryOpened"
      title="History"
      @close="closeHistory"
    >
      Content here
    </SlidingModal>
  </main>
</template>
