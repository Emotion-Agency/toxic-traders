<script setup lang="ts">
interface iProps {
  totalPages: number
  currentPage: number
}

defineProps<iProps>()

const emit = defineEmits(['prevClick', 'nextClick'])

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

const onChange = input => {
  console.log(input)
}
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
          :placeholder="inputItem.placeholder"
          :is-left-button="inputItem.isLeftButton"
          :is-right-button="inputItem.isRightButton"
          class="pagination__input"
          @input-value="onChange"
        />
        <p class="pagination__text">of {{ totalPages }}</p>
        <CustomSelect :options="optionList" placeholder="10 rows" />
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
