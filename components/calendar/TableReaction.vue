<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

interface IProps {
  event: ITableCalendarEvent
}

defineProps<IProps>()

const onClick = () => {}
</script>

<template>
  <HeadlessDropdownMenu
    class="dropdown"
    trigger="hover"
    v-if="event?.firstSymbol?.reaction"
  >
    <HeadlessDropdownTrigger
      class="calendar-table__reaction"
      @click.stop.prevent="onClick"
    >
      <span class="header__account-name">{{
        event?.firstSymbol?.reaction
      }}</span>
    </HeadlessDropdownTrigger>
    <Teleport to="#teleports">
      <Transition name="dropdown">
        <HeadlessDropdownItems
          position-x="right"
          position-y="top"
          style="z-index: 1000"
          class="dropdown__items"
        >
          <HeadlessDropdownItem
            v-for="(item, idx) in event.symbols"
            :key="idx"
            class="dropdown__item calendar__table-reaction-item"
          >
            {{ item?.ohlcSymbol?.symbol }}
            <b>{{ item.reaction || '-' }}</b>
          </HeadlessDropdownItem>
        </HeadlessDropdownItems>
      </Transition>
    </Teleport>
  </HeadlessDropdownMenu>

  <span v-else>-</span>
</template>
