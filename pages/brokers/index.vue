<script setup lang="ts">
import { getSortedLogs } from '~/api/brokers/getSortedLogs'
import type { iInput } from '~/types'
import type { iBroker } from '~/types/brokers'
import type { iLogs } from '~/types/logs'
import { getBrokerHeadings } from '~/utils/formatBrokerHeaders'

const router = useRouter()
const route = useRoute()

const brokersList = ref<iBroker[]>([])
const logsList = ref<iLogs[]>([])
const filteredBrokers = ref<iBroker[]>([])
const currentPage = ref(route.query.page ? Number(route.query.page) : 1)
const totalCountPages = ref(0)
const itemsCount = ref(route.query.count ? Number(route.query.count) : 10)

const isLoading = ref(true)
const isSearchOpened = ref(false)
const isSettingsOpened = ref(false)
const isHistoryOpened = ref(false)
const { getAllBrokers } = useBrokers()

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

const computedTotalPages = computed(() => {
  return Math.floor(totalCountPages.value / itemsCount.value)
})

const prevPageClick = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPageClick = () => {
  if (currentPage.value < totalCountPages.value) {
    currentPage.value++
  }
}

const selectItem = (val: string) => {
  itemsCount.value = Number(val)
}

const onBlur = (input: iInput) => {
  currentPage.value = Number(input.value)
  console.log(input.value, computedTotalPages.value)

  if (input.value > computedTotalPages.value) {
    input.value = computedTotalPages.value.toString()
    console.log('max count')
  }
}

watch([currentPage, itemsCount], async () => {
  const { brokers } = await getAllBrokers(currentPage.value, itemsCount.value)
  brokersList.value = brokers

  router.push({
    query: {
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

onMounted(async () => {
  isLoading.value = true

  const { brokers, totalCount } = await getAllBrokers(
    currentPage.value,
    itemsCount.value
  )
  const logsData = await getSortedLogs(currentPage.value)

  isLoading.value = false

  brokersList.value = brokers
  filteredBrokers.value = brokersList.value
  totalCountPages.value = totalCount
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
          <ThePagination
            class="brokers__pagination"
            :total-pages="totalCountPages"
            :current-page="currentPage"
            :options="['25', '50', '100']"
            :items-count="itemsCount"
            @next-click="nextPageClick"
            @prev-click="prevPageClick"
            @selected-item="selectItem"
            @on-blur-value="onBlur"
          />
        </div>
      </div>
      <div v-else-if="isLoading && !brokersList.length">
        <UiLoader />
      </div>
      <p v-else class="brokers__error-message">No items found</p>
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
