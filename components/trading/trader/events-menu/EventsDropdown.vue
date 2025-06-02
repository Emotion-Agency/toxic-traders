<script lang="ts" setup>
const emit = defineEmits(['delete', 'update'])

const $el = ref<HTMLElement | null>(null)
const $wrapper = ref<HTMLElement | null>(null)
const menuOpened = ref(false)

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value
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
        type="button"
        class="events-dropdown__circle events-dropdown__circle--warning"
        @click.prevent="toggleMenu"
        @click.stop
      >
        <p class="events-dropdown__num">10</p>
      </button>
      <button
        type="button"
        class="events-dropdown__circle events-dropdown__circle--success"
        @click.prevent="toggleMenu"
        @click.stop
      >
        <p class="events-dropdown__num">15</p>
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
                emit('delete')
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
