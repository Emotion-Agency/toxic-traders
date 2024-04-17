<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'

const inputValue = ref('')
const platformsList = ref<string[]>([])
const dropdownOpened = ref(false)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

const onBlur = () => {}

const onFocus = () => {
  console.log('hello')
}

watch(inputValue, () => {
  dropdownOpened.value = true

  if (inputValue.value === '') {
    dropdownOpened.value = false
  }
})

onMounted(async () => {
  const platformsData = await getBrokerPlatformsList()

  platformsList.value = platformsData.platforms
})
</script>

<template>
  <div class="tags-input">
    <div class="tags-input__wrapper">
      <div class="tags-input__content">
        <div class="tags-input__input-field">
          <TheBadge
            class="tags-input__badge"
            variant="fill"
            text="hello world"
          />
          <input
            id="tags-input"
            class="tags-input__input"
            type="text"
            name="Tags input"
            placeholder="Type a value"
            autocomplete="off"
            @focus="onFocus"
            @blur="onBlur"
            @input="onChange"
          />
        </div>
        <ul
          class="tags-input__dropdown"
          :class="dropdownOpened && 'tags-input__dropdown--opened'"
        >
          <li
            v-for="(platform, idx) in platformsList"
            :key="idx"
            class="tags-input__dropdown-item"
          >
            {{ platform }}
          </li>
        </ul>
      </div>
      <small class="tags-input__invalid">Please select a valid tag.</small>
    </div>
  </div>
</template>
