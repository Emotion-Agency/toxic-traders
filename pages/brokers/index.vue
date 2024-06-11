<script setup lang="ts">
import type { iSearchInput } from '~/types'
import type { iBroker } from '~/types/broker/broker'
import { getBrokerHeadings } from '~/utils/formatBrokerHeaders'

const router = useRouter()
const route = useRoute()

const brokersList = ref<iBroker[]>([])
const filteredBrokers = ref<iBroker[]>([])

const isLoading = ref(true)
const isSearchOpened = ref(false)
const isSettingsOpened = ref(false)
const isHistoryOpened = ref(false)

const { getAllBrokers, getAllBrokersBySearch } = useBrokers()

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

const {
  currentPage,
  itemsCount,
  searchValue,
  totalCountPages,
  nextPageClick,
  prevPageClick,
  onInputBlur,
  onInputChange,
  onChangeCount,
} = usePagination(
  route.query.page && Number(route.query.page),
  route.query.count && Number(route.query.count)
)

watch([currentPage, itemsCount], async () => {
  const { brokers } = await getAllBrokers(
    currentPage.value - 1,
    itemsCount.value
  )

  brokersList.value = brokers

  router.push({
    query: {
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

const getBrokersRequest = async (data?: iSearchInput[]) => {
  isLoading.value = true

  const { brokers, totalCount } = await getAllBrokersBySearch({
    offset: currentPage.value - 1,
    count: itemsCount.value,
    sortBy: 'companyName',
    sortOrder: 1,
    data: data ?? [],
  })

  isLoading.value = false
  brokersList.value = brokers
  filteredBrokers.value = brokersList.value
  totalCountPages.value = totalCount
}

onMounted(async () => {
  await getBrokersRequest()
})

const onSearch = async (searchData: iSearchInput[]) => {
  await getBrokersRequest(searchData)
}
</script>

<template>
  <main>
    <section class="brokers">
      <div class="container brokers__wrapper">
        <div class="brokers__menu-wrapper">
          <h1 class="brokers__title">All Brokers</h1>
          <div class="brokers__menu">
            <TheButton
              v-if="brokersList?.length"
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
              v-if="brokersList?.length"
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
        <BrokersSearch :is-opened="isSearchOpened" @search="onSearch" />
        <div class="brokers__table-wrapper">
          <BrokersTable
            :is-search-opened="isSearchOpened"
            :brokers="filteredBrokers"
            :heading-fields="filteredBrokerHeading"
            class="brokers__table"
          />
          <ThePagination
            class="brokers__pagination"
            :total-pages="totalCountPages"
            :current-page="currentPage"
            :options="['25 rows', '50 rows', '100 rows']"
            :items-count="itemsCount"
            :input-value="searchValue"
            input-id="brokers-navigation"
            input-name="Brokers navigation"
            @next-click="nextPageClick"
            @prev-click="prevPageClick"
            @selected-item="onChangeCount"
            @on-blur-value="onInputBlur"
            @on-change-value="onInputChange"
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
      <TheHistory />
    </SlidingModal>
  </main>
</template>
