<script lang="ts" setup>
import { getBrokerServerAccountSymbolsNames } from '~/utils/api/brokers/brokerServerAccountSymbols'

const searchInput = reactive({
  required: false,
  id: 'settings-users-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search news',
  disabled: false,
  isRightButton: true,
})

const onSearch = () => {}

const onDisable = value => {
  console.log(value)
}

const onImportanceChange = (value: iInputData) => {
  console.log(value)
}

const onSymbolChange = (value: iInputData) => {
  console.log(value)
}

const { events, getAllEventsByPage } = useCalendarEvents()

const countries = ref([])
const symbols = ref([])

const getCountryFlag = (countryCode: string) => {
  const country = countries.value.find(
    country => country.countryShortName === countryCode
  )
  return country?.countryFlag
}

const isLoading = ref(false)

const { getFlags } = useFlags()
const { getSymbols } = useSymbols()

onMounted(async () => {
  try {
    isLoading.value = true
    await getAllEventsByPage(1, 25)
    countries.value = await getFlags()
    symbols.value = await getSymbols()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="settings-calendar">
    <h2 class="settings-calendar__title">News Settings</h2>

    <div class="settings-calendar__content">
      <InputField
        :id="searchInput.id"
        :required="searchInput.required"
        :name="searchInput.name"
        :type="searchInput.type"
        :placeholder="searchInput.placeholder"
        :disabled="searchInput.disabled"
        :is-right-button="searchInput.isRightButton"
        class="settings-calendar__search"
        @input-value="onSearch"
      >
        <template #right-icon>
          <IconsSearch />
        </template>
      </InputField>
    </div>
    <UiLoader v-if="isLoading" />
    <ul
      v-else-if="!isLoading && events?.length"
      class="settings-calendar__items"
    >
      <li
        v-for="event of events"
        :key="event.id"
        class="settings-calendar__item sci"
      >
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
          @input-value="onDisable"
        />
        <InputSelect
          placeholder="Choose importance"
          :options="['Low', 'Medium', 'High']"
          title="Importance"
          class="sci__select sci__importance"
          @select="onImportanceChange"
        >
          <InputSelectOption
            v-for="(option, idx) in ['Low', 'Medium', 'High']"
            :key="option"
            :option="option"
            :index="idx"
          >
            {{ option }}
          </InputSelectOption>
        </InputSelect>
        <InputSelect
          placeholder="Choose symbol"
          :options="symbols"
          title="Main Symbol"
          class="sci__select sci__symbol"
          @select="onSymbolChange"
          v-slot="{ renderedItems }"
        >
          <InputSelectOption
            v-for="(option, idx) in renderedItems"
            :key="option"
            :option="option"
            :index="idx"
          >
            {{ option }}
          </InputSelectOption>
        </InputSelect>
        <TheButton class="sci__button" button-size="small">
          Reactions Settings
        </TheButton>
      </li>
    </ul>
    <NotFound v-else />
  </section>
</template>
