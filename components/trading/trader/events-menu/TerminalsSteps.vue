<script lang="ts" setup>
const currentStep = ref(0)

const addTerminalsModalOpened = computed(() => currentStep.value === 1)
const terminalsSettingsModalOpened = computed(() => currentStep.value === 2)

const openAddTerminalsModal = () => (currentStep.value = 1)

const nextStep = () => {
  if (currentStep.value === 1) currentStep.value = 2
}

const closeAll = () => (currentStep.value = 0)

const goBack = () => {
  if (currentStep.value === 2) currentStep.value = 1
}
</script>

<template>
  <div class="terminals-steps">
    <TheButton
      tag="button"
      button-size="small"
      variant="outlined"
      class="terminals-steps__btn"
      @click="openAddTerminalsModal"
    >
      <template #start-icon>
        <IconsTerminal />
      </template>
      Add terminals
    </TheButton>

    <TradingTraderEventsMenuAddTerminalsModal
      :modal-opened="addTerminalsModalOpened"
      @close="closeAll"
      @next="nextStep"
    />

    <TradingTraderEventsMenuTerminalsSettingsModal
      :modal-opened="terminalsSettingsModalOpened"
      @close="goBack"
      @create="closeAll"
    />
  </div>
</template>
