<script setup lang="ts">
import debounce from 'debounce'

import type { iInput, iSearchInput, iSelectInput } from '~/types'

interface iProps {
  isOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['search'])

const isInited = ref(false)

const { searchItems, search, getOptions, resetSearch } = useBrokerSearch()

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

const resetSelectedItem = (input: iSearchInput) => {
  searchItems.value = searchItems.value.map(item => {
    if (item.id === input.id) {
      item = {
        ...item,
        value: '',
      }
    }
    return item
  })
}

const debounceSearch = debounce(() => {
  const items = search()

  if (!isInited.value) {
    isInited.value = true
    return
  }

  emit('search', items)
}, 500)

watch(searchItems, () => {
  debounceSearch()
})

onMounted(async () => {
  await getOptions()
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
              :is-reset="!!input.value.length"
              @select="getSelectedItem"
              @reset="resetSelectedItem(input)"
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
