<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { IOHLCSymbol } from '~/types/ohlc/symbols'

interface IProps {
  isOpen: boolean
  event?: ITableCalendarEvent
  symbols?: IOHLCSymbol[]
}

defineProps<IProps>()

const emit = defineEmits(['close', 'save'])

const items = ref([
  {
    title: 'Item 1',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    title: 'Item 2',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    title: 'Item 3',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
])

const addItem = () => {
  items.value.push({
    title: 'Item ' + (items.value.length + 1),
    options: ['Option 1', 'Option 2', 'Option 3'],
  })
}

const direction = ref<'Buy' | 'Sell'>('Buy')

const onSave = () => {}
</script>

<template>
  <TheModal
    :modal-opened="isOpen"
    title="Edit reactions"
    class-name="settings-calendar-reactions-modal scrm"
    @close="emit('close')"
  >
    <div v-if="symbols?.length" class="scrm__accordion-wrapper">
      <TheAccordion
        v-for="(symbol, idx) in event?.symbols"
        :key="idx"
        :title="'#' + (idx + 1)"
        additional-button="Remove"
        class="scrm__accordion"
      >
        <InputSelect
          v-slot="{ renderedItems }"
          :options="symbols?.map(symbol => symbol.symbol)"
          placeholder="Select Symbol"
          :value="symbol.ohlcSymbol.symbol"
        >
          <InputSelectOption
            v-for="(option, idx) in renderedItems"
            :key="option"
            :index="idx"
            :option="option"
          />
        </InputSelect>
        <div class="scrm__dir">
          <h6 class="scrm__dir-title">Direction</h6>
          <div class="scrm__dir-opts">
            <InputRadio option="Buy" id="" name="Direction" />
            <InputRadio option="Sell" id="" name="Direction" />
          </div>
        </div>
      </TheAccordion>
    </div>
    <TheButton
      tag="button"
      variant="outlined"
      button-size="medium"
      class="scrm__add-btn"
      @click="addItem"
    >
      <template #start-icon>
        <IconsPlus />
      </template>
      Add new
    </TheButton>
    <TheButton
      tag="button"
      variant="fill"
      button-size="medium"
      class="scrm__btn"
      @click="onSave"
    >
      Save
    </TheButton>
  </TheModal>
</template>
