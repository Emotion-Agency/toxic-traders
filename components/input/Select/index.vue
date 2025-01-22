<script setup lang="ts">
import type { iInput, iOptionItem, iSearchInput } from '~/types'

interface iProps {
  options: string[]
  allOptions?: string[]
  placeholder: string
  title?: string
  searchInput?: iSearchInput
  id?: string
  name?: string
  value?: string
  isReset?: boolean
  required?: boolean
  validators?: Function[]
}

const props = defineProps<iProps>()

const $el = ref<HTMLElement | null>(null)
const isOpened = ref(false)
const selectedItem = ref<string | iOptionItem | null>(null)
const error = ref(false)

const setupPropsValue = () => {
  if (props.value) {
    selectedItem.value = props.value
  } else {
    selectedItem.value = null
  }
}

watch(() => props.value, setupPropsValue)

const emit = defineEmits(['select', 'search', 'reset'])

const toggleList = () => {
  if (isOpened.value) {
    validate()
  }
  isOpened.value = !isOpened.value
}

const closeList = () => {
  isOpened.value = false
}

const selectItem = (option: string | iOptionItem) => {
  selectedItem.value = option

  validate()

  emit('select', {
    id: props.id,
    value: selectedItem.value,
    error: error.value,
  })

  closeList()
}

provide('selectItem', selectItem)

const reset = () => {
  validate()
  emit('reset', selectedItem.value, {
    id: props.id,
    value: selectedItem.value,
    error: error.value,
  })
}

const outsideClick = event => {
  if (!$el.value?.contains(event.target)) {
    isOpened.value = false
  }
}

const search = ref('')

const onSearch = (input: iInput) => {
  search.value = input.value
  emit('search', input.value)
}

const onSearchEnter = () => {
  const value = search.value?.trim()

  selectItem(value)
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

const validate = () => {
  if (props.validators) {
    const value = selectedItem.value

    const falsyValidator = props.validators.find(validator => validator(value))

    if (falsyValidator) {
      error.value = falsyValidator(value)
    } else {
      error.value = false
    }
  }
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
    <span v-if="title" class="custom-select__title"
      >{{ title }} <abbr v-if="required === true">*</abbr>
    </span>
    <div class="custom-select__selected" @click="toggleList">
      <p
        class="custom-select__text"
        :class="[!selectedItem && 'custom-select__text--placeholder']"
      >
        {{ selectedItem ?? placeholder }}
      </p>

      <div class="custom-select-icon">
        <button v-if="isReset" class="custom-select__reset" @click.stop="reset">
          <IconsClose />
        </button>
        <slot name="select-icon" />
        <IconsSelectionArrowDown class="custom-select__arrow" />
      </div>
    </div>
    <small v-if="error" class="input__error">
      {{ error }}
    </small>
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
          @keydown.enter="onSearchEnter"
        >
          <template #right-icon>
            <IconsSearch @click="onSearchEnter" />
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
        <slot :rendered-items="renderedItems" />
      </VirtualScroll>
    </div>
  </div>
</template>
