<script setup lang="ts"></script>

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
  </div>
</template>
