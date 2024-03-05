<script setup lang="ts">
interface iProps {
  options: string[]
  placeholder: string
}

const props = defineProps<iProps>()

const isOpened = ref(false)
const selectedItem = ref('')

const toggleList = () => {
  isOpened.value = !isOpened.value
}

const closeList = option => {
  isOpened.value = false
  selectedItem.value = option
}

onMounted(() => {
  selectedItem.value = props.placeholder
})
</script>

<template>
  <div class="custom-select" :class="isOpened && 'custom-select--opened'">
    <div class="custom-select__selected" @click="toggleList">
      <p class="custom-select__text">
        {{ selectedItem }}
      </p>
      <IconsSelectionArrowDown />
    </div>
    <div class="custom-select__content">
      <ul class="custom-select__list">
        <li
          v-for="(option, idx) of options"
          :key="idx"
          class="custom-select__item"
          @click="closeList(option)"
        >
          <p class="custom-select__item-text">
            {{ option }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
