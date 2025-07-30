<script lang="ts" setup>
import type { iCheckbox, iInput } from '~/types'

interface iProps {
  modalOpened: boolean
}

const props = defineProps<iProps>()

interface iInputField {
  id: string
  name: string
  type: 'text' | 'number' | 'checkbox'
  value: string | boolean
  placeholder: string
  required: boolean
}

const emit = defineEmits(['close', 'create'])

const headerFields = ['Variable', 'Value']
const originalValues = ref<Record<string, string | boolean>>({})

const inputsList = ref<iInputField[]>([
  {
    id: 'terminal-settings-pair',
    name: 'Pair',
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    required: false,
  },
  {
    id: 'terminal-settings-lotn',
    name: 'Lot N',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-lota',
    name: 'Lot A',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-lott',
    name: 'Lot T',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-slippagen',
    name: 'Slippage N',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-slippagea',
    name: 'Slippage A',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-slippaget',
    name: 'Slippage T',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-profitn',
    name: 'Profit N',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-profita',
    name: 'Profit A',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-profitt',
    name: 'Profit T',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-stoploss',
    name: 'Stop Loss',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-whenbe',
    name: 'When BE',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-wherebe',
    name: 'Where BE',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-trailingwhen',
    name: 'Trailing When',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-trailingstep',
    name: 'Trailing Step',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-reverse',
    name: 'Reverse',
    type: 'checkbox',
    value: false,
    placeholder: '',
    required: false,
  },
  {
    id: 'terminal-settings-spread',
    name: 'Spread',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-timer',
    name: 'Timer',
    type: 'number',
    value: '',
    placeholder: '0',
    required: false,
  },
  {
    id: 'terminal-settings-usepairsuffix',
    name: 'Use Pair Suffix',
    type: 'checkbox',
    value: false,
    placeholder: '',
    required: false,
  },
])

const isSubmitDisabled = computed(() =>
  inputsList.value.every(field =>
    field.type === 'checkbox' ? field.value === false : field.value === ''
  )
)

const onChange = (val: iInput) => {
  inputsList.value = inputsList.value.map(item => {
    if (item.id === val.id) {
      item = {
        ...item,

        value: val.value?.toString(),
      }
    }
    return item
  })
}

const toggleSelect = (val: iCheckbox) => {
  inputsList.value = inputsList.value.map(item => {
    if (item.id === val.id) {
      item = {
        ...item,
        value: val.isChecked,
      }
    }
    return item
  })
}

const resetInputs = () => {
  inputsList.value = inputsList.value.map(field => ({
    ...field,
    value: field.type === 'checkbox' ? false : '',
  }))
}

const fieldIdToKeyMap: Record<string, string> = {
  'terminal-settings-pair': 'symbol',
  'terminal-settings-lotn': 'lotN',
  'terminal-settings-lota': 'lotA',
  'terminal-settings-lott': 'lotT',
  'terminal-settings-slippagen': 'slppN',
  'terminal-settings-slippagea': 'slppA',
  'terminal-settings-slippaget': 'slppT',
  'terminal-settings-profitn': 'profN',
  'terminal-settings-profita': 'profA',
  'terminal-settings-profitt': 'profT',
  'terminal-settings-stoploss': 'sl',
  'terminal-settings-whenbe': 'whenBE',
  'terminal-settings-wherebe': 'whereBE',
  'terminal-settings-trailingwhen': 'trailWhen',
  'terminal-settings-trailingstep': 'trailStep',
  'terminal-settings-reverse': 'reverse',
  'terminal-settings-spread': 'spread',
  'terminal-settings-timer': 'timer',
  'terminal-settings-usepairsuffix': 'usePairSuffix',
}

const handleSubmit = () => {
  const submitData = inputsList.value.reduce(
    (acc, field) => {
      const key = fieldIdToKeyMap[field.id]
      if (key && field.value !== originalValues.value[key]) {
        acc[key] = field.value
      }
      return acc
    },
    {} as Record<string, string | boolean>
  )

  resetInputs()

  console.log('submitData:', submitData)
  emit('create', submitData)
  emit('close')
}

const handleTerminalsSettingsModalClose = () => {
  emit('close')
}

watch(
  () => props.modalOpened,
  isOpen => {
    if (isOpen) {
      originalValues.value = inputsList.value.reduce(
        (acc, field) => {
          const key = fieldIdToKeyMap[field.id]
          if (key) acc[key] = field.value
          return acc
        },
        {} as Record<string, string | boolean>
      )
    }
  }
)
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Terminals settings"
    @close="handleTerminalsSettingsModalClose"
  >
    <form
      novalidate
      @submit.prevent="handleSubmit"
      class="terminals-settings-modal"
    >
      <div class="terminals-settings-modal__modal-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                v-for="(headerItem, idx) in headerFields"
                :key="idx"
                :item="headerItem"
                :class="[
                  `table-cell--${idx}`,
                  `table-cell--${headerFields[idx]}`,
                ]"
              >
                {{ headerItem }}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow v-for="(field, idx) in inputsList" :key="idx">
              <TableCell
                :item="formatToPascalCase(field?.name)"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                {{ field?.name }}
              </TableCell>
              <TableCell
                item="choose"
                :disable-tooltip="true"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                <InputCheckbox
                  v-if="field?.type === 'checkbox'"
                  :name="field?.name"
                  value=""
                  :id="field?.id"
                  @input-value="toggleSelect"
                />
                <InputField
                  v-else
                  :id="field?.id"
                  :required="field?.required"
                  :name="field?.name"
                  :type="field?.type"
                  :placeholder="field?.placeholder"
                  @input-value="onChange"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="terminals-settings-modal__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="handleTerminalsSettingsModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          type="submit"
          :disabled="isSubmitDisabled"
        >
          Ok
        </TheButton>
      </div>
    </form>
  </TheModal>
</template>
