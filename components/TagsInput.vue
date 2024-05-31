<script setup lang="ts">
import type { iCountries } from '~/types/countries/countries'

interface iProps {
  id: string
  dropdownList: string[]
  badgesList?: string[]
  countryList?: iCountries[]
  badgeVariant: 'fill' | 'outlined'
}

const props = defineProps<iProps>()
const emit = defineEmits(['select', 'remove'])

const inputValue = ref('')
const dropdownOpened = ref(false)
const selectedBadge = ref('')
const $el = ref<HTMLElement | null>(null)

const filteredDropdownList = ref([...props.dropdownList])

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

const onFocus = () => {
  dropdownOpened.value = true
}

const selectDropdownItem = (item: string) => {
  selectedBadge.value = item

  filteredDropdownList.value = filteredDropdownList.value.filter(
    el => el !== item
  )

  emit('select', selectedBadge.value)
}

const removeBadge = (idx: number) => {
  emit('remove', idx)
}

const outsideClick = (event: Event) => {
  if ($el.value && !$el.value.contains(event.target as Node)) {
    dropdownOpened.value = false
  }
}

const updateFilteredList = () => {
  const filteredList = props.dropdownList.filter(item =>
    item.toLowerCase().includes(inputValue.value.toLowerCase())
  )

  filteredDropdownList.value = filteredList.filter(
    item => !selectedBadge.value.includes(item)
  )
}

watch(inputValue, () => {
  dropdownOpened.value = true

  if (inputValue.value === '') {
    dropdownOpened.value = false
  }

  updateFilteredList()
})

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
  updateFilteredList()
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
          <div v-if="countryList?.length" class="tags-input__badge-wrapper">
            <TheBadge
              v-for="(badge, idx) in props.countryList"
              :key="idx"
              class="tags-input__badge"
              :variant="badgeVariant"
              :is-button="true"
              :text="badge?.countryFullName"
              @click="removeBadge(idx)"
            >
              <template #icon>
                <img
                  :src="badge?.countryFlag?.url"
                  :alt="badge?.countryFlag?.alt"
                />
              </template>
            </TheBadge>
            <input
              :id="id"
              class="tags-input__input"
              type="text"
              name="Tags input"
              :placeholder="!props.countryList?.length ? 'Type a value' : null"
              autocomplete="off"
              @focus="onFocus"
              @input="onChange"
            />
          </div>
          <div v-else class="tags-input__badge-wrapper">
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
              :id="id"
              class="tags-input__input"
              type="text"
              name="Tags input"
              :placeholder="!props.badgesList?.length ? 'Type a value' : null"
              autocomplete="off"
              @focus="onFocus"
              @input="onChange"
            />
          </div>
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
    </div>
  </div>
</template>
