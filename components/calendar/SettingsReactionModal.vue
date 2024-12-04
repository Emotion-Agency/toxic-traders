<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { IReactionItem } from '~/types/calendar/reactions'

import type { IOHLCSymbol } from '~/types/ohlc/symbols'
import { symbolDirAdapterFromNumberToString } from '~/utils/adapters/calendar/symbolDirAdapter'
import type { ICalendarEventSymbol } from '~/utils/api/calendar/calendarEvents'

interface IProps {
  isOpen: boolean
  event?: ITableCalendarEvent
  symbols?: IOHLCSymbol[]
  isLoading?: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits(['close', 'save'])

const itemsAdapter = (symbol: ICalendarEventSymbol): IReactionItem => {
  return {
    ohlcSymbol: symbol.ohlcSymbol.symbol,
    direction: symbolDirAdapterFromNumberToString(symbol.tradeDirection),
    order: symbol.order,
    id: symbol.ohlcSymbolId,
  }
}

const mapItems = () => {
  return props.event?.symbols
    ?.map(symbol => itemsAdapter(symbol))
    .sort((a, b) => a.order - b.order)
}

const items = ref<IReactionItem[]>(mapItems() || [])

watchDeep(
  () => props.event?.symbols,
  () => {
    items.value = mapItems()
  }
)

const addItem = () => {
  items.value = [
    ...items.value,
    {
      ohlcSymbol: '',
      direction: 'Buy',
      order: items.value.length + 1,
      id: null,
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

const onSelect = (value: string, itemsIdx: number, symbolsIdx: number) => {
  items.value[itemsIdx].ohlcSymbol = value

  const symbolId = props.symbols?.find((_, i) => i === symbolsIdx)?.id

  items.value[itemsIdx].id = symbolId
}

const onSave = () => {
  const onlyFilledItems = items.value.filter(item => item.ohlcSymbol && item.id)
  emit('save', onlyFilledItems, props.event)
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
        >
          <InputSelectOption
            v-for="(option, i) in renderedItems"
            :key="option"
            :index="i"
            :option="option"
            @select="onSelect($event, idx, i)"
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
      <Spinner v-if="isLoading" />
      <span v-else>Save</span>
    </TheButton>
  </TheModal>
</template>
