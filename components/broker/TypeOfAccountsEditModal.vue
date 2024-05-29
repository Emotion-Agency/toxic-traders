<script setup lang="ts">
import type { iAccountModalItem } from '~/types'
import type { iBrokerServerAccount } from '~/types/broker/brokerServer'

interface iProps {
  modalOpened: boolean
  account: iBrokerServerAccount | null
}

const props = defineProps<iProps>()

const emit = defineEmits(['close'])

const isPassword = ref(false)
const editedAccountItems = ref<iAccountModalItem[]>([])

watch(
  () => props.account,
  () => {
    editedAccountItems.value = [
      {
        required: false,
        id: 'account-edited-name',
        name: 'Account name',
        type: 'text',
        value: props.account?.accountType || '',
        placeholder: 'Account Name',
      },
      {
        required: false,
        id: 'account-edited-login',
        name: 'Account login',
        type: 'text',
        value: props.account?.login || '',
        placeholder: 'Login',
      },
      {
        required: false,
        id: 'account-edited-password',
        name: 'Account password',
        type: 'password',
        value: props.account?.password || '',
        placeholder: 'Password',
        isRightButton: true,
      },
    ]
  }
)

const editAccountModalClose = () => {
  emit('close')
}

const onEditedChange = val => {
  console.log(val)
}

const showPassword = () => {
  isPassword.value = !isPassword.value
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Edit MT4 Standart"
    @close="editAccountModalClose"
  >
    <div class="type-accounts-item__modal-wrapper">
      <div class="type-accounts-item__modal-list">
        <div
          v-for="(input, idx) in editedAccountItems"
          :key="idx"
          class="type-accounts__modal-item"
        >
          <TheInput
            :id="input?.id"
            :required="input?.required"
            :name="input?.name"
            :type="input?.type"
            :placeholder="input?.placeholder"
            :is-right-button="input?.isRightButton"
            :value="input?.value"
            @input-value="onEditedChange"
            @right-click="showPassword"
          >
            <template #right-icon>
              <IconsPasswordEye :is-visible="isPassword" />
            </template>
          </TheInput>
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
</template>
