<script setup lang="ts">
import type { iAccountModalItem } from '~/types'

interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close'])

const isPassword = ref(false)
const createdAccountItems = ref<iAccountModalItem[]>([
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
    isRightButton: true,
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

const newAccountModalClose = () => {
  emit('close')
}

const showPassword = () => {
  isPassword.value = !isPassword.value
}

const onChange = val => {
  console.log(val)
}

const getSelectedItem = (item: string) => {
  console.log(item)
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Add new Account"
    @close="newAccountModalClose"
  >
    <div class="type-accounts__modal-list">
      <div
        v-for="(input, idx) in createdAccountItems"
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
          :is-right-button="input.isRightButton"
          @input-value="onChange"
          @right-click="showPassword"
        >
          <template #right-icon>
            <IconsPasswordEye :is-visible="isPassword" />
          </template>
        </TheInput>
      </div>
    </div>
    <div class="type-accounts__buttons">
      <TheButton
        tag="button"
        variant="close"
        button-size="medium"
        @click="newAccountModalClose"
      >
        Close
      </TheButton>
      <TheButton tag="button" variant="fill" button-size="medium">
        Add
      </TheButton>
    </div>
  </TheModal>
</template>
