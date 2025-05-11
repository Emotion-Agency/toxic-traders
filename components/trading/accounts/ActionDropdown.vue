<script lang="ts" setup>
const $el = ref<HTMLElement | null>(null)
const menuOpened = ref(false)

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value
}

const outsideClick = event => {
  if (!$el.value.contains(event.target)) {
    menuOpened.value = false
  }
}

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
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
      <div class="action-dropdown__menu-wrapper">
        <button class="action-dropdown__menu-btn">
          <IconsSuccess color="#000000" />
          Check connection
        </button>
        <button class="action-dropdown__menu-btn">
          <IconsEdit />
          Edit
        </button>
        <button class="action-dropdown__menu-btn">
          <IconsTrash />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
