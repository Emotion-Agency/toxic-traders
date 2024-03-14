<script setup lang="ts">
const checkboxItemsList = ref([])

const searchInput = reactive({
  required: false,
  id: 'settings-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search property',
  disabled: false,
  isRightButton: true,
})

const checkboxList = reactive([
  {
    option: 'Broker Name',
    id: 'broker-name',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Category',
    id: 'category',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Location Servers',
    id: 'location-servers',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Address',
    id: 'address',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Websites',
    id: 'websites',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'MT4',
    id: 'mt4',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'MT5',
    id: 'mt5',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Regulation',
    id: 'regulation',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Similar Web',
    id: 'similar-web',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Platforms',
    id: 'platforms',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Property 11',
    id: 'property-11',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Property 12',
    id: 'property-12',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Property 13',
    id: 'property-13',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Property 14',
    id: 'property-14',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Property 15',
    id: 'property-15',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'Property 16',
    id: 'property-16',
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  },
])

const onChange = val => {
  console.log(val)
}

const selectAllItems = () => {
  console.log('selected all')
}

const onChangeCheckbox = val => {
  const index = checkboxItemsList.value.indexOf(val)

  if (index === -1) {
    checkboxItemsList.value.push(val)
  } else {
    checkboxItemsList.value.splice(index, 1)
  }

  console.log(checkboxItemsList.value)
}
</script>

<template>
  <div class="settings">
    <div class="settings__menu">
      <TheInput
        :id="searchInput.id"
        :required="searchInput.required"
        :name="searchInput.name"
        :type="searchInput.type"
        :placeholder="searchInput.placeholder"
        :disabled="searchInput.disabled"
        :is-right-button="searchInput.isRightButton"
        class="settings__search-input"
        @input-value="onChange"
      >
        <template #right-icon>
          <IconsSearch />
        </template>
      </TheInput>
      <TheButton
        tag="button"
        button-size="small"
        variant="outlined"
        @click="selectAllItems"
      >
        Select all
        <template #start-icon>
          <IconsDoubleCheck />
        </template>
      </TheButton>
    </div>
    <div class="settings__content">
      <CheckboxInput
        v-for="(item, idx) in checkboxList"
        :id="item.id"
        :key="idx"
        :option="item.option"
        :name="item.name"
        :type="item.type"
        :disabled="item.disabled"
        @input-value="onChangeCheckbox"
      />
    </div>
    <div class="settings__info">
      <p class="settings__info-text">
        Showed properties: {{ checkboxItemsList.length }}
      </p>
      <p class="settings__info-text">
        Hidden properties: {{ checkboxList.length - checkboxItemsList.length }}
      </p>
    </div>
  </div>
</template>
