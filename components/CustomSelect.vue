<script setup lang="ts">
interface iProps {
  options: string[]
  placeholder: string
  title?: string
}

defineProps<iProps>()

const $el = ref<HTMLElement | null>(null)
const isOpened = ref(false)

const emit = defineEmits(['select'])

const toggleList = () => {
  isOpened.value = !isOpened.value
}

const closeList = (option: string) => {
  isOpened.value = false
  emit('select', option)
}

const outsideClick = event => {
  if (!$el.value.contains(event.target)) {
    isOpened.value = false
  }
}

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div
    ref="$el"
    class="custom-select"
    :class="isOpened && 'custom-select--opened'"
  >
    <p v-if="title" class="custom-select__title">{{ title }}</p>
    <div class="custom-select__selected" @click="toggleList">
      <p class="custom-select__text">
        {{ placeholder }}
      </p>
      <IconsSelectionArrowDown />
    </div>
    <div
      class="custom-select__content"
      :class="title && 'custom-select__content--with-title'"
      @click.stop
    >
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
