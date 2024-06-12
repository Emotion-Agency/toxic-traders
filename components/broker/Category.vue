<script setup lang="ts">
import { getBrokerCategoriesList } from '~/api/brokers/brokerCategoriesList'
import type { iInput } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const categoryModalOpened = ref(false)
const categoryOptions = ref<string[]>([])
const categoriesData = ref<string[]>([])
const categoryValue = ref<string>('')

const categoryInputData = {
  required: false,
  id: 'category',
  name: 'Category',
  type: 'text',
  value: '',
  placeholder: 'Category name',
}

const { createCategories } = useBrokerCategories()

const categoryOnChange = (input: iInput) => {
  categoryValue.value = input.value

  console.log(categoryValue.value, input.value)
}

const onAddCategory = async () => {
  await createCategories(props.brokerId, categoryValue.value)

  categoriesData.value = [categoryValue.value, ...categoriesData.value]

  categoryValue.value = ''
  categoryModalClose()
}

watch(categoriesData, () => {
  categoryOptions.value = categoriesData.value
})

const categoryModalOpen = () => {
  categoryModalOpened.value = true
  document.body.classList.add('modal-open')
}

const categoryModalClose = () => {
  categoryModalOpened.value = false
}

onMounted(async () => {
  categoriesData.value = await getBrokerCategoriesList()
})
</script>

<template>
  <div class="category">
    <TheAccordion
      title="Category"
      additional-button="Add new"
      :is-inputs="true"
      @open="categoryModalOpen"
    >
      <CustomSelect :options="categoryOptions" placeholder="Choose category" />
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
        :value="categoryValue"
        class="category__modal-input"
        @input-value="categoryOnChange"
      />
      <div class="category__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="categoryModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="onAddCategory()"
        >
          Add
        </TheButton>
      </div>
    </TheModal>
  </div>
</template>
