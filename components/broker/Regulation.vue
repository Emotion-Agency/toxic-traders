<script setup lang="ts">
import { getBrokerRegulatorNames } from '~/api/brokers/brokerRegulatorNames'
import type { iInput } from '~/types'
import type { iRegulatorItem } from '~/types/broker/brokerRegulator'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const regulationModalOpened = ref(false)
const regulationsNames = ref<string[]>([])
const regulationItems = ref<iRegulatorItem[]>([])

const { getRegulator, updateRegulator } = useBrokerRegulator()

const regulationAddItem = () => {}

const regulationRemoveItem = async (idx: number) => {
  regulationItems.value.splice(idx, 1)

  await updateRegulator(props.brokerId, regulationItems.value)
}

const regulationModalOpen = () => {
  regulationModalOpened.value = true
  document.body.classList.add('modal-open')
}

const regulationModalClose = () => {
  regulationModalOpened.value = false
}

const onLicenseChange = (input: iInput, idx: number) => {
  regulationItems.value = regulationItems.value.map((item, index) => {
    if (index === idx) {
      return {
        ...item,
        licenseNumber: input.value,
      }
    }
    return item
  })
}

const onLinkChange = (input: iInput, idx: number) => {
  regulationItems.value = regulationItems.value.map((item, index) => {
    if (index === idx) {
      return {
        ...item,
        licenseLink: input.value,
      }
    }
    return item
  })
}

const getSelectedRegulation = (value: string, idx: number) => {
  const regulatorIdx = regulationsNames.value.findIndex(name => name === value)

  regulationItems.value = regulationItems.value.map((item, index) => {
    if (index === idx) {
      return {
        ...item,
        name: regulatorIdx,
      }
    }
    return item
  })
}

onMounted(async () => {
  regulationsNames.value = await getBrokerRegulatorNames()
  regulationItems.value = await getRegulator(props.brokerId)

  // [
  //   {
  //     id: ,
  //     name: ,
  //     value: ,

  //   }
  // ]
})
</script>

<template>
  <div class="regulation">
    <TheAccordion
      title="Regulation"
      additional-button="Edit"
      @open="regulationModalOpen"
    >
      <ul v-if="regulationItems.length" class="regulation__list">
        <li
          v-for="(item, idx) in regulationItems"
          :key="idx"
          class="regulation__item"
        >
          <p class="regulation__item-name">
            {{ regulationsNames[item.name] }}
          </p>
          <div class="regulation__content">
            <a
              v-if="item.licenseLink"
              :href="item.licenseLink"
              rel="noreferer noopener"
              target="_blank"
              class="regulation__link"
            >
              {{ item.licenseNumber }}
              <IconsLinkArrow />
            </a>
            <p v-else class="regulation__link regulation__link--text">
              {{ item.licenseNumber }}
            </p>
          </div>
        </li>
      </ul>
      <p v-else>Regulations not found</p>
    </TheAccordion>
    <TheModal
      :modal-opened="regulationModalOpened"
      title="Edit regulations"
      @close="regulationModalClose"
    >
      <div class="regulation__accordion-wrapper">
        <TheAccordion
          v-for="(item, idx) in regulationItems"
          :key="idx"
          :title="'#' + (idx + 1)"
          additional-button="Remove"
          class="regulation__accordion"
          @action-click="regulationRemoveItem(idx)"
        >
          <CustomSelect
            :options="regulationsNames"
            :placeholder="regulationsNames[item.name]"
            @select="val => getSelectedRegulation(val, idx)"
          />
          <TheInput
            :id="'license-number-' + idx"
            name="License number"
            type="text"
            placeholder="License number"
            :value="item.licenseNumber?.toString()"
            @input-value="val => onLicenseChange(val, idx)"
          />
          <TheInput
            :id="'regulation-link-' + idx"
            name="Regulation link"
            type="text"
            placeholder="Regulation link"
            :value="item.licenseLink"
            @input-value="val => onLinkChange(val, idx)"
          />
        </TheAccordion>
      </div>
      <TheButton
        tag="button"
        variant="outlined"
        button-size="medium"
        class="regulation__add-btn"
        @click="regulationAddItem"
      >
        <template #start-icon>
          <IconsPlus />
        </template>
        Add new
      </TheButton>
      <TheButton
        tag="button"
        variant="fill"
        button-size="medium"
        class="regulation__btn"
        @click="regulationModalClose"
      >
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
