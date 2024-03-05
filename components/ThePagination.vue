<script setup lang="ts">
interface iProps {
  maxPages: number
}

defineProps<iProps>()

const optionList = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
]

const inputItem = {
  id: 'navigation-number',
  name: 'Navigation Number',
  type: 'number',
  value: '',
  placeholder: '1',
  disabled: false,
  isLeftButton: false,
  isRightButton: false,
}

const onChange = val => {
  console.log(val)
}
</script>

<template>
  <div class="pagination">
    <div class="container pagination__wrapper">
      <button class="prev pagination__btn">
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
          :placeholder="inputItem.placeholder"
          :is-left-button="inputItem.isLeftButton"
          :is-right-button="inputItem.isRightButton"
          class="pagination__input"
          @input-value="onChange"
        />
        <p class="pagination__text">of {{ maxPages }}</p>
        <CustomSelect :options="optionList" placeholder="10 rows" />
      </div>
      <button class="next pagination__btn">
        Next
        <span>
          <IconsNavigationArrow />
        </span>
      </button>
    </div>
  </div>
</template>
