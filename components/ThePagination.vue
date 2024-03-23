<script setup lang="ts">
import type { iInput } from '~/types'

interface iProps {
  totalPages: number
  currentPage: number
  options: string[]
  itemsCount: number
}

const props = defineProps<iProps>()

const emit = defineEmits([
  'prevClick',
  'nextClick',
  'selectedItem',
  'onChangeValue',
  'onBlurValue',
])

const inputItem = {
  id: 'navigation-number',
  name: 'Navigation Number',
  type: 'number',
  value: '',
  disabled: false,
  isLeftButton: false,
  isRightButton: false,
}

const onChange = (input: iInput) => {
  emit('onChangeValue', input)
}

const selectItem = (val: string) => {
  emit('selectedItem', val)
}

const onBlur = (input: iInput) => {
  emit('onBlurValue', input)
}

const computedTotalPages = computed(() => {
  return Math.floor(props.totalPages / props.itemsCount)
})
</script>

<template>
  <div class="pagination">
    <div class="pagination__wrapper">
      <button class="prev pagination__btn" @click="emit('prevClick')">
        <span>
          <IconsNavigationArrow />
        </span>
        Previous
      </button>
      <div class="pagination__content">
        <p class="pagination__text">Page</p>
        <TheInput
          :id="inputItem.id"
          :name="inputItem.name"
          :type="inputItem.type"
          :disabled="inputItem.disabled"
          :placeholder="currentPage?.toString()"
          :is-left-button="inputItem.isLeftButton"
          :is-right-button="inputItem.isRightButton"
          class="pagination__input"
          @input-value="onChange"
          @input-focus="onBlur"
        />
        <p class="pagination__text">of {{ computedTotalPages }}</p>
        <CustomSelect
          :options="options"
          :placeholder="itemsCount + ' rows'"
          @select="selectItem"
        />
      </div>
      <button class="next pagination__btn" @click="emit('nextClick')">
        Next
        <span>
          <IconsNavigationArrow />
        </span>
      </button>
    </div>
  </div>
</template>
