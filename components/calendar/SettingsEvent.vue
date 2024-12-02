<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'
import type { IOHLCSymbol } from '~/types/ohlc/symbols'

interface IProps {
  event: ITableCalendarEvent
  symbols: IOHLCSymbol[]
}

const props = defineProps<IProps>()

const emit = defineEmits(['openReactions'])

const importance = ['Low', 'Medium', 'High']

const filteredSymbols = ref<IOHLCSymbol[]>(props.symbols)

const bindedSymbols = computed(() => {
  return props.event.symbols.map(symbol => symbol.ohlcSymbol.symbol)
})

const selectedSymbol = ref<string>(
  props.event?.symbols[0]?.ohlcSymbol.symbol || null
)

const selectedImportance = ref<string>(importance[props.event.importance])

watch(
  () => props.symbols,
  () => {
    filteredSymbols.value = props.symbols
  }
)

watch(
  () => props.event.importance,
  () => {
    selectedImportance.value = importance[props.event.importance]
  }
)

const { disableEvent, bindSymbol, changeImportance } = useCalendarEvents()

const symbolsSelect = computed(() => {
  return {
    options: filteredSymbols.value.map(item => item.symbol),
    placeholder: 'Choose symbol',
    title: 'Main Symbol',
    searchInput: {
      required: false,
      name: 'Spreads search symbol',
      type: 'text',
      placeholder: 'Search symbol',
      isRightButton: true,
    },
  }
})

const onSymbolSearch = (searchValue: string) => {
  filteredSymbols.value = props.symbols?.filter(
    item =>
      item.symbol
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim()) &&
      item.symbol !== selectedSymbol.value
  )
}

const { countryFlags, getFlags } = useFlags()

const getCountryFlag = (countryCode: string) => {
  const country = countryFlags.value?.find(
    country => country.countryShortName === countryCode
  )
  return country?.countryFlag
}

onMounted(async () => {
  try {
    await getFlags()
  } catch (error) {
    console.error(error)
  }
})

const onDisable = async (value, event: ITableCalendarEvent) => {
  await disableEvent(event.event, event.country, value.isChecked)
}

const onImportanceChange = (value: string, event: ITableCalendarEvent) => {
  changeImportance(
    event.event,
    event.country,
    importance.findIndex(imp => imp === value) as 0 | 1 | 2
  )
}

const onSymbolChange = async (
  _: iInputData,
  event: ITableCalendarEvent,
  symbol: IOHLCSymbol
) => {
  await bindSymbol(
    event.event,
    event.country,
    symbol.id,
    bindedSymbols.value?.length + 1 || 1
  )
}
</script>

<template>
  <li class="settings-calendar__item sci">
    <h3 class="sci__title">
      <span>
        <img
          v-if="getCountryFlag(event.country)?.url"
          class="sci__flag"
          :src="getCountryFlag(event.country)?.url"
          :alt="getCountryFlag(event.country).alt"
        />
      </span>
      <b> {{ event.country }}</b> <span>{{ event.event }}</span>
    </h3>

    <InputCheckbox
      :id="`sci--${event.id}`"
      name="sci"
      title="sci"
      class="sci__checkbox"
      value="Disable"
      :checked="event.disable"
      @input-value="onDisable($event, event)"
    />
    <InputSelect
      :id="`sci-imp--${event.id}`"
      placeholder="Choose importance"
      :options="importance"
      title="Importance"
      :value="selectedImportance"
      class="sci__select sci__importance"
    >
      <InputSelectOption
        v-for="(option, idx) in importance"
        :key="option"
        :option="option"
        :index="idx"
        @select="onImportanceChange($event, event)"
      >
        {{ option }}
      </InputSelectOption>
    </InputSelect>
    <InputSelect
      :search-input="{
        ...symbolsSelect.searchInput,
        id: `sci-symbol-search--${event.id}`,
      }"
      :id="`sci-symbol--${event.id}`"
      :placeholder="symbolsSelect.placeholder"
      :options="symbolsSelect.options"
      :title="symbolsSelect.title"
      class="sci__select sci__symbol"
      :value="selectedSymbol"
      v-slot="{ renderedItems }"
      @search="onSymbolSearch"
    >
      <InputSelectOption
        v-for="(option, idx) in renderedItems"
        :key="option"
        :option="option"
        :index="idx"
        @select="onSymbolChange($event, event, symbols[idx])"
      >
        {{ option }}
      </InputSelectOption>
    </InputSelect>
    <TheButton
      class="sci__button"
      button-size="small"
      @click="emit('openReactions', event)"
    >
      Reactions Settings
    </TheButton>
  </li>
</template>
