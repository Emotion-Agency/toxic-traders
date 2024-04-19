<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const platformsFullList = ref<string[]>([])
const platformsList = ref<number[]>([])
const filteredPlatformsList = computed(() => {
  return removeUnderlines(
    platformsList.value?.map(index => platformsFullList.value[index]) || []
  )
})

const { createPlatform, getPlatform, updatePlatform } = useBrokerPlatforms()

const selectPlatform = async (platform: string) => {
  const platformIndex = platformsFullList.value.findIndex(el => el === platform)

  platformsList.value.push(platformIndex)
  await createPlatform(props.brokerId, platformsList.value)
}

const removePlatform = async (index: number) => {
  platformsList.value.splice(index, 1)
  await updatePlatform(props.brokerId, platformsList.value)
}

onMounted(async () => {
  const { platforms } = await getBrokerPlatformsList()
  const platformsData = await getPlatform(props.brokerId)

  platformsFullList.value = removeUnderlines(platforms)
  platformsList.value =
    platformsData?.platforms?.map(item => item.platform) || []
})
</script>

<template>
  <div class="platforms">
    <TheAccordion class="platforms__accordion" title="Platforms">
      <TagsInput
        :dropdown-list="platformsFullList"
        :badges-list="filteredPlatformsList"
        badge-variant="fill"
        @select="selectPlatform"
        @remove="removePlatform"
      />
    </TheAccordion>
  </div>
</template>
