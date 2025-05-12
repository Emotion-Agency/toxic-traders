<script lang="ts" setup>
const emit = defineEmits(['delete'])

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
  <div class="action-dropdown">
    <button
      class="action-dropdown__actions"
      @click.prevent="toggleMenu"
      @click.stop
    >
      <span />
      <span />
      <span />
    </button>

    <div
      ref="$el"
      class="action-dropdown__menu"
      :class="menuOpened && 'action-dropdown__menu--opened'"
      @click.stop
    >
      <div ref="$wrapper" class="action-dropdown__menu-wrapper">
        <div class="action-dropdown__menu-content">
          <button class="action-dropdown__menu-btn">
            <IconsSuccess color="#000000" />
            Check connection
          </button>
          <button class="action-dropdown__menu-btn">
            <IconsEdit />
            Edit
          </button>
          <button class="action-dropdown__menu-btn" @click="emit('delete')">
            <IconsTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
