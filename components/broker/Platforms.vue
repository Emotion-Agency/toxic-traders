<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const platformsList = ref<string[]>([])

const { createPlatform } = useBrokerPlatforms()

const selectPlatform = async (platform: string) => {
  const platformIndex = platformsList.value.findIndex(el => el === platform)
  console.log(platformIndex)
  await createPlatform(props.brokerId, platformIndex)
}

const removePlatform = async (index: number) => {}

// removeUnderlines(platformsList)

onMounted(async () => {
  const platformsData = await getBrokerPlatformsList()

  platformsList.value = platformsData.platforms
})
</script>

<template>
  <div class="platforms">
    <TheAccordion class="platforms__accordion" title="Platforms">
      <TagsInput
        :dropdown-list="platformsList"
        @select="selectPlatform"
        @remove="removePlatform"
      />
    </TheAccordion>
  </div>
</template>
