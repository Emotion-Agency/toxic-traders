<script setup lang="ts">
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'
import type { iBroker } from '~/types/brokers'

const brokersList = ref<iBroker[]>([])
const isLoading = ref(true)
const isSearchOpened = ref(false)
const isSettingsOpened = ref(false)
const isHistoryOpened = ref(false)
const brokersHeadingFields = ref<string[] | []>([])

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

const changeTableColumns = (properties: string[]) => {
  const newBrokers = brokersList.value.map(broker => {
    return console.log(broker)
  })
  console.log(properties)
}

onMounted(async () => {
  isLoading.value = true

  const data = await getSortedBrokers()

  isLoading.value = false

  brokersList.value = data.brokers

  console.log(data, brokersList.value)

  brokersHeadingFields.value = formatBrokerNames(brokersList.value[0])
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
              v-if="brokersList.length"
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
              v-if="brokersList.length"
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
            <TheButton
              tag="button"
              button-size="medium"
              variant="outlined"
              @click="openHistory"
            >
              History
            </TheButton>
          </div>
        </div>
        <div
          v-if="brokersList.length"
          class="brokers__content"
          :class="isSearchOpened && 'brokers__content--search'"
        >
          <BrokersSearch :is-opened="isSearchOpened" />
          <div class="brokers__table-wrapper">
            <BrokersTable
              :is-search-opened="isSearchOpened"
              :brokers="brokersList"
              :heading-fields="brokersHeadingFields"
            />
            <ThePagination class="brokers__pagination" :total-pages="5" />
          </div>
        </div>
        <div v-else-if="isLoading && !brokersList.length">
          <UiLoader />
        </div>
        <p v-else class="brokers__error-message">No items found</p>
      </div>
    </section>
    <TheModal
      :modal-opened="isSettingsOpened"
      title="Choose needed properties"
      class-name="brokers__modal"
      @close="closeSettings"
    >
      <TheSettings
        :properties="brokersHeadingFields"
        @change="changeTableColumns"
      />
    </TheModal>
    <SlidingModal
      :modal-opened="isHistoryOpened"
      title="History"
      @close="closeHistory"
    >
      <TheHistory />
    </SlidingModal>
  </main>
</template>
