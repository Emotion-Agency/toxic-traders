<script setup lang="ts">
interface iProps {
  categoryOptions: string[]
}

defineProps<iProps>()

const categoryModalOpened = ref(false)

const categoryInputData = {
  required: false,
  id: 'category',
  name: 'Category',
  type: 'text',
  value: '',
  placeholder: 'Category name',
}

const categoryOnChange = () => {
  console.log('new category')
}

const categoryModalOpen = () => {
  categoryModalOpened.value = true
  document.body.classList.add('modal-open')
}

const categoryModalClose = () => {
  categoryModalOpened.value = false
}
</script>

<template>
  <div class="category">
    <TheAccordion
      title="Category"
      additional-button="Add new"
      :is-inputs="true"
      @open="categoryModalOpen"
    >
      <CustomSelect :options="categoryOptions" placeholder="Regulated" />
    </TheAccordion>
    <TheModal
      :modal-opened="categoryModalOpened"
      title="Add new category"
      @close="categoryModalClose"
    >
      <TheInput
        :id="categoryInputData.id"
        :required="categoryInputData.required"
        :name="categoryInputData.name"
        :type="categoryInputData.type"
        :placeholder="categoryInputData.placeholder"
        class="broker-aside__category-input"
        @input-value="categoryOnChange"
      />
      <div class="broker-aside__category-buttons">
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="categoryModalClose"
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
