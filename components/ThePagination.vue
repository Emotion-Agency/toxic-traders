<script setup lang="ts">
interface iProps {
  totalPages: number
  currentPage: number
}

defineProps<iProps>()

const emit = defineEmits(['prevClick', 'nextClick', 'selectedItem'])

const optionList = ['25', '50', '100']

const inputItem = {
  id: 'navigation-number',
  name: 'Navigation Number',
  type: 'number',
  value: '',
  disabled: false,
  isLeftButton: false,
  isRightButton: false,
}

const onChange = input => {
  console.log(input)
}

const selectItem = (val: string) => {
  emit('selectedItem', val)
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
          :placeholder="currentPage.toString()"
          :is-left-button="inputItem.isLeftButton"
          :is-right-button="inputItem.isRightButton"
          class="pagination__input"
          @input-value="onChange"
        />
        <p class="pagination__text">of {{ totalPages }}</p>
        <CustomSelect
          :options="optionList"
          :placeholder="optionList[0] + ' rows'"
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
