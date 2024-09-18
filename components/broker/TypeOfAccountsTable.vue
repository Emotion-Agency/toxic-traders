<script setup lang="ts">
import Clock from '~/components/icons/Clock.vue'
import type { iBrokerServerAccountTable } from '~/types/broker/brokerServerAccountSymbols'

interface iProps {
  tableItems: iBrokerServerAccountTable[]
  headerFields: string[]
  defaultSortBy?: string
  serverType?: number
  timezone?: string | number
}

const props = defineProps<iProps>()

const isOpenedScheduleModal = ref<boolean>(false)
const activeScheduleItem = ref<iBrokerServerAccountTable>(null)
const isOpenedModal = ref<boolean>(false)
const activeModalItem = ref(null)
const spreadStartDate = ref('')
const spreadEndDate = ref('')
const newsSpreadStartDate = ref('')
const newsSpreadEndDate = ref('')
const scheduleParams = computed(() => {
  return {
    symbolId: activeScheduleItem.value?.id,
    serverType: props.serverType,
  }
})

const { createRunSpreadMeasurements } = useBrokerRunSpreadMeasurements()
const { getServerAccountSymbolsSpreadsSchedule } =
  useBrokerServerAccountSymbols()

const emit = defineEmits(['sort'])

const { sortState, onSort } = useSort(
  {
    sortBy: props.defaultSortBy,
  },
  () => {
    emit('sort', sortState.value)
  }
)

const getDateParams = (SpreadOrNewsSpread: number) => {
  const startDate =
    SpreadOrNewsSpread === 0 ? spreadStartDate.value : newsSpreadStartDate.value
  const endDate =
    SpreadOrNewsSpread === 0 ? spreadEndDate.value : newsSpreadEndDate.value

  const spreadSeconds =
    formatDateToSeconds(endDate) - formatDateToSeconds(startDate)

  return {
    symbolId: activeScheduleItem.value?.id,
    serverType: props.serverType,
    symbolName: activeScheduleItem.value?.currency,
    timeLengthSec: spreadSeconds,
    startDateTime: `${formatDateWithTime(startDate)}${props.timezone}`,
    SpreadOrNewsSpread,
  }
}

const dateSpreadParams = computed(() => {
  return getDateParams(0)
})

const dateNewsSpreadParams = computed(() => {
  return getDateParams(1)
})

const onModalOpen = (item: iBrokerServerAccountTable) => {
  activeModalItem.value = item
  isOpenedModal.value = true
  document.body.classList.add('modal-open')
}

const onModalClose = () => {
  isOpenedModal.value = false
}

const onScheduleOpen = async (item: iBrokerServerAccountTable) => {
  activeScheduleItem.value = item
  isOpenedScheduleModal.value = true
  document.body.classList.add('modal-open')

  const spreadDate = await getServerAccountSymbolsSpreadsSchedule(
    scheduleParams.value
  )

  spreadDate?.forEach(date => {
    if (date?.spreadType === 'MeasureSpread') {
      const startDate = getStartDateTime(date?.scheduledAt)
      const endDate = getEndDateTime({
        startDateTime: startDate,
        seconds: date?.length,
      })

      spreadStartDate.value = startDate || ''
      spreadEndDate.value = endDate || ''

      console.log({
        getSpreadDate: date,
        startSpreadResultDate: startDate,
        endResultDate: endDate,
      })
    }

    if (date?.spreadType === 'MeasureNewsSpread') {
      const startDate = getStartDateTime(date?.scheduledAt)
      const endDate = getEndDateTime({
        startDateTime: startDate,
        seconds: date?.length,
      })

      newsSpreadStartDate.value = startDate || ''
      newsSpreadEndDate.value = endDate || ''

      console.log({
        getNewsSpreadDate: date,
        startNewsSpreadResultDate: startDate,
        endResultDate: endDate,
      })
    }
  })
}

const onSpreadScheduleSave = () => {
  createRunSpreadMeasurements(dateSpreadParams.value)

  console.log({
    postSpreadData: dateSpreadParams.value,
  })
}

const onNewsSpreadScheduleSave = () => {
  createRunSpreadMeasurements(dateNewsSpreadParams.value)

  console.log({
    postNewsSpreadData: dateNewsSpreadParams.value,
  })
}

const onScheduleClose = () => {
  isOpenedScheduleModal.value = false
}

const notSortableFields = ['schedule']

const isSortable = (field: string) => {
  return !notSortableFields.includes(field)
}
</script>

<template>
  <div class="type-of-account-table">
    <div class="type-of-account-table__wrapper">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              v-for="(headerItem, idx) in headerFields"
              :key="idx"
              :item="formatNameToNormalCase(headerItem)"
              :class="[
                `table-cell--${idx}`,
                `table-cell--${headerFields[idx]}`,
              ]"
              :is-sort="isSortable(headerItem)"
              :sort-order="sortState.sortOrder"
              :is-active="
                sortState.sortBy === formatNameToNormalCase(headerItem)
              "
              @sort="onSort"
            />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow v-for="(item, idx) in tableItems" :key="idx">
            <TableCell
              v-for="(cell, i) in item"
              :key="i"
              :item="cell || 'N/A'"
              :class="`table-cell--${i}`"
              :is-modal="cell === item?.currency"
              :custom-component="cell === item?.schedule ? Clock : null"
              @open="onModalOpen(item)"
              @click-custom-component="onScheduleOpen(item)"
            />
          </TableRow>
        </TableBody>
      </Table>
      <TheModal
        :modal-opened="isOpenedScheduleModal"
        :title="`Setup schedule for ${activeScheduleItem?.currency}`"
        @close="onScheduleClose"
      >
        <div class="type-of-account-table__schedule">
          <div class="type-of-account-table__schedule-list">
            <div class="type-of-account-table__schedule-item">
              <h3 class="type-of-account-table__schedule-title">Spread</h3>
              <div class="type-of-account-table__schedule-content">
                <div class="type-of-account-table__schedule-content-wrapper">
                  <h4 class="type-of-account-table__schedule-subtitle">
                    Measurement start date
                  </h4>
                  <div class="type-of-account-table__schedule-date">
                    <VueDatePicker
                      v-model="spreadStartDate"
                      enable-seconds
                      placeholder="Select Date"
                    />
                  </div>
                </div>
                <div class="type-of-account-table__schedule-content-wrapper">
                  <h4 class="type-of-account-table__schedule-subtitle">
                    Measurement end date
                  </h4>
                  <div class="type-of-account-table__schedule-date">
                    <VueDatePicker
                      v-model="spreadEndDate"
                      enable-seconds
                      placeholder="Select Date"
                    />
                  </div>
                </div>
              </div>
              <TheButton
                tag="button"
                variant="fill"
                button-size="medium"
                class="type-of-account-table__btn"
                :disabled="
                  !spreadStartDate ||
                  !spreadEndDate ||
                  spreadEndDate < spreadStartDate
                "
                @click="onSpreadScheduleSave"
              >
                Save Changes
              </TheButton>
            </div>
            <div class="type-of-account-table__schedule-item">
              <h3 class="type-of-account-table__schedule-title">News Spread</h3>
              <div class="type-of-account-table__schedule-content">
                <div class="type-of-account-table__schedule-content-wrapper">
                  <h4 class="type-of-account-table__schedule-subtitle">
                    Measurement start date
                  </h4>
                  <div class="type-of-account-table__schedule-date">
                    <VueDatePicker
                      v-model="newsSpreadStartDate"
                      enable-seconds
                      placeholder="Select Date"
                    />
                  </div>
                </div>
                <div class="type-of-account-table__schedule-content-wrapper">
                  <h4 class="type-of-account-table__schedule-subtitle">
                    Measurement end date
                  </h4>
                  <div class="type-of-account-table__schedule-date">
                    <VueDatePicker
                      v-model="newsSpreadEndDate"
                      enable-seconds
                      placeholder="Select Date"
                    />
                  </div>
                </div>
              </div>
              <TheButton
                tag="button"
                variant="fill"
                button-size="medium"
                class="type-of-account-table__btn"
                :disabled="
                  !newsSpreadStartDate ||
                  !newsSpreadEndDate ||
                  newsSpreadEndDate < newsSpreadStartDate
                "
                @click="onNewsSpreadScheduleSave"
              >
                Save Changes
              </TheButton>
            </div>
          </div>
          <div class="type-of-account-table__schedule-btn">
            <TheButton
              tag="button"
              variant="close"
              button-size="medium"
              @click="onScheduleClose"
            >
              Close
            </TheButton>
          </div>
        </div>
      </TheModal>
      <TheModal
        :modal-opened="isOpenedModal"
        title="Modal"
        @close="onModalClose"
      >
        Modal
      </TheModal>
    </div>
  </div>
</template>
