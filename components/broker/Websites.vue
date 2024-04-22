<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const websitesModalOpened = ref(false)
const websitesInputs = ref([])
const showAllWebsites = ref(false)
const visibleWebsites = ref([websitesInputs.value[0]])
const websiteList = ref<iCompanyNamesItem[]>([])

const { getCompanyNamesById } = useBrokerCompanyNames()

const modalInputData = ref({
  required: false,
  id: 'websites',
  name: 'Websites',
  type: 'text',
  value: '',
  placeholder: 'Website',
})

const websitesModalOpen = () => {
  websitesModalOpened.value = true
  document.body.classList.add('modal-open')
}

const websitesModalClose = () => {
  websitesModalOpened.value = false
}

const websitesOnChange = () => {
  console.log('new websites')
}

const showMoreWebsites = () => {
  showAllWebsites.value = true
  visibleWebsites.value = [...websitesInputs.value]
}

watch(
  () => websiteList.value,
  () => {
    websitesInputs.value = websiteList.value.map(item => ({
      value: item.website || '',
      id: item.id.toString(),
      name: 'websites',
      type: 'text',
      required: false,
      placeholder: 'Enter website',
    }))
  }
)

onMounted(async () => {
  const data = await getCompanyNamesById(props.brokerId)

  websiteList.value = data[0].companyNames
})
</script>

<template>
  <div class="websites">
    <TheAccordion
      title="Websites"
      additional-button="Add new"
      :is-inputs="true"
      @open="websitesModalOpen"
    >
      <div
        v-for="website in websitesInputs"
        :key="website.id"
        class="websites__item"
      >
        <div class="websites__info-item">
          <IconsInfoCircle />
          <div class="websites__info-modal">
            <p class="websites__info-text">Website created date</p>
          </div>
        </div>
        <TheInput
          :id="website.id"
          :required="website.required"
          :name="website.name"
          :type="website.type"
          :placeholder="website.placeholder"
          :is-right-button="true"
          @input-value="websitesOnChange"
        />
        <button class="websites__remove-btn">
          <IconsTrash />
        </button>
      </div>
      <OptionalButton
        v-if="!showAllWebsites && websitesInputs.length > 3"
        @on-click="showMoreWebsites"
        >Show more</OptionalButton
      >
    </TheAccordion>
    <TheModal
      :modal-opened="websitesModalOpened"
      title="Add new website"
      @close="websitesModalClose"
    >
      <TheInput
        :id="modalInputData.id"
        :required="modalInputData.required"
        :name="modalInputData.name"
        :type="modalInputData.type"
        :placeholder="modalInputData.placeholder"
        class="websites__modal-input"
        @input-value="websitesOnChange"
      />
      <div class="websites__buttons">
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="websitesModalClose"
        >
          Close
        </TheButton>
        <TheButton tag="button" variant="fill" button-size="medium">
          Add
        </TheButton>
      </div>
    </TheModal>
  </div>
</template>
