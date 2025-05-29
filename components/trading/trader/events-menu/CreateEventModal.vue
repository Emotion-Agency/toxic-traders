<script lang="ts" setup>
import type { iInput } from '~/types'

interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close'])

const inputValue = ref('')

const onInputChange = (e: iInput) => {
  inputValue.value = e.value
}

const resetInputs = () => {
  inputValue.value = ''
}

const handleSubmit = async () => {
  console.log('Event created')

  resetInputs()
  emit('close')
}

const handleCreateModalClose = () => {
  emit('close')
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="New event"
    @close="handleCreateModalClose"
  >
    <form novalidate @submit.prevent="handleSubmit" class="create-event">
      <div class="create-event__modal-content">
        <div class="create-event__input-item">
          <InputField
            id="create-event-id"
            required
            name="Event id"
            type="number"
            title="Event id"
            placeholder="Value from 0 to 100"
            :min="0"
            :max="100"
            :value="inputValue.toString()"
            @input-value="onInputChange"
          />
        </div>
      </div>
      <div class="create-event__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="handleCreateModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          type="submit"
          :disabled="!inputValue"
        >
          Add
        </TheButton>
      </div>
    </form>
  </TheModal>
</template>
