<script setup lang="ts">
import { getSortedLogs } from '~/api/brokers/getSortedLogs'
import type { iBroker } from '~/types/brokers'
import type { iLogs } from '~/types/logs'
import { getBrokerHeadings } from '~/utils/formatBrokerHeaders'

const brokersList = ref<iBroker[]>([])
const logsList = ref<iLogs[]>([])
const filteredBrokers = ref<iBroker[]>([])

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

const changeTableColumns = (properties: string[]) => {
  filteredBrokers.value = brokersList.value.map(broker => {
    const formattedColumnsName = Object.keys(broker)

    let newObj = {}

    formattedColumnsName.forEach(column => {
      if (properties.includes(column)) {
        newObj = {
          ...newObj,
          [column]: broker[column],
        }
      }
    })

    return newObj
  })
}

const brokersHeadings = computed(() => {
  return getBrokerHeadings(brokersList.value[0] ?? {})
})

const filteredBrokerHeading = computed(() => {
  return getBrokerHeadings(filteredBrokers.value[0] ?? {})
})

const { getAllBrokers } = useBrokers()

onMounted(async () => {
  isLoading.value = true

  const brokersData = await getAllBrokers()
  const logsData = await getSortedLogs()

  isLoading.value = false

  brokersList.value = brokersData.brokers
  filteredBrokers.value = brokersList.value

  logsList.value = logsData.logs

  // console.log(data, brokersList.value, brokersHeadingFields.value)
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
              :brokers="filteredBrokers"
              :heading-fields="filteredBrokerHeading"
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
      <TheSettings :properties="brokersHeadings" @change="changeTableColumns" />
    </TheModal>
    <SlidingModal
      :modal-opened="isHistoryOpened"
      title="History"
      @close="closeHistory"
    >
      <TheHistory :logs="logsList" />
    </SlidingModal>
  </main>
</template>
