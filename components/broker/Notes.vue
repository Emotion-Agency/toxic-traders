<script setup lang="ts">
import type { iInput } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getNotes, updateNotes } = useBrokerNotes()
const brokerNotesValue = ref('')
const inputValue = ref('')

const notesInput = ref({
  required: false,
  id: 'notes',
  name: 'Notes',
  type: 'textarea',
  value: brokerNotesValue,
  placeholder: 'Add your notes...',
})

const notesOnChange = (val: iInput) => {
  val.value = inputValue.value
  console.log(val.value, inputValue.value)
}

const onClickEnter = async () => {
  await updateNotes(props.brokerId, inputValue.value)
  console.log('Notes updated')
}

onMounted(async () => {
  const data = await getNotes(props.brokerId)
  brokerNotesValue.value = data.brokerNotes
  console.log(brokerNotesValue.value)
})
</script>

<template>
  <div class="notes">
    <TheAccordion title="Notes" :is-inputs="true">
      <TheInput
        :id="notesInput.id"
        :required="notesInput.required"
        :name="notesInput.name"
        :type="notesInput.type"
        :placeholder="notesInput.placeholder"
        :value="notesInput.value"
        class="notes__input"
        @input-value="notesOnChange"
        @click-enter="onClickEnter"
      />
    </TheAccordion>
  </div>
</template>
