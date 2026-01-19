<script lang="ts" setup>
import type { iInput, iSearchInput, iSelectInput } from '~/types'
import type { IClient } from '~/types/clients/clients'
import type { ITradingAccount } from '~/types/trading-accounts/tradingAccounts'

interface iProps {
  modalOpened: boolean
  selectedAccount: ITradingAccount | null
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'update'])

const {
  getPlacedTypeMT4Enum,
  getPlacedTypeMT5Enum,
  placedTypeMT4,
  placedTypeMT5,
} = useEnums()
const { getAllClients } = useClients()

const isPassword = ref(false)
const selectedPlacedType = ref<number | null>(null)
const serverList = ref<IClient[]>()

const accountItems = ref<iSearchInput[]>([
  {
    id: 'trading-account-upd-name',
    name: 'Name',
    title: 'Name',
    type: 'text',
    required: true,
    value: props.selectedAccount?.name || '',
    placeholder: 'Account name',
    error: true,
  },
  {
    id: 'trading-account-upd-login',
    name: 'Login',
    title: 'Login',
    type: 'text',
    required: true,
    value: props.selectedAccount?.login || '',
    placeholder: 'Login',
    error: true,
  },
  {
    id: 'trading-account-upd-password',
    name: 'Password',
    title: 'Password',
    type: 'password',
    required: true,
    value: props.selectedAccount?.password || '',
    placeholder: '********',
    error: true,
    isRightButton: true,
  },
  {
    id: 'trading-account-upd-servers',
    name: 'Servers',
    title: 'Servers',
    placeholder: 'Servers',
    options: [],
    value: '',
  },
  {
    id: 'trading-account-upd-broker-servers-type',
    name: 'Broker servers type',
    title: 'Broker Server Type',
    placeholder: 'Broker server type',
    options: ['MT4', 'MT5'],
    value:
      props.selectedAccount?.brokerServerType === 1
        ? 'MT5'
        : props.selectedAccount?.brokerServerType === 0
          ? 'MT4'
          : '',
  },
  {
    id: 'trading-account-upd-broker-name',
    name: 'Broker name',
    title: 'Broker Name',
    type: 'text',
    value: props.selectedAccount?.brokerName || '',
    placeholder: 'Broker name',
  },
  {
    id: 'trading-account-upd-broker-server',
    name: 'Broker server',
    title: 'Broker Server',
    type: 'text',
    value: props.selectedAccount?.brokerServer || '',
    placeholder: 'Broker server',
  },
  {
    id: 'trading-account-upd-symbol-spec',
    name: 'Symbol spec',
    title: 'Symbol spec',
    type: 'text',
    value: props.selectedAccount?.symbolSpec || '',
    placeholder: 'Symbol spec',
  },
  {
    id: 'trading-account-upd-placed-type',
    name: 'Placed type',
    title: 'Placed type',
    type: 'select',
    placeholder: 'Placed type',
    options: [],
    value: '',
  },
])

const getItem = (id: string) => accountItems.value.find(i => i.id === id)
const getValue = (id: string) => {
  const item = getItem(id)
  if (!item) return ''
  const isSelect = Array.isArray(item.options)
  return isSelect ? item.value || 0 : item.value || ''
}
const updateItem = (id: string, data: Partial<iSearchInput>) => {
  accountItems.value = accountItems.value.map(item =>
    item.id === id ? { ...item, ...data } : item
  )
}

const hasErrors = computed(() => accountItems.value.some(i => i.error))

const filteredAccountItems = computed(() =>
  accountItems.value.filter(
    i =>
      i.id !== 'trading-account-upd-placed-type' ||
      getValue('trading-account-upd-broker-servers-type')
  )
)

const updatePlacedTypeOptions = () => {
  const options =
    getValue('trading-account-upd-broker-servers-type') === 'MT4'
      ? placedTypeMT4.value
      : placedTypeMT5.value

  const placedValue =
    props.selectedAccount.brokerServerType === 1
      ? placedTypeMT5.value?.[props.selectedAccount.placedTypeMt5 ?? '']
      : placedTypeMT4.value?.[props.selectedAccount.placedTypeMt4 ?? '']

  updateItem('trading-account-upd-placed-type', {
    options,
    value: placedValue || '',
  })
}

const showPassword = () => (isPassword.value = !isPassword.value)

const onChange = (val: iInput) => {
  updateItem(val.id, {
    value: val.value?.toString(),
    error: getItem(val.id)?.required ? !val.value.trim() : false,
  })
}

const getSelectedItem = ({ id, value }: iSelectInput) => {
  updateItem(id, {
    value,
  })
}

const resetSelectedItem = ({ id }: iSearchInput) => {
  updateItem(id, {
    value: '',
  })
}

const handleSubmit = () => {
  const serverType = getValue('trading-account-upd-broker-servers-type')
  const placedTypeValue = getValue('trading-account-upd-placed-type')
  const isMT5 = serverType === 'MT5'
  const placedEnum = isMT5 ? placedTypeMT5.value : placedTypeMT4.value

  selectedPlacedType.value =
    Number(
      Object.keys(placedEnum).find(val => placedEnum[val] === placedTypeValue)
    ) || null

  const payload = {
    id: props.selectedAccount?.id || '',
    name: getValue('trading-account-upd-name'),
    login: getValue('trading-account-upd-login'),
    password: getValue('trading-account-upd-password'),
    servers: null,
    brokerServerType: serverType ? (isMT5 ? 1 : 0) : null,
    brokerName: getValue('trading-account-upd-broker-name'),
    brokerServer: getValue('trading-account-upd-broker-server'),
    symbolSpec: getValue('trading-account-upd-symbol-spec'),
    placedTypeMt4: isMT5 ? null : selectedPlacedType.value,
    placedTypeMt5: isMT5 ? selectedPlacedType.value : null,
  }

  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v != null && v !== '')
  )

  emit('update', filteredPayload)
}

watch(
  () => props.selectedAccount,
  account => {
    if (!account) return

    updateItem('trading-account-upd-name', {
      value: account.name || '',
    })
    updateItem('trading-account-upd-login', {
      value: account.login?.toString() || '',
    })
    updateItem('trading-account-upd-password', {
      value: account.password || '',
    })
    // updateItem('trading-account-upd-servers', {
    //   value: account.servers || '',
    // })
    updateItem('trading-account-upd-broker-servers-type', {
      value:
        account.brokerServerType === 1
          ? 'MT5'
          : account.brokerServerType === 0
            ? 'MT4'
            : '',
    })
    updateItem('trading-account-upd-broker-name', {
      value: account.brokerName || '',
    })
    updateItem('trading-account-upd-broker-server', {
      value: account.brokerServer || '',
    })
    updateItem('trading-account-upd-symbol-spec', {
      value: account.symbolSpec || '',
    })

    updatePlacedTypeOptions()
  }
)

watch(
  () => props.modalOpened,
  async () => {
    const { items: clients } = await getAllClients()
    await getPlacedTypeMT4Enum()
    await getPlacedTypeMT5Enum()
    serverList.value = clients

    const clientMappingData = clients.map(c => {
      if (c?.clientName && c?.ip) return `${c.clientName} - ${c.ip}`
      if (c?.clientName) return c.clientName
      if (c?.ip) return c.ip
      return ''
    })

    updateItem('trading-account-upd-servers', {
      options: clientMappingData,
      value: '',
    })

    updatePlacedTypeOptions()
  }
)

watch(
  () => getValue('trading-account-upd-broker-servers-type'),
  () => {
    const options =
      getValue('trading-account-upd-broker-servers-type') === 'MT4'
        ? placedTypeMT4.value
        : placedTypeMT5.value

    updateItem('trading-account-upd-placed-type', {
      options,
      value: '',
    })
  }
)
</script>

<template>
  <TheModal
    v-bind="$attrs"
    :modal-opened="modalOpened"
    title="Edit trading account"
    @close="emit('close')"
  >
    <div class="update-trading-account">
      <form
        novalidate
        @submit.prevent="handleSubmit"
        class="update-trading-account__form"
      >
        <div class="update-trading-account__list">
          <div
            v-for="(input, idx) in filteredAccountItems"
            :key="idx"
            class="update-trading-account__item"
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

        <div class="update-trading-account__btn-wrapper">
          <TheButton
            class="update-trading-account__btn"
            tag="button"
            variant="close"
            button-size="medium"
            @click="emit('close')"
          >
            Close
          </TheButton>
          <TheButton
            class="update-trading-account__btn"
            tag="button"
            type="submit"
            variant="fill"
            button-size="medium"
            :disabled="hasErrors"
          >
            Edit
          </TheButton>
        </div>
      </form>
    </div>
  </TheModal>
</template>
