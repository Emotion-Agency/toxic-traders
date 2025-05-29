<script setup lang="ts">
const createEventModalOpened = ref(false)

const createEventModalOpen = () => {
  createEventModalOpened.value = true
}

const createEventModalClose = () => {
  createEventModalOpened.value = false
}
</script>

<template>
  <div class="events-menu">
    <div class="events-menu__wrapper">
      <TradingTraderEventsMenuEventsCircles />
      <div class="events-menu__btns">
        <TheButton
          tag="button"
          button-size="small"
          variant="fill"
          class="events-menu__btn events-menu__btn--event"
          @click="createEventModalOpen"
        >
          <template #start-icon>
            <IconsPlus />
          </template>
          New event
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="outlined"
          class="events-menu__btn events-menu__btn--percent"
        >
          100%
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="outlined"
          class="events-menu__btn events-menu__btn--terminal"
        >
          <template #start-icon>
            <IconsTerminal />
          </template>
          Add terminals
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="soft"
          class="events-menu__btn events-menu__btn--settings"
        >
          Load settings
        </TheButton>
        <TheButton
          tag="button"
          button-size="small"
          variant="fill"
          class="events-menu__btn events-menu__btn--chart"
        >
          <template #start-icon>
            <IconsGraph />
          </template>
          Hide Chart
        </TheButton>
      </div>
    </div>
    <TradingTraderEventsMenuCreateEventModal
      :modal-opened="createEventModalOpened"
      @close="createEventModalClose"
    />
  </div>
</template>
