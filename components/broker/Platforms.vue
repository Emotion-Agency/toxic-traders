<script setup lang="ts">
import type { iTagsInput } from '~/types'
import { getBrokerPlatformsList } from '~/utils/api/brokers/brokerPlatformsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const platformsList = ref<{ id: number; text: string }[]>([])
const selectedPlatforms = ref<number[]>([])
const platformsNames = ref<string[]>([])
const filteredPlatformsList = computed(() => {
  return platformsList.value
    ?.filter(deposit => selectedPlatforms.value?.includes(+deposit.id))
    .map(item => ({
      text: item?.text,
      id: +item?.id,
    }))
})

const { createPlatform, getPlatform, updatePlatform } = useBrokerPlatforms()

const getPlatformList = async () => {
  const { platforms } = await getPlatform(props.brokerId)
  selectedPlatforms.value = platforms?.map(item => item?.platform) || []
}

const selectPlatform = async (platform: string) => {
  const currentPlatform = platformsList.value?.find(
    item => item.text === platform
  )

  selectedPlatforms.value = [...selectedPlatforms.value, +currentPlatform?.id]

  await createPlatform(props.brokerId, selectedPlatforms.value)
  await getPlatformList()
}

const removePlatform = async (item: iTagsInput) => {
  selectedPlatforms.value = selectedPlatforms.value.filter(
    platformId => platformId !== item?.id
  )

  await updatePlatform(props.brokerId, selectedPlatforms.value)
  await getPlatformList()
}

onMounted(async () => {
  const platformsListRequest = await getBrokerPlatformsList()

  platformsList.value = Object.keys(platformsListRequest).map(key => ({
    id: Number(key),
    text: removeUnderlines(platformsListRequest[key]),
  }))

  platformsNames.value = platformsList.value.map(deposit => deposit?.text)

  await getPlatformList()
})
</script>

<template>
  <div class="platforms">
    <TheAccordion class="platforms__accordion" title="Platforms">
      <TagsInput
        id="platforms"
        :dropdown-list="platformsNames"
        :badges-list="filteredPlatformsList"
        badge-variant="fill"
        @select="selectPlatform"
        @remove="removePlatform"
      />
    </TheAccordion>
  </div>
</template>
