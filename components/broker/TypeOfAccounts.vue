<script setup lang="ts">
export interface iAccountModalItem {
  required?: boolean
  id?: string
  name?: string
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  options?: string[]
}

const accountModalOpened = ref(false)
const accountList = ref([
  {
    title: 'MT4 Standrart',
  },
  {
    title: 'MT4 ECN',
  },
  {
    title: 'MT4 ECN',
  },
  {
    title: 'MT4 ECN',
  },
  {
    title: 'MT4 ECN',
  },
])

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
    placeholder: 'Type',
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
    type: 'text',
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

const onChange = val => {
  console.log(val)
}

const getSelectedItem = (item: string) => {
  console.log(item)
}

const accountModalOpen = () => {
  accountModalOpened.value = true
  document.body.classList.add('modal-open')
}

const accountModalClose = () => {
  accountModalOpened.value = false
}
</script>

<template>
  <div class="type-accounts">
    <ul class="type-accounts__list">
      <BrokerTypeOfAccountsItem
        title="Add new"
        :is-new-account="true"
        @add-new-account="accountModalOpen"
      />
      <BrokerTypeOfAccountsItem
        v-for="(account, idx) in accountList"
        :id="idx"
        :key="idx"
        :title="account.title"
        class="type-accounts__item"
      />
    </ul>
    <TheModal
      :modal-opened="accountModalOpened"
      title="Add new Account"
      @close="accountModalClose"
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
            :disabled="input.disabled"
            :is-left-button="input.isLeftButton"
            :is-right-button="input.isRightButton"
            @input-value="onChange"
          />
        </div>
      </div>
      <div class="type-accounts__buttons">
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="accountModalClose"
        >
          Close
        </TheButton>
        <TheButton tag="button" variant="fill" button-size="medium">
          Add
        </TheButton>
      </div>
    </TheModal>
  </div>
</template>
