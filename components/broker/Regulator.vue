<script setup lang="ts">
import { getBrokerRegulatorNames } from '~/api/brokers/brokerRegulatorNames'
import type { iInput } from '~/types'
import type { iRegulatorItem } from '~/types/broker/brokerRegulator'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const regulatorModalOpened = ref(false)
const regulatorNames = ref<string[]>([])
const regulatorItems = ref<iRegulatorItem[]>([])

const { getRegulator, updateRegulator } = useBrokerRegulator()

const regulatorAddItem = () => {
  regulatorItems.value = [
    ...regulatorItems.value,
    {
      name: 0,
      licenseNumber: '',
      licenseLink: '',
    },
  ]
}

const regulatorRemoveItem = (idx: number) => {
  regulatorItems.value.splice(idx, 1)
}

const regulatorModalOpen = () => {
  regulatorModalOpened.value = true
  document.body.classList.add('modal-open')
}

const regulatorModalClose = () => {
  regulatorModalOpened.value = false
}

const onLicenseChange = (input: iInput, idx: number) => {
  regulatorItems.value = regulatorItems.value.map((item, index) => {
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
  regulatorItems.value = regulatorItems.value.map((item, index) => {
    if (index === idx) {
      return {
        ...item,
        licenseLink: input.value,
      }
    }
    return item
  })
}

const getSelectedRegulator = (value: string, idx: number) => {
  const regulatorIdx = regulatorNames.value.findIndex(name => name === value)

  regulatorItems.value = regulatorItems.value.map((item, index) => {
    if (index === idx) {
      return {
        ...item,
        name: regulatorIdx,
      }
    }
    return item
  })
}

const onSave = async () => {
  await updateRegulator(props.brokerId, regulatorItems.value)
  regulatorModalClose()
}

onMounted(async () => {
  regulatorNames.value = await getBrokerRegulatorNames()
  regulatorItems.value = await getRegulator(props.brokerId)
})
</script>

<template>
  <div class="regulator">
    <TheAccordion
      title="Regulator"
      additional-button="Edit"
      @open="regulatorModalOpen"
    >
      <ul v-if="regulatorItems.length" class="regulator__list">
        <li
          v-for="(item, idx) in regulatorItems"
          :key="idx"
          class="regulator__item"
        >
          <p class="regulator__item-name">
            {{ regulatorNames[item.name] }}
          </p>
          <div class="regulator__content">
            <a
              v-if="item.licenseLink"
              :href="item.licenseLink"
              rel="noreferer noopener"
              target="_blank"
              class="regulator__link"
            >
              {{ item.licenseNumber }}
              <IconsLinkArrow />
            </a>
            <p v-else class="regulator__link regulator__link--text">
              {{ item.licenseNumber }}
            </p>
          </div>
        </li>
      </ul>
      <p v-else>Regulators not found</p>
    </TheAccordion>
    <TheModal
      :modal-opened="regulatorModalOpened"
      title="Edit regulators"
      @close="regulatorModalClose"
    >
      <div class="regulator__accordion-wrapper">
        <TheAccordion
          v-for="(item, idx) in regulatorItems"
          :key="idx"
          :title="'#' + (idx + 1)"
          additional-button="Remove"
          class="regulator__accordion"
          @action-click="regulatorRemoveItem(idx)"
        >
          <CustomSelect
            :options="regulatorNames"
            :placeholder="regulatorNames[item.name]"
            @select="val => getSelectedRegulator(val, idx)"
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
            :id="'regulator-link-' + idx"
            name="Regulator link"
            type="text"
            placeholder="Regulator link"
            :value="item.licenseLink"
            @input-value="val => onLinkChange(val, idx)"
          />
        </TheAccordion>
      </div>
      <TheButton
        tag="button"
        variant="outlined"
        button-size="medium"
        class="regulator__add-btn"
        @click="regulatorAddItem"
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
        class="regulator__btn"
        @click="onSave"
      >
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
