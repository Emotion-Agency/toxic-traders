<script setup lang="ts">
interface iProps {
  dropdownList: string[]
  badgesList: string[]
  badgeVariant: 'fill' | 'outlined'
}

const props = defineProps<iProps>()

const emit = defineEmits(['select', 'remove'])

const inputValue = ref('')
const dropdownOpened = ref(false)
const selectedBadge = ref('')
const $el = ref<HTMLElement | null>(null)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

const onFocus = () => {
  dropdownOpened.value = true
}

const selectDropdownItem = (item: string) => {
  selectedBadge.value = item
  emit('select', selectedBadge.value)
}

const removeBadge = (idx: number) => {
  emit('remove', idx)
}

const outsideClick = event => {
  if (!$el.value.contains(event.target)) {
    dropdownOpened.value = false
  }
}

watch(inputValue, () => {
  dropdownOpened.value = true

  if (inputValue.value === '') {
    dropdownOpened.value = false
  }
})

const filteredDropdownList = computed(() => {
  const filteredList = props.dropdownList.filter(item =>
    item.toLowerCase().includes(inputValue.value.toLowerCase())
  )

  return filteredList
})

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div ref="$el" class="tags-input">
    <div class="tags-input__wrapper">
      <div class="tags-input__content">
        <div class="tags-input__input-field">
          <TheBadge
            v-for="(badge, idx) in props.badgesList"
            :key="idx"
            class="tags-input__badge"
            :variant="badgeVariant"
            :is-button="true"
            :text="badge"
            @click="removeBadge(idx)"
          />
          <input
            id="tags-input"
            class="tags-input__input"
            type="text"
            name="Tags input"
            :placeholder="!props.badgesList?.length ? 'Type a value' : null"
            autocomplete="off"
            @focus="onFocus"
            @input="onChange"
          />
        </div>
        <ul
          class="tags-input__dropdown"
          :class="dropdownOpened && 'tags-input__dropdown--opened'"
        >
          <li
            v-for="(item, idx) in filteredDropdownList"
            :key="idx"
            class="tags-input__dropdown-item"
            @click="selectDropdownItem(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <small class="tags-input__invalid">Please select a valid tag.</small>
    </div>
  </div>
</template>
