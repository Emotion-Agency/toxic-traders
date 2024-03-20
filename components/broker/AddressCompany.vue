<script setup lang="ts">
const addressModalOpened = ref(false)

const addressModalInput = {
  required: false,
  id: 'address-popup',
  name: 'Address',
  type: 'textarea',
  value: '',
  placeholder: 'Company address',
}

const addressInput = {
  required: false,
  id: 'address',
  name: 'Address',
  type: 'text',
  value: '',
  placeholder: 'Address company',
}

const addressOnChange = () => {
  console.log('new address')
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
      <TheInput
        :id="addressInput.id"
        :required="addressInput.required"
        :name="addressInput.name"
        :type="addressInput.type"
        :placeholder="addressInput.placeholder"
        @input-value="addressOnChange"
      />
      <button class="address-company__btn">Show more</button>
    </TheAccordion>
    <TheModal
      :modal-opened="addressModalOpened"
      title="Add new category"
      @close="addressModalClose"
    >
      <TheInput
        :id="addressModalInput.id"
        :required="addressModalInput.required"
        :name="addressModalInput.name"
        :type="addressModalInput.type"
        :placeholder="addressModalInput.placeholder"
        class="broker-aside__category-input"
        @input-value="addressModalOnChange"
      />
      <div class="broker-aside__category-buttons">
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
