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
const editAccountModalOpened = ref(false)
const deleteAccountModalOpened = ref(false)
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

const editAccountModalOpen = () => {
  editAccountModalOpened.value = true
  document.body.classList.add('modal-open')
}
const deleteAccountModalOpen = () => {
  deleteAccountModalOpened.value = true
  document.body.classList.add('modal-open')
}

const editAccountModalClose = () => {
  editAccountModalOpened.value = false
}

const deleteAccountModalClose = () => {
  deleteAccountModalOpened.value = false
}

const getSelectedItem = (item: string) => {
  console.log(item)
}

const onChange = val => {
  console.log(val)
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
          @click="editAccountModalOpen"
        >
          <IconsEdit />
          Edit
        </button>
        <button
          class="type-accounts-item__menu-btn"
          @click="deleteAccountModalOpen"
        >
          <IconsTrash />
          Delete
        </button>
      </div>
    </div>
    <TheModal
      :modal-opened="editAccountModalOpened"
      title="Edit MT4 Standart"
      @close="editAccountModalClose"
    >
      <div class="type-accounts-item__modal-wrapper">
        <div class="type-accounts-item__modal-list">
          <div
            v-for="(input, idx) in editAccountModalItems"
            :key="idx"
            class="type-accounts__modal-item"
          >
            <CustomSelect
              v-if="input.options"
              :options="input.options"
              :placeholder="input.placeholder"
              @select="getSelectedItem"
            />
            <TheInput
              v-else
              :id="input.id"
              :required="input.required"
              :name="input.name"
              :type="input.type"
              :placeholder="input.placeholder"
              :disabled="input.disabled"
              :is-left-button="input.isLeftButton"
              :is-right-button="input.isRightButton"
              @input-value="onChange"
            />
          </div>
        </div>

        <div class="type-accounts-item__modal-btn-wrapper">
          <TheButton
            class="type-accounts-item__modal-btn"
            tag="button"
            variant="close"
            button-size="medium"
          >
            Close
          </TheButton>
          <TheButton
            class="type-accounts-item__modal-btn"
            tag="button"
            variant="fill"
            button-size="medium"
          >
            Update
          </TheButton>
        </div>
      </div>
    </TheModal>
    <TheModal
      :modal-opened="deleteAccountModalOpened"
      title="Delete confirmation"
      @close="deleteAccountModalClose"
    >
      <div class="type-accounts-item__modal-wrapper">
        <p class="type-accounts-item__delete-text">
          Are you sure you want to delete this item? This action cannot be
          prevented
        </p>
        <div class="type-accounts-item__modal-btn-wrapper">
          <TheButton
            class="type-accounts-item__modal-btn"
            tag="button"
            variant="close"
            button-size="medium"
          >
            Cancel
          </TheButton>
          <TheButton
            class="type-accounts-item__modal-btn"
            tag="button"
            variant="danger"
            button-size="medium"
          >
            Delete
          </TheButton>
        </div>
      </div>
    </TheModal>
  </div>
</template>
