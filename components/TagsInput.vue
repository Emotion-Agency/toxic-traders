<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'
const platformsList = ref<string[]>([])

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
          />
        </div>
        <ul class="tags-input__dropdown">
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
