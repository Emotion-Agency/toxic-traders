<script lang="ts" setup>
import type { iInput, iSearchInput, iSelectInput } from '~/types'
import type { ICreateTradingAccountPayload } from '~/types/trading-accounts/tradingAccounts'

interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close', 'create'])

const isPassword = ref(false)

const accountItems = ref<iSearchInput[]>([
  {
    title: 'Name',
    required: true,
    id: 'trading-account-name',
    name: 'Name',
    type: 'text',
    value: '',
    placeholder: 'Account name',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Login',
    required: true,
    id: 'trading-account-login',
    name: 'Login',
    type: 'text',
    value: '',
    placeholder: 'Login',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Password',
    required: true,
    id: 'trading-account-password',
    name: 'Password',
    type: 'password',
    value: '',
    placeholder: '********',
    disabled: false,
    isLeftButton: false,
    isRightButton: true,
  },
  {
    id: 'trading-account-servers',
    name: 'Servers',
    title: 'Servers',
    placeholder: 'Servers',
    options: ['MT4', 'MT5'],
    value: '',
  },
  {
    id: 'trading-account-broker-servers-type',
    name: 'Broker servers type',
    title: 'Broker Server Type',
    placeholder: 'Broker server type',
    options: ['MT4', 'MT5'],
    value: '',
  },
  {
    title: 'Broker Name',
    required: false,
    id: 'trading-account-broker-name',
    name: 'Broker name',
    type: 'text',
    value: '',
    placeholder: 'Broker name',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Broker Server',
    required: false,
    id: 'trading-account-broker-server',
    name: 'Broker server',
    type: 'text',
    value: '',
    placeholder: 'Broker server',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    title: 'Symbol spec',
    required: false,
    id: 'trading-account-symbol-spec',
    name: 'Symbol spec',
    type: 'text',
    value: '',
    placeholder: 'Symbol spec',
    disabled: false,
    isLeftButton: false,
    isRightButton: false,
  },
  {
    type: 'select',
    id: 'trading-account-placed-type',
    name: 'Placed type',
    title: 'Placed type',
    placeholder: 'Placed type',
    options: ['Manually', 'Personal'],
    value: '',
  },
])

const showPassword = () => {
  isPassword.value = !isPassword.value
}

const getValue = (id: string) =>
  accountItems.value.find(i => i.id === id)?.value || ''

const handleSubmit = () => {
  const payload: ICreateTradingAccountPayload = {
    name: getValue('trading-account-name'),
    login: getValue('trading-account-login'),
    password: getValue('trading-account-password'),
    servers: getValue('trading-account-servers') === 'MT5' ? 1 : 0,
    brokerServerType: getValue('trading-account-servers') === 'MT5' ? 1 : 0,
    brokerName: getValue('trading-account-broker-name'),
    brokerServer: getValue('trading-account-broker-server'),
    symbolSpec: getValue('trading-account-symbol-spec'),
    placedTypeMt4: getValue('trading-account-placed-type'),
    placedTypeMt5: getValue('trading-account-placed-type'),
  }

  emit('create', payload)
}

const onChange = (val: iInput) => {
  accountItems.value = accountItems.value.map(item => {
    if (item.id === val.id) {
      item = {
        ...item,
        value: val.value?.toString(),
      }
    }
    return item
  })
}

const getSelectedItem = (opts: iSelectInput) => {
  accountItems.value = accountItems.value.map(item => {
    if (item.id === opts.id) {
      item = {
        ...item,
        value: opts.value,
      }
    }
    return item
  })
}

const resetSelectedItem = (input: iSearchInput) => {
  accountItems.value = accountItems.value.map(item => {
    if (item.id === input.id) {
      item = {
        ...item,
        value: '',
      }
    }
    return item
  })
}
</script>

<template>
  <TheModal
    v-bind="$attrs"
    :modal-opened="modalOpened"
    title="Create new account"
    @close="emit('close')"
  >
    <div class="create-trading-account">
      <form
        novalidate
        @submit.prevent="handleSubmit"
        class="create-trading-account__form"
      >
        <div class="create-trading-account__list">
          <div
            v-for="(input, idx) in accountItems"
            :key="idx"
            class="create-trading-account__item"
          >
            <InputSelect
              v-slot="{ renderedItems }"
              v-if="input.options"
              :id="input.id"
              :name="input.name"
              :options="input.options"
              :title="input.title"
              :placeholder="input.placeholder"
              :value="input.value"
              :is-reset="!!input.value.length"
              @select="getSelectedItem"
              @reset="resetSelectedItem(input)"
            >
              <InputSelectOption
                v-for="(option, idx) in renderedItems"
                :key="option"
                :index="idx"
                :option="option"
              />
            </InputSelect>
            <InputField
              v-else
              :id="input.id"
              :required="input.required"
              :title="input.title"
              :name="input.name"
              :type="input.type"
              :placeholder="input.placeholder"
              :disabled="input.disabled"
              :value="input.value"
              :is-left-button="input.isLeftButton"
              :is-right-button="input.isRightButton"
              @input-value="onChange"
              @right-click="showPassword"
            >
              <template #right-icon>
                <IconsPasswordEye :is-visible="isPassword" />
              </template>
            </InputField>
          </div>
        </div>

        <div class="create-trading-account__btn-wrapper">
          <TheButton
            class="create-trading-account__btn"
            tag="button"
            variant="close"
            button-size="medium"
            @click="emit('close')"
          >
            Close
          </TheButton>
          <TheButton
            class="create-trading-account__btn"
            tag="button"
            type="submit"
            variant="fill"
            button-size="medium"
          >
            Create
          </TheButton>
        </div>
      </form>
    </div>
  </TheModal>
</template>
