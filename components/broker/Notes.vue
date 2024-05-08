<script setup lang="ts">
import type { iInput } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getNotes, updateNotes, deleteNotes } = useBrokerNotes()
const brokerNotesValue = ref('')

const notesInput = ref({
  required: false,
  id: 'notes',
  name: 'Notes',
  type: 'textarea',
  value: brokerNotesValue,
  placeholder: 'Add your notes...',
})

const notesOnChange = (val: iInput) => {
  brokerNotesValue.value = val?.value
}

const onBlur = async () => {
  await updateNotes(props.brokerId, brokerNotesValue.value)

  if (brokerNotesValue?.value?.length === 0) {
    await deleteNotes(props.brokerId)
  }
}

onMounted(async () => {
  const { brokerNotes } = await getNotes(props.brokerId)

  brokerNotesValue.value = brokerNotes || ''
})
</script>

<template>
  <TheAccordion title="Notes" :is-inputs="true">
    <TheInput
      :id="notesInput?.id"
      :required="notesInput?.required"
      :name="notesInput?.name"
      :type="notesInput?.type"
      :placeholder="notesInput?.placeholder"
      :value="notesInput?.value"
      class="notes__input"
      @input-value="notesOnChange"
      @input-blur="onBlur"
    />
  </TheAccordion>
</template>
