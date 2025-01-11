<script lang="ts" setup>
interface IProps {
  isOpen: boolean
}

defineProps<IProps>()

const emit = defineEmits(['close', 'save'])

const date = defineModel<string[]>('date')

const onSave = () => {
  emit('save')
}

const isDark = usePreferredDark()
const { theme } = useAppState()
</script>

<template>
  <TheModal
    :modal-opened="isOpen"
    title="Select custom date for events"
    class-name="calendar-date-modal"
    @close="emit('close')"
  >
    <p class="calendar-date-modal__text">
      You can select only the start date to show all events on that date, or
      select both the start date and end date to get all events between those
      dates.
    </p>
    <div class="calendar-date-modal__inputs">
      <div class="calendar-date-modal__input">
        <p class="calendar-date-modal__label">Choose date</p>
        <ClientOnly>
          <VueDatePicker
            :teleport="true"
            :enable-time-picker="false"
            v-model="date"
            range
            placeholder="22.05.1998"
            :dark="isDark || theme === 'dark'"
          />
        </ClientOnly>
      </div>
    </div>

    <div class="custom-date-modal__footer">
      <TheButton @click="onSave">Save Changes</TheButton>
      <TheButton class="button--close" @click="emit('close')">Close</TheButton>
    </div>
  </TheModal>
</template>
