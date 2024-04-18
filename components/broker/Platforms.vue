<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const platformsList = ref<string[]>([])

const { createPlatform, deletePlatform, getPlatform } = useBrokerPlatforms()

const selectPlatform = async (platform: string) => {
  await createPlatform(props.brokerId, platform)
}

const removePlatform = async (index: number) => {
  // await deletePlatform(props.brokerId)
}

onMounted(async () => {
  const platformsData = await getBrokerPlatformsList()
  const platform = await getPlatform(props.brokerId)

  platformsList.value = platformsData.platforms
})
</script>

<template>
  <div class="platforms">
    <TheAccordion class="platforms__accordion" title="Platforms">
      <TagsInput
        :broker-id="brokerId"
        :dropdown-list="removeUnderlines(platformsList)"
        @select="selectPlatform"
        @remove="removePlatform"
      />
    </TheAccordion>
  </div>
</template>
