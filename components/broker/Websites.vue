<script setup lang="ts">
interface iProps {
  websites: string[]
}

const props = defineProps<iProps>()

const websitesModalOpened = ref(false)
const websitesInputs = ref([])

const websiteInputData = {
  required: false,
  id: 'websites',
  name: 'Websites',
  type: 'text',
  value: '',
  placeholder: 'Website',
}

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

watch(
  () => props.websites,
  () => {
    websitesInputs.value = props.websites.map(item => ({
      value: item,
      id: item,
      name: 'websites',
      type: 'text',
      required: false,
      placeholder: 'Enter website',
    }))
  }
)
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
        <IconsInfoCircle />
        <TheInput
          :id="website.id"
          :required="website.required"
          :name="website.name"
          :type="website.type"
          :placeholder="website.placeholder"
          @input-value="websitesOnChange"
        />
      </div>
      <OptionalButton>Show more</OptionalButton>
    </TheAccordion>
    <TheModal
      :modal-opened="websitesModalOpened"
      title="Add new website"
      @close="websitesModalClose"
    >
      <TheInput
        :id="websiteInputData.id"
        :required="websiteInputData.required"
        :name="websiteInputData.name"
        :type="websiteInputData.type"
        :placeholder="websiteInputData.placeholder"
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
