<script setup lang="ts">
import { getBrokerRegulatorNames } from '~/api/brokers/brokerRegulatorNames'

interface iProps {
  brokerId: number
}

interface iRegulatorItem {
  name: string
  licenseNumber: number
  licenseLink?: string
}

const props = defineProps<iProps>()

const regulationModalOpened = ref(false)
const regulationsNames = ref<string[]>([])
const regulationItems = ref<iRegulatorItem[]>([])

const { getRegulator, updateRegulator } = useBrokerRegulator()

const regulationAddItem = () => {}

const regulationRemoveItem = async (idx: number) => {
  regulationItems.value.splice(idx, 1)
  await updateRegulator(props.brokerId, [...regulationItems.value])

  console.log([...regulationItems.value])
}

const regulationModalOpen = () => {
  regulationModalOpened.value = true
  document.body.classList.add('modal-open')
}

const regulationModalClose = () => {
  regulationModalOpened.value = false
}

const regulationOnChange = () => {}

const getSelectedRegulation = () => {}

onMounted(async () => {
  regulationsNames.value = await getBrokerRegulatorNames()
  regulationItems.value = await getRegulator(props.brokerId)
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
            @select="getSelectedRegulation"
          />
          <TheInput
            id="license-number"
            name="License number"
            type="text"
            placeholder="License number"
            value=""
            @input-value="regulationOnChange"
          />
          <TheInput
            id="regulation-link"
            name="Regulation link"
            type="text"
            placeholder="Link"
            value=""
            @input-value="regulationOnChange"
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
