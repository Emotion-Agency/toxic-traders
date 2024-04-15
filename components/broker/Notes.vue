<script setup lang="ts">
import type { iInput } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getNotes, updateNotes } = useBrokerNotes()
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
  brokerNotesValue.value = val.value
  console.log(val.value, brokerNotesValue.value)
}

const onClickEnter = async () => {
  await updateNotes(props.brokerId, brokerNotesValue.value)
  console.log('Notes updated')
}

onMounted(async () => {
  const data = await getNotes(props.brokerId)
  brokerNotesValue.value = data?.brokerNotes || ''
})

// const onClickEnter = () => {
//     if (props.type === 'text' || props.type === 'textarea') {
//       if (inputValue.value.trim() !== '') {
//         emit('inputValue', {
//           id: props.id,
//           value: inputValue.value,
//           error: error.value,
//         })
//       }
//     }
//   }
</script>

<template>
  <form class="notes" novalidate @keyup.enter.prevent="onClickEnter">
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
      />
    </TheAccordion>
  </form>
</template>
