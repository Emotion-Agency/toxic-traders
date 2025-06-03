<script lang="ts" setup>
interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close', 'next'])

const handleSubmit = async () => {
  emit('next')
}

const handleCreateModalClose = () => {
  emit('close')
}
</script>

<template>
  <SlidingModal
    :modal-opened="modalOpened"
    title="Add terminals"
    @close="handleCreateModalClose"
  >
    <form novalidate @submit.prevent="handleSubmit" class="add-terminals-modal">
      <div class="add-terminals-modal__modal-content">Terminals content</div>
      <div class="add-terminals-modal__buttons">
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
        >
          Next
        </TheButton>
      </div>
    </form>
  </SlidingModal>
</template>
