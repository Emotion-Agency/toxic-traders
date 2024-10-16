<script lang="ts" setup>
interface IProps {
  modalOpened: boolean
  title?: string
}

defineProps<IProps>()

const emit = defineEmits(['close'])

const onClose = () => {
  console.log('close')
  emit('close')
}

const { logout } = useAuth()

const onLogout = () => {
  logout()

  onClose()
}
</script>

<template>
  <TheModal
    title="Logout"
    :modalOpened="modalOpened"
    className="logout-modal"
    @close="onClose"
  >
    <p class="logout-modal__text">Are you sure you want to logout?</p>
    <div class="logout-modal__footer">
      <TheButton
        buttonSize="large"
        variant="close"
        class="logout-modal__btn logout-modal__btn--gray"
        @click="onClose"
        >Cancel</TheButton
      >
      <TheButton buttonSize="large" class="logout-modal__btn" @click="onLogout"
        >Logout</TheButton
      >
    </div>
  </TheModal>
</template>
