<script setup lang="ts">
import type { iAccountModalItem } from './TypeOfAccounts.vue'

interface iProps {
  title: string
  accountId?: number
  isNewAccount?: boolean
}

defineProps<iProps>()

const emit = defineEmits([
  'openMenu',
  'addNewAccount',
  'accountEdit',
  'accountDelete',
])

const route = useRoute()
const $el = ref<HTMLElement | null>(null)
const menuOpened = ref(false)

const editAccountModalItems = reactive<iAccountModalItem[]>([
  {
    required: false,
    id: 'account-name',
    name: 'Account name',
    type: 'text',
    value: '',
    placeholder: 'Account Name',
  },
  {
    required: false,
    id: 'account-login',
    name: 'Account login',
    type: 'text',
    value: '',
    placeholder: 'Login',
  },
  {
    required: false,
    id: 'account-password',
    name: 'Account password',
    type: 'password',
    value: '',
    placeholder: 'Password',
  },
  {
    placeholder: 'Server',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
    ],
  },
])

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

    <NuxtLink
      v-else
      :to="route.fullPath + `/type-of-accounts/${accountId}`"
      class="type-accounts-item__wrapper"
    >
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
        <button
          class="type-accounts-item__menu-btn"
          @click="emit('accountEdit')"
        >
          <IconsEdit />
          Edit
        </button>
        <button
          class="type-accounts-item__menu-btn"
          @click="emit('accountDelete')"
        >
          <IconsTrash />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
