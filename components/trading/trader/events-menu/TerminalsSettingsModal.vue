<script lang="ts" setup>
interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close', 'create'])

const handleSubmit = async () => {
  emit('create')
  emit('close')
}

const handleTerminalsSettingsModalClose = () => {
  emit('close')
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Terminals settings"
    @close="handleTerminalsSettingsModalClose"
  >
    <form
      novalidate
      @submit.prevent="handleSubmit"
      class="terminals-settings-modal"
    >
      <div class="terminals-settings-modal__modal-content">
        Terminals settings content
      </div>
      <div class="terminals-settings-modal__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="handleTerminalsSettingsModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          type="submit"
        >
          Ok
        </TheButton>
      </div>
    </form>
  </TheModal>
</template>
