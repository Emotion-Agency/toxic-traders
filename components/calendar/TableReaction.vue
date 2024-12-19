<script lang="ts" setup>
import type { ITableCalendarEvent } from '~/types/calendar/events'

interface IProps {
  event: ITableCalendarEvent
}

const props = defineProps<IProps>()

const onClick = () => {}

const hasReactions = computed(() => {
  return props.event?.symbols?.some(symbol => symbol.reaction)
})
</script>

<template>
  <HeadlessDropdownMenu class="dropdown" trigger="hover" v-if="hasReactions">
    <HeadlessDropdownTrigger
      class="calendar-table__reaction"
      :class="{
        'calendar-table__reaction--active': event?.firstSymbol?.reaction,
      }"
      @click.stop.prevent="onClick"
    >
      <span v-if="event?.firstSymbol?.reaction" class="header__account-name">{{
        event?.firstSymbol?.reaction
      }}</span>
      <span v-else>
        <IconsInfoCircle />
      </span>
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
