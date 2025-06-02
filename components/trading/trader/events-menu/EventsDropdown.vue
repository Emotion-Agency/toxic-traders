<script lang="ts" setup>
import type { IEvent } from '~/types/events/events'

interface IProps {
  events?: IEvent[]
}

defineProps<IProps>()

const emit = defineEmits(['delete', 'update'])

const $el = ref<HTMLElement | null>(null)
const $wrapper = ref<HTMLElement | null>(null)
const menuOpened = ref(false)
const selectedEvent = ref<IEvent | null>(null)

const toggleMenu = (event: IEvent) => {
  menuOpened.value = !menuOpened.value
  selectedEvent.value = event
  nextTick(() => {
    if ($el.value && $wrapper.value) {
      $el.value.style.height = menuOpened.value
        ? `${$wrapper.value.offsetHeight}px`
        : '0px'
    }
  })
}

const handleClickOutside = (e: MouseEvent) => {
  if (!$el.value?.contains(e.target as Node)) {
    menuOpened.value = false
    if ($el.value) $el.value.style.height = '0px'
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="events-dropdown">
    <div class="events-dropdown__circles">
      <button
        v-for="(event, idx) in events"
        :key="idx"
        type="button"
        class="events-dropdown__circle"
        :class="{
          'events-dropdown__circle--new': event?.eventStatus === 0,
          'events-dropdown__circle--done': event?.eventStatus === 1,
          'events-dropdown__circle--pending': event?.eventStatus === 2,
          'events-dropdown__circle--cancelled': event?.eventStatus === 3,
        }"
        @click.prevent="toggleMenu(event)"
        @click.stop
      >
        <p class="events-dropdown__num">{{ event?.eventId }}</p>
      </button>
    </div>

    <div
      ref="$el"
      class="events-dropdown__menu"
      :class="menuOpened && 'events-dropdown__menu--opened'"
      @click.stop
    >
      <div ref="$wrapper" class="events-dropdown__menu-wrapper">
        <div class="events-dropdown__menu-content">
          <h2 class="events-dropdown__title">Edit event</h2>
          <button
            class="events-dropdown__menu-btn"
            @click="
              () => {
                emit('update')
                menuOpened = false
              }
            "
          >
            <IconsEdit />
            Edit
          </button>
          <button
            class="events-dropdown__menu-btn"
            @click="
              () => {
                emit('delete', selectedEvent)
                menuOpened = false
              }
            "
          >
            <IconsTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
