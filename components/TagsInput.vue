<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'

const inputValue = ref('')
const platformsList = ref<string[]>([])
const dropdownOpened = ref(false)
const badgesList = ref<string[]>([])
const selectedBadge = ref('')
const $el = ref<HTMLElement | null>(null)

const { getPlatform } = useBrokerPlatforms()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

const onBlur = () => {}

const onFocus = () => {}

const selectPlatform = (platform: string) => {
  selectedBadge.value = platform
  badgesList.value.push(selectedBadge.value)

  console.log(badgesList.value)
}

const removeBadge = (idx: number) => {
  badgesList.value = badgesList.value.filter((_, index) => idx !== index)
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

onMounted(async () => {
  const platformsData = await getBrokerPlatformsList()

  platformsList.value = platformsData.platforms

  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div class="tags-input">
    <div class="tags-input__wrapper">
      <div class="tags-input__content">
        <div class="tags-input__input-field">
          <TheBadge
            v-for="(badge, idx) in badgesList"
            :key="idx"
            class="tags-input__badge"
            variant="fill"
            :is-button="true"
            :text="badge"
            @click="removeBadge(idx)"
          />
          <input
            id="tags-input"
            class="tags-input__input"
            type="text"
            name="Tags input"
            :placeholder="!badgesList.length ? 'Type a value' : null"
            autocomplete="off"
            @focus="onFocus"
            @blur="onBlur"
            @input="onChange"
          />
        </div>
        <ul
          ref="$el"
          class="tags-input__dropdown"
          :class="dropdownOpened && 'tags-input__dropdown--opened'"
        >
          <li
            v-for="(platform, idx) in platformsList"
            :key="idx"
            class="tags-input__dropdown-item"
            @click="selectPlatform(platform)"
          >
            {{ platform }}
          </li>
        </ul>
      </div>
      <small class="tags-input__invalid">Please select a valid tag.</small>
    </div>
  </div>
</template>
