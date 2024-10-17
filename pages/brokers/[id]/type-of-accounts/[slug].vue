<script setup lang="ts">
import type { iInput } from '~/types'
import type { iBrokerServerAccount } from '~/types/broker/brokerServer'
import type { iBrokerServerAccountOrder } from '~/types/broker/brokerServerAccountOrders'
import type {
  iBrokerServerAccountSymbolsMT4,
  iBrokerServerAccountSymbolsMT5,
  iBrokerServerAccountTable,
} from '~/types/broker/brokerServerAccountSymbols'

const route = useRoute()

const { getCurrentBrokerServer } = useBrokerServer()
const { getServerAccountSymbolsMT4, getServerAccountSymbolsMT5 } =
  useBrokerServerAccountSymbols()
const {
  getBrokerAccountNotes,
  updateBrokerAccountNotes,
  deleteBrokerAccountNotes,
} = useBrokerServerAccountNotes()
const { getServerAccountOrders } = useBrokerServerAccountOrders()

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
} = usePagination()

const notesValue = ref('')
const notesInput = reactive({
  required: false,
  id: 'type-of-account-notes',
  name: 'Notes',
  type: 'textarea',
  value: notesValue,
  placeholder: 'Add your notes...',
})
const isSettingsOpened = ref(false)
const isOrderIdListOpened = ref(false)
const serverType = ref<number>(null)
const accountOrders = ref<iBrokerServerAccountOrder[]>([])
const serverAccountSymbolsMT4 = ref<iBrokerServerAccountSymbolsMT4[]>([])
const serverAccountSymbolsMT5 = ref<iBrokerServerAccountSymbolsMT5[]>([])
const isLoading = ref(true)
const sortBy = ref('currency')
const sortOrder = ref<1 | 2>(1)
const settingsItems = ref<string[]>([])

const [serverId, accountId] = (route.params.slug as string).split('-')
const currentAccount = ref<iBrokerServerAccount>(null)

const tableItems = computed(() => {
  if (serverAccountSymbolsMT4.value?.length) {
    return serverAccountSymbolsMT4.value.map(item => {
      return {
        currency: item?.symbol,
        description: item?.description,
        schedule: null,
        digits: item?.digits,
        contractSize: item?.contractSize,
        minLots: item?.minLot,
        maxLots: item?.maxLot,
        spread: item?.spread,
        newsSpread: item?.newsSpread,
        tickSize: item?.tickSize,
        commision: 'N/A',
        id: item?.id,
        lotsStep: item?.lotStep,
        tradeMode: item?.tradeMode,
        fillPolicy: 'N/A',
        isin: 'N/A',
      }
    })
  }

  if (serverAccountSymbolsMT5.value?.length) {
    return serverAccountSymbolsMT5.value.map(item => {
      return {
        currency: item?.currency,
        description: item?.description,
        schedule: null,
        digits: item?.digits,
        contractSize: item?.contractSize,
        minLots: item?.minLots,
        maxLots: item?.maxLots,
        spread: item?.spread,
        newsSpread: item?.newsSpread,
        tickSize: item?.tickSize,
        commision: Array.isArray(
          item?.brokerServerAccountSymbolMT5CommissionsInfo
        )
          ? item?.brokerServerAccountSymbolMT5CommissionsInfo[0]
              ?.commissionPeriod
          : 'N/A',
        id: item?.id,
        lotsStep: item?.lotsStep,
        tradeMode: item?.tradeMode,
        fillPolicy: item?.fillPolicy,
        isin: item?.isin,
      }
    })
  }

  return []
})

const orderDigits = computed(() => {
  if (accountOrders.value?.length) {
    return accountOrders.value[0]?.ticket?.toString()?.length || 'N/A'
  }

  return 'N/A'
})

const headerFields = computed(() => {
  return Object.keys(tableItems.value[0] ?? {})
})

const showedHeadings = computed(() => {
  return headerFields.value.filter(item => settingsItems.value.includes(item))
})

const showedTableItems = computed(() => {
  return tableItems.value.map(item => {
    let newObj = {} as iBrokerServerAccountTable

    showedHeadings.value.forEach(column => {
      newObj = {
        ...newObj,
        [column]: item[column],
      }
    })

    return newObj
  })
})

const notesOnChange = (val: iInput) => {
  notesValue.value = val?.value
}

const onBlur = async () => {
  if (notesValue.value?.length === 0) {
    await deleteBrokerAccountNotes(+accountId)
    return
  }

  await updateBrokerAccountNotes(+accountId, notesValue.value)
}

const openSettings = () => {
  isSettingsOpened.value = true
  document.body.classList.add('modal-open')
}

const closeSettings = () => {
  isSettingsOpened.value = false
}

const openOrderIdList = () => {
  isOrderIdListOpened.value = true
  document.body.classList.add('modal-open')
}

const closeOrderIdList = () => {
  isOrderIdListOpened.value = false
}

const changeTableColumns = (properties: string[]) => {
  settingsItems.value = properties
}

const onSorted = async (sortState: ISortState) => {
  sortBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  sortOrder.value = sortState.sortOrder

  await fetchServerAccountSymbols()
}

const fetchServerAccountSymbols = async () => {
  if (serverType.value === 0) {
    const { brokerServerAccountSymbolMt4, totalCount } =
      await getServerAccountSymbolsMT4({
        brokerServerAccountId: +accountId,
        page: currentPage.value - 1,
        pageSize: itemsCount.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value || 0,
      })

    serverAccountSymbolsMT4.value = brokerServerAccountSymbolMt4
    totalCountPages.value = totalCount
  }

  if (serverType.value === 1) {
    const { brokerServerAccountSymbolMt5, totalCount } =
      await getServerAccountSymbolsMT5({
        brokerServerAccountId: +accountId,
        page: currentPage.value - 1,
        pageSize: itemsCount.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value || 0,
      })

    serverAccountSymbolsMT5.value = brokerServerAccountSymbolMt5
    totalCountPages.value = totalCount
  }
}

watch(
  () => [serverType.value, currentPage.value, itemsCount.value],
  async () => {
    try {
      isLoading.value = true

      await fetchServerAccountSymbols()
    } finally {
      isLoading.value = false
    }
  }
)

onMounted(async () => {
  const { brokerServers } = await getCurrentBrokerServer(+serverId)
  const notesRequestValue = await getBrokerAccountNotes(+accountId)
  accountOrders.value = await getServerAccountOrders(+accountId)

  notesValue.value = notesRequestValue || ''

  currentAccount.value = brokerServers
    ?.map(server => server?.brokerServerAccounts)
    ?.flat()
    ?.find(account => account?.id === +accountId)

  if (brokerServers?.length) {
    serverType.value = brokerServers[0]?.serverType
  }
})
</script>

<template>
  <main>
    <section class="type-of-account">
      <div class="container type-of-account__wrapper">
        <div class="grid type-of-account__top-block">
          <div class="type-of-account__info">
            <ul class="type-of-account__info-list">
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">Leverage:</p>
                <p class="type-of-account__info-text">
                  {{ currentAccount?.brokerLeverage || 'N/A' }}
                </p>
              </li>
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">Timezone:</p>
                <p class="type-of-account__info-text">
                  {{ getGMTOffset(currentAccount?.brokerServerTimeZone) }}
                </p>
              </li>
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">OrderId Digits:</p>
                <p class="type-of-account__info-text">
                  {{ orderDigits }}
                </p>
              </li>
            </ul>
            <TheButton
              tag="button"
              button-size="medium"
              variant="fill"
              class="type-of-account__info-btn"
              @click="openOrderIdList"
            >
              <template #start-icon>
                <IconsList />
              </template>
              Order Id List
            </TheButton>
          </div>
          <div class="type-of-account__notes">
            <p class="type-of-account__notes-title">Notes</p>
            <InputField
              :id="notesInput?.id"
              :required="notesInput?.required"
              :name="notesInput?.name"
              :type="notesInput?.type"
              :placeholder="notesInput?.placeholder"
              :value="notesInput?.value"
              class="type-of-account__notes-input"
              @input-value="notesOnChange"
              @input-blur="onBlur"
            />
          </div>
          <div class="type-of-account__server">
            <h1 class="type-of-account__title">
              {{ currentAccount?.accountType || 'N/A' }}
            </h1>
            <TheButton
              tag="button"
              button-size="medium"
              variant="fill"
              class="type-of-account__settings-btn"
              @click="openSettings"
            >
              <template #start-icon>
                <IconsSettings />
              </template>
              Settings
            </TheButton>
          </div>
        </div>
        <div class="type-of-account__bottom-block">
          <div
            v-if="tableItems.length"
            class="type-of-account__bottom-table-wrapper"
          >
            <BrokerTypeOfAccountsTable
              :header-fields="showedHeadings"
              :table-items="showedTableItems"
              :server-type="serverType"
              :default-sort-by="sortBy"
              @sort="onSorted"
            />
            <ThePagination
              class="type-of-account__pagination"
              :total-pages="totalCountPages"
              :current-page="currentPage"
              :options="['25 rows', '50 rows', '100 rows']"
              :items-count="itemsCount"
              :input-value="searchValue"
              input-id="type-of-account-table"
              input-name="Type of account table"
              @next-click="nextPageClick"
              @prev-click="prevPageClick"
              @selected-item="onChangeCount"
              @on-blur-value="onInputBlur"
              @on-change-value="onInputChange"
            />
          </div>
          <p
            v-if="!isLoading && !tableItems.length"
            class="type-of-account__error"
          >
            Type of account table data is not found
          </p>
          <UiLoader v-if="isLoading" class="type-of-account__loader" />
        </div>
      </div>
    </section>
    <TheModal
      :modal-opened="isSettingsOpened"
      title="Choose needed properties"
      class-name="brokers__modal"
      @close="closeSettings"
    >
      <TheSettings :properties="headerFields" @change="changeTableColumns" />
    </TheModal>
    <SlidingModal
      :modal-opened="isOrderIdListOpened"
      title="OrderId List"
      @close="closeOrderIdList"
    >
      <BrokerOrderListTable :account-id="+accountId" />
    </SlidingModal>
  </main>
</template>
