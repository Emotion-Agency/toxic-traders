<script lang="ts" setup>
interface iProps {
  modalOpened: boolean
  text?: string
}

defineProps<iProps>()

const emit = defineEmits(['close', 'reset'])

const resetInput = ref({
  title: 'Email',
  required: true,
  id: 'reset-email',
  name: 'Email',
  type: 'text',
  value: '',
  error: true,
  placeholder: 'example@gmail.com',
  validators: [
    Validation.required('Email is required'),
    Validation.email('Please enter a valid email address'),
  ],
})

const handleSubmit = () => {
  emit('reset', { value: resetInput.value })
}

const onChange = (e: iInputData) => {
  resetInput.value = { ...resetInput.value, ...e }
}
</script>

<template>
  <TheModal
    class-name="reset-modal"
    :modal-opened="modalOpened"
    title="Reset the password"
    @close="emit('close')"
  >
    <form
      class="reset-modal__wrapper"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <p class="reset-modal__text">
        {{
          text ?? 'We will send you a link to reset your password via email.'
        }}
      </p>
      <InputField
        class="reset-modal__input"
        :title="resetInput?.title"
        :id="resetInput?.id"
        :required="resetInput?.required"
        :name="resetInput?.name"
        :type="resetInput?.type"
        :placeholder="resetInput?.placeholder"
        :value="resetInput?.value"
        :validators="resetInput?.validators"
        @input-value="onChange"
      />
      <div class="reset-modal__btn-wrapper">
        <TheButton
          class="reset-modal__btn"
          tag="button"
          variant="close"
          button-size="medium"
          @click="emit('close')"
        >
          Cancel
        </TheButton>
        <TheButton
          class="reset-modal__btn"
          tag="button"
          variant="fill"
          button-size="medium"
          type="submit"
          :disabled="!!resetInput?.error"
          @click="handleSubmit"
        >
          Reset
        </TheButton>
      </div>
    </form>
  </TheModal>
</template>
