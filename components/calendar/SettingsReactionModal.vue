<script lang="ts" setup>
import { dir } from 'console'
import type { iSelectInput } from '~/types'
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { IReactionItem } from '~/types/calendar/reactions'
import type { iSelectData } from '~/types/headless/input'
import type { IOHLCSymbol } from '~/types/ohlc/symbols'
import type { ICalendarEventSymbol } from '~/utils/api/calendar/calendarEvents'

interface IProps {
  isOpen: boolean
  event?: ITableCalendarEvent
  symbols?: IOHLCSymbol[]
}

const props = defineProps<IProps>()

const emit = defineEmits(['close', 'save'])

const itemsAdapter = (symbol: ICalendarEventSymbol): IReactionItem => {
  return {
    ohlcSymbol: symbol.ohlcSymbol.symbol,
    direction: symbol.tradeDirection ? 'Buy' : 'Sell',
    order: symbol.order,
  }
}

const items = ref<IReactionItem[]>(
  props.event?.symbols?.map(symbol => itemsAdapter(symbol)) || []
)

watchDeep(
  () => props.event?.symbols,
  () => {
    items.value = props.event?.symbols?.map(symbol => itemsAdapter(symbol))
  }
)

const addItem = () => {
  items.value = [
    ...items.value,
    {
      ohlcSymbol: '',
      direction: 'Buy',
      order: items.value.length + 1,
    },
  ]
}

const removeItem = (idx: number) => {
  items.value = items.value.filter((_, i) => i !== idx)
}

const filteredOptions = computed(() => {
  return props.symbols
    ?.map(symbol => symbol.symbol)
    ?.filter(symbol => {
      return !items.value.some(item => item.ohlcSymbol === symbol)
    })
})

const onSelect = (e: iSelectInput, idx: number) => {
  items.value[idx].ohlcSymbol = e.value
}

const onSave = () => {
  emit('save', items.value)
}
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
        v-for="(symbol, idx) in items"
        :key="idx"
        :title="'#' + (idx + 1)"
        additional-button="Remove"
        class="scrm__accordion"
        @action-click="removeItem(idx)"
      >
        <InputSelect
          v-slot="{ renderedItems }"
          :options="filteredOptions"
          placeholder="Select Symbol"
          :value="symbol.ohlcSymbol"
          @select="onSelect($event, idx)"
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
            <InputRadio
              v-model="items[idx].direction"
              option="Buy"
              id=""
              :name="`Direction-${idx}`"
            />
            <InputRadio
              v-model="items[idx].direction"
              option="Sell"
              id=""
              :name="`Direction-${idx}`"
            />
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
