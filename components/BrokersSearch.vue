<script setup lang="ts">
import debounce from 'debounce'

import { deepClone } from '~/utils/deepClone'
import type { iInput, iSearchInput, iSelectInput } from '~/types'

interface iProps {
  isOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['search'])

const { getCategoriesList } = useBrokerCategories()

const categoriesList = await getCategoriesList()

const initialSearchItems: iSearchInput[] = [
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
    id: 'category',
    name: 'Category',
    title: 'Category',
    placeholder: 'Placeholder',
    options: categoriesList,
    value: '',
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
    id: 'servers',
    name: 'Servers',
    title: 'Servers (MT4 or MT5)',
    placeholder: 'Placeholder',
    options: ['MT4', 'MT5'],
    value: '',
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
    type: 'number',
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
    type: 'number',
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
    type: 'number',
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
    type: 'number',
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
]

const searchItems = ref<iSearchInput[]>(deepClone(initialSearchItems))

const onChange = (val: iInput) => {
  searchItems.value = searchItems.value.map(item => {
    if (item.id === val.id) {
      item = {
        ...item,
        value: val.value?.toString(),
      }
    }
    return item
  })
}

const getSelectedItem = (_, opts: iSelectInput) => {
  searchItems.value = searchItems.value.map(item => {
    if (item.id === opts.id) {
      item = {
        ...item,
        value: opts.value,
      }
    }
    return item
  })
}

const resetSearch = () => {
  searchItems.value = initialSearchItems
}

const debounceSearch = debounce(() => {
  emit('search', searchItems.value)
}, 500)

watch(searchItems, () => {
  debounceSearch()
})
</script>

<template>
  <div class="brokers-search" :class="isOpened && 'brokers-search--opened'">
    <div class="broker__search-clip">
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
              :id="input.id"
              :name="input.name"
              :options="input.options"
              :title="input.title"
              :placeholder="input.placeholder"
              :value="input.value"
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
              :value="input.value"
              :is-left-button="input.isLeftButton"
              :is-right-button="input.isRightButton"
              @input-value="onChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
