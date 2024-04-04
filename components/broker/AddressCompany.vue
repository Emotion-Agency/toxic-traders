<script setup lang="ts">
const addressModalOpened = ref(false)

const addressModalInput = ref({
  required: false,
  id: 'address-popup',
  name: 'Address',
  type: 'textarea',
  value: '',
  placeholder: 'Company address',
})

const addressInputs = ref([
  {
    required: false,
    id: 'address',
    name: 'Address',
    type: 'textarea',
    value:
      'Rua Duque de Palmela, no. 37, 10 A, District: Lisbon Municipality: Lisbon Parish: Sanot Antonio, 1250 097, Portugal',
    placeholder: 'Address company',
  },
  {
    required: false,
    id: 'address-2',
    name: 'Address',
    type: 'textarea',
    value:
      'Rua Duque de Palmela, no. 37, 10 A, District: Lisbon Municipality: Lisbon Parish: Sanot Antonio, 1250 097, Portugal',
    placeholder: 'Address company',
  },
])

const showAllAddresses = ref(false)
const visibleAddresses = ref([addressInputs.value[0]])

const showMoreAddresses = () => {
  showAllAddresses.value = true
  visibleAddresses.value = [...addressInputs.value]
}

const addressModalOnChange = () => {
  console.log('new address')
}

const addressModalOpen = () => {
  addressModalOpened.value = true
  document.body.classList.add('modal-open')
}

const addressModalClose = () => {
  addressModalOpened.value = false
}
</script>

<template>
  <div class="address-company">
    <TheAccordion
      title="Adress Company"
      additional-button="Add new"
      :is-inputs="true"
      @open="addressModalOpen"
    >
      <div class="address-company__inputs-list">
        <div
          v-for="(item, idx) in visibleAddresses"
          :key="idx"
          class="address-company__input-wrapper"
        >
          <TheInput
            :id="item.id"
            :required="item.required"
            :name="item.name"
            :type="item.type"
            :placeholder="item.placeholder"
            :value="item.value"
            :is-right-button="true"
            class="address-company__input"
          />
          <button class="address-company__remove">
            <IconsTrash />
          </button>
        </div>
      </div>
      <OptionalButton
        v-if="!showAllAddresses && addressInputs.length > 1"
        @on-click="showMoreAddresses"
      >
        Show more
      </OptionalButton>
    </TheAccordion>
    <TheModal
      :modal-opened="addressModalOpened"
      title="Add new address"
      @close="addressModalClose"
    >
      <TheInput
        :id="addressModalInput.id"
        :required="addressModalInput.required"
        :name="addressModalInput.name"
        :type="addressModalInput.type"
        :placeholder="addressModalInput.placeholder"
        class="address-company__modal-input"
        @input-value="addressModalOnChange"
      />
      <div class="address-company__buttons">
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="addressModalClose"
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
