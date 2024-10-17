<script setup lang="ts">
import type { iInput, iOptionItem, iSearchInput } from '~/types'

interface iProps {
  options: (string | iOptionItem)[]
  placeholder: string
  title?: string
  searchInput?: iSearchInput
  id?: string
  name?: string
  value?: string
  isReset?: boolean
}

const props = defineProps<iProps>()

const $el = ref<HTMLElement | null>(null)
const isOpened = ref(false)
const selectedItem = ref<string | iOptionItem | null>(null)

const setupPropsValue = () => {
  if (props.value) {
    if (typeof props.value === 'string') {
      selectedItem.value = props.value
    } else {
      selectedItem.value =
        props.options.find(
          option => typeof option !== 'string' && option.text === props.value
        ) || null
    }
  } else {
    selectedItem.value = null
  }
}

watch(() => props.value, setupPropsValue)

const emit = defineEmits(['select', 'search', 'reset'])

const toggleList = () => {
  isOpened.value = !isOpened.value
}

const closeList = () => {
  isOpened.value = false
}

const selectItem = (option: string | iOptionItem) => {
  if (typeof option === 'string') {
    selectedItem.value = option
    emit('select', option, { id: props.id, value: option })
  } else {
    selectedItem.value = option.text
    emit('select', option, { id: props.id, value: option.text })
  }

  closeList()
}

const reset = () => {
  emit('reset')
}

const outsideClick = event => {
  if (!$el.value?.contains(event.target)) {
    isOpened.value = false
  }
}

const onSearch = (input: iInput) => {
  emit('search', input.value)
}

onMounted(() => {
  document.body.addEventListener('click', outsideClick)

  setupPropsValue()
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})

const renderedItems = ref([])

const updateRenderedItems = (items: any[]) => {
  renderedItems.value = items
}
</script>

<template>
  <div
    :id="id"
    ref="$el"
    :name="name"
    class="custom-select"
    :class="isOpened && 'custom-select--opened'"
  >
    <p v-if="title" class="custom-select__title">{{ title }}</p>
    <div class="custom-select__selected" @click="toggleList">
      <p class="custom-select__text">
        {{
          selectedItem
            ? typeof selectedItem === 'string'
              ? selectedItem
              : selectedItem?.text
            : placeholder
        }}
      </p>

      <div class="custom-select-icon">
        <button v-if="isReset" class="custom-select__reset" @click.stop="reset">
          <IconsClose />
        </button>
        <slot name="select-icon" />
        <IconsSelectionArrowDown class="custom-select__arrow" />
      </div>
    </div>
    <div
      class="custom-select__content"
      :class="title && 'custom-select__content--with-title'"
      @click.stop
    >
      <div v-if="searchInput" class="custom-select__input-wrapper">
        <InputField
          :id="searchInput?.id"
          :required="searchInput?.required"
          :name="searchInput?.name"
          :type="searchInput?.type"
          :placeholder="searchInput?.placeholder"
          :is-right-button="searchInput?.isRightButton"
          class="custom-select__input"
          @input-value="onSearch"
        >
          <template #right-icon>
            <IconsSearch />
          </template>
        </InputField>
      </div>

      <VirtualScroll
        :items="options"
        :item-height="35"
        class="custom-select__list"
        @update:activeItems="updateRenderedItems"
      >
        <li
          v-if="!options.length"
          class="custom-select__item"
          @click="closeList()"
        >
          <p class="custom-select__item-text">Options not found</p>
        </li>
        <VirtualScrollItem
          v-for="(option, index) in renderedItems"
          v-else
          :key="typeof option === 'string' ? option : option?.id"
          class="custom-select__item"
          :item-height="35"
          :index="index"
          @click="selectItem(option)"
        >
          <p class="custom-select__item-text">
            {{ typeof option === 'string' ? option : option?.text }}
          </p>
        </VirtualScrollItem>
      </VirtualScroll>
    </div>
  </div>
</template>
