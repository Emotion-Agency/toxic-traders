<script setup lang="ts">
interface iProps {
  title: string
  id?: number
  isNewAccount?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['addNewAccount', 'openMenu'])

const $el = ref<HTMLElement | null>(null)
const menuOpened = ref(false)

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value
  emit('openMenu')
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
  <div
    class="type-accounts-item"
    :class="isNewAccount && 'type-accounts-item--new'"
  >
    <div v-if="isNewAccount" class="type-accounts-item__wrapper">
      <button
        class="type-accounts-item__content"
        @click="emit('addNewAccount')"
      >
        <p class="type-accounts-item__title">{{ title }}</p>

        <IconsPlus />
      </button>
    </div>

    <NuxtLink v-else to="/" class="type-accounts-item__wrapper">
      <div class="type-accounts-item__content">
        <button
          class="type-accounts-item__btn"
          @click.prevent="toggleMenu"
          @click.stop
        >
          <span />
          <span />
          <span />
        </button>
        <p class="type-accounts-item__title">{{ title }}</p>
      </div>
    </NuxtLink>

    <div
      ref="$el"
      class="type-accounts-item__menu"
      :class="menuOpened && 'type-accounts-item__menu--opened'"
      @click.stop
    >
      <div class="type-accounts-item__menu-wrapper">
        <button class="type-accounts-item__menu-btn">
          <IconsEdit />
          Edit
        </button>
        <button class="type-accounts-item__menu-btn">
          <IconsTrash />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
