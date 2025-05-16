<script lang="ts" setup>
import type { iInput, iSearchInput, iSelectInput } from '~/types'
import type { ICreateTradingAccountPayload } from '~/types/trading-accounts/tradingAccounts'

interface iProps {
  modalOpened: boolean
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'create'])

const {
  getPlacedTypeMT4Enum,
  getPlacedTypeMT5Enum,
  placedTypeMT4,
  placedTypeMT5,
} = useEnums()

const isPassword = ref(false)

const accountItems = ref<iSearchInput[]>([
  {
    id: 'trading-account-name',
    name: 'Name',
    title: 'Name',
    type: 'text',
    required: true,
    value: '',
    placeholder: 'Account name',
    error: true,
  },
  {
    id: 'trading-account-login',
    name: 'Login',
    title: 'Login',
    type: 'text',
    required: true,
    value: '',
    placeholder: 'Login',
    error: true,
  },
  {
    id: 'trading-account-password',
    name: 'Password',
    title: 'Password',
    type: 'password',
    required: true,
    value: '',
    placeholder: '********',
    error: true,
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
    id: 'trading-account-broker-name',
    name: 'Broker name',
    title: 'Broker Name',
    type: 'text',
    value: '',
    placeholder: 'Broker name',
  },
  {
    id: 'trading-account-broker-server',
    name: 'Broker server',
    title: 'Broker Server',
    type: 'text',
    value: '',
    placeholder: 'Broker server',
  },
  {
    id: 'trading-account-symbol-spec',
    name: 'Symbol spec',
    title: 'Symbol spec',
    type: 'text',
    value: '',
    placeholder: 'Symbol spec',
  },
  {
    id: 'trading-account-placed-type',
    name: 'Placed type',
    title: 'Placed type',
    type: 'select',
    placeholder: 'Placed type',
    options: [],
    required: true,
    value: '',
    error: false,
  },
])

const getItem = (id: string) => accountItems.value.find(i => i.id === id)
const getValue = (id: string) => getItem(id)?.value || ''
const updateItem = (id: string, data: Partial<iSearchInput>) => {
  accountItems.value = accountItems.value.map(item =>
    item.id === id ? { ...item, ...data } : item
  )
}

const hasErrors = computed(() => accountItems.value.some(i => i.error))
const filteredAccountItems = computed(() =>
  accountItems.value.filter(
    i =>
      i.id !== 'trading-account-placed-type' ||
      getValue('trading-account-broker-servers-type')
  )
)

const showPassword = () => (isPassword.value = !isPassword.value)

const onChange = (val: iInput) => {
  updateItem(val.id, {
    value: val.value?.toString(),
    error: getItem(val.id)?.required ? !val.value.trim() : false,
  })
}

const getSelectedItem = ({ id, value }: iSelectInput) => {
  const isPlacedType = id === 'trading-account-placed-type'
  updateItem(id, {
    value,
    error: isPlacedType
      ? !!getValue('trading-account-broker-placed-type')
      : (getItem(id)?.required ?? false),
  })
}

const resetSelectedItem = ({ id, required }: iSearchInput) => {
  const isPlacedType = id === 'trading-account-placed-type'
  updateItem(id, {
    value: '',
    error: isPlacedType
      ? !!getValue('trading-account-broker-servers-type')
      : (required ?? false),
  })
}

const handleSubmit = () => {
  const isMT5 = getValue('trading-account-broker-servers-type') === 'MT5'
  const placedType = getValue('trading-account-placed-type')
  emit('create', {
    name: getValue('trading-account-name'),
    login: getValue('trading-account-login'),
    password: getValue('trading-account-password'),
    servers: getValue('trading-account-servers') === 'MT5' ? 1 : 0,
    brokerServerType: isMT5 ? 1 : 0,
    brokerName: getValue('trading-account-broker-name'),
    brokerServer: getValue('trading-account-broker-server'),
    symbolSpec: getValue('trading-account-symbol-spec'),
    placedTypeMt4: isMT5 ? '' : placedType,
    placedTypeMt5: isMT5 ? placedType : '',
  })
}

watch(
  () => props.modalOpened,
  async () => {
    await getPlacedTypeMT4Enum()
    await getPlacedTypeMT5Enum()
  }
)

watch(
  () => getValue('trading-account-broker-servers-type'),
  val => {
    const options = val === 'MT4' ? placedTypeMT4.value : placedTypeMT5.value
    updateItem('trading-account-placed-type', {
      options,
      value: '',
      error: !!val,
    })
  }
)
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
            v-for="(input, idx) in filteredAccountItems"
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
            :disabled="hasErrors"
          >
            Create
          </TheButton>
        </div>
      </form>
    </div>
  </TheModal>
</template>
