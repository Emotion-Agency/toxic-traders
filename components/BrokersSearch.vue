<script setup lang="ts">
import type { iSearchInput } from '~/types'

interface iProps {
  isOpened: boolean
}

defineProps<iProps>()

const searchItems = reactive<iSearchInput[]>([
  {
    title: 'Name',
    required: false,
    id: 'name',
    name: 'Name',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Category',
    placeholder: 'Placeholder',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
    ],
  },
  {
    title: 'Location Servers',
    required: false,
    id: 'location-servers',
    name: 'Location Servers',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Address Company',
    required: false,
    id: 'address-company',
    name: 'Address Company',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Websites',
    required: false,
    id: 'websites',
    name: 'Websites',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Servers MT4',
    placeholder: 'Placeholder',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
    ],
  },
  {
    title: 'Servers MT5',
    required: false,
    id: 'servers-mt5',
    name: 'Servers MT5',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Regulator',
    required: false,
    id: 'regulator',
    name: 'Regulator',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Platforms',
    required: false,
    id: 'platforms',
    name: 'Platforms',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Method of Deposits',
    required: false,
    id: 'method-of-deposits',
    name: 'Method of Deposits',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Leverage',
    required: false,
    id: 'leverage',
    name: 'Leverage',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Server Timezone',
    required: false,
    id: 'server-timezone',
    name: 'Server Timezone',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Order ID Digits',
    required: false,
    id: 'order-id-digits',
    name: 'Order ID Digits',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Currency (Symbol)',
    required: false,
    id: 'currency-symbol',
    name: 'Currency (Symbol)',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Description',
    required: false,
    id: 'description',
    name: 'Description',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Digits',
    required: false,
    id: 'digits',
    name: 'Digits',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Contract Size',
    required: false,
    id: 'contract-size',
    name: 'Contract Size',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'FillPolicy',
    required: false,
    id: 'fillpolicy',
    name: 'FillPolicy',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'ExecutionType (MT5)',
    required: false,
    id: 'executiontype-mt5',
    name: 'ExecutionType (MT5)',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'ExecutionType (MT4)',
    required: false,
    id: 'executiontype-mt4',
    name: 'ExecutionType (MT4)',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
])

const onChange = val => {
  console.log(val)
}

const getSelectedItem = (item: string) => {
  console.log(item)
}

const resetSearch = () => {
  console.log('search reset')
}
</script>

<template>
  <div class="brokers-search" :class="isOpened && 'brokers-search--opened'">
    <div class="brokers-search__wrapper">
      <div class="brokers-search__header">
        <h5 class="brokers-search__title">Search</h5>
        <button class="brokers-search__reset" @click="resetSearch">
          Reset
        </button>
      </div>
      <div class="brokers-search__content">
        <div
          v-for="(input, idx) in searchItems"
          :key="idx"
          class="brokers-search__item"
        >
          <CustomSelect
            v-if="input.options"
            :options="input.options"
            :title="input.title"
            :placeholder="input.placeholder"
            @select="getSelectedItem"
          />
          <TheInput
            v-else
            :id="input.id"
            :required="input.required"
            :title="input.title"
            :name="input.name"
            :type="input.type"
            :placeholder="input.placeholder"
            :disabled="input.disabled"
            :is-left-button="input.isLeftButton"
            :is-right-button="input.isRightButton"
            @input-value="onChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
