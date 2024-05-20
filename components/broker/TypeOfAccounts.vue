<script setup lang="ts">
import type { iBrokerServer } from '~/types/broker/brokerServer'

export interface iAccountModalItem {
  required?: boolean
  id?: string
  name?: string
  type?: string
  value?: string
  placeholder: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  options?: string[]
  isPassword?: boolean
}

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getAllBrokerServers } = useBrokerServer()

const newAccountModalOpened = ref(false)
const editAccountModalOpened = ref(false)
const deleteAccountModalOpened = ref(false)
const isPassword = ref(false)

const accountList = ref<iBrokerServer[]>([])

const accountModalItems = reactive<iAccountModalItem[]>([
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

const onChange = val => {
  console.log(val)
}

const getSelectedItem = (item: string) => {
  console.log(item)
}

const newAccountModalOpen = () => {
  newAccountModalOpened.value = true
  document.body.classList.add('modal-open')
}

const newAccountModalClose = () => {
  newAccountModalOpened.value = false
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

const getEditedSelectedItem = (item: string) => {
  console.log(item)
}

const onEditedChange = val => {
  console.log(val)
}

const showPassword = () => {
  isPassword.value = !isPassword.value
}

onMounted(async () => {
  const { brokerServers } = await getAllBrokerServers(props.brokerId)

  accountList.value = brokerServers
  console.log(brokerServers)
})
</script>

<template>
  <div class="type-accounts">
    <div class="type-accounts__list">
      <BrokerTypeOfAccountsItem
        title="Add new"
        :is-new-account="true"
        @add-new-account="newAccountModalOpen"
      />
      <BrokerTypeOfAccountsItem
        v-for="(account, idx) in accountList"
        :key="idx"
        :account-id="account.id"
        :title="account.serverName"
        class="type-accounts__item"
        @account-edit="editAccountModalOpen"
        @account-delete="deleteAccountModalOpen"
      />
    </div>
    <TheModal
      :modal-opened="newAccountModalOpened"
      title="Add new Account"
      @close="newAccountModalClose"
    >
      <div class="type-accounts__modal-list">
        <div
          v-for="(input, idx) in accountModalItems"
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
            :is-password="isPassword"
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

    <TheModal
      :modal-opened="editAccountModalOpened"
      title="Edit MT4 Standart"
      @close="editAccountModalClose"
    >
      <div class="type-accounts-item__modal-wrapper">
        <div class="type-accounts-item__modal-list">
          <div
            v-for="(input, idx) in accountModalItems"
            :key="idx"
            class="type-accounts__modal-item"
          >
            <CustomSelect
              v-if="input.options"
              :options="input.options"
              :placeholder="input.placeholder"
              @select="getEditedSelectedItem"
            />
            <TheInput
              v-else
              :id="input.id"
              :required="input.required"
              :name="input.name"
              :type="input.type"
              :placeholder="input.placeholder"
              :is-right-button="input.isRightButton"
              :is-password="input.isPassword"
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
