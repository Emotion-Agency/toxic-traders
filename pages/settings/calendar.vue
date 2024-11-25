<script lang="ts" setup>
import type { iCheckboxData } from '~/types/headless/input'

const searchInput = reactive({
  required: false,
  id: 'settings-users-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search users',
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

    <ul class="settings-calendar__items">
      <li v-for="i in 50" :key="i" class="settings-calendar__item sci">
        <h3 class="sci__title">
          <span>
            <img
              class="sci__flag"
              src="https://flagcdn.com/w320/th.png"
              alt=""
            />
          </span>
          KW Liberation Day
        </h3>
        <InputCheckbox
          :id="`sci--${i}`"
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
          :options="['USD', 'ETH', 'BTC']"
          title="Main Symbol"
          class="sci__select sci__symbol"
          @select="onSymbolChange"
        >
          <InputSelectOption
            v-for="(option, idx) in ['USD', 'ETH', 'BTC']"
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
  </section>
</template>
