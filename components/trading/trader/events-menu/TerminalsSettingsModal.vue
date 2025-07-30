<script lang="ts" setup>
import type { IInput } from '~/types/headless/input'

interface iProps {
  modalOpened: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close', 'create'])

const headerFields = ['Variable', 'Value']

const fieldsList = ref([
  {
    variable: 'Pair',
    input: {
      id: 'terminal-settings-pair',
      name: 'Terminal pair',
      type: 'text',
      value: '',
      placeholder: 'Placeholder',
      required: false,
    },
  },
  {
    variable: 'LotN',
    input: {
      id: 'terminal-settings-lotn',
      name: 'Lot N',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'LotA',
    input: {
      id: 'terminal-settings-lota',
      name: 'Lot A',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'LotT',
    input: {
      id: 'terminal-settings-lott',
      name: 'Lot T',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'SlippageN',
    input: {
      id: 'terminal-settings-slippagen',
      name: 'Slippage N',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'SlippageA',
    input: {
      id: 'terminal-settings-slippagea',
      name: 'Slippage A',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'SlippageT',
    input: {
      id: 'terminal-settings-slippaget',
      name: 'Slippage T',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'profitN',
    input: {
      id: 'terminal-settings-profitn',
      name: 'Profit N',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'profitA',
    input: {
      id: 'terminal-settings-profita',
      name: 'Profit A',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'profitT',
    input: {
      id: 'terminal-settings-profitt',
      name: 'Profit T',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'stoploss',
    input: {
      id: 'terminal-settings-stoploss',
      name: 'Stop Loss',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'WhenBE',
    input: {
      id: 'terminal-settings-whenbe',
      name: 'When BE',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'WhereBE',
    input: {
      id: 'terminal-settings-wherebe',
      name: 'Where BE',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'TrailingWhen',
    input: {
      id: 'terminal-settings-trailingwhen',
      name: 'Trailing When',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'TrailingStep',
    input: {
      id: 'terminal-settings-trailingstep',
      name: 'Trailing Step',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'Reverse',
    input: {
      id: 'terminal-settings-reverse',
      name: 'Reverse',
      type: 'checkbox',
      value: false,
      placeholder: '',
      required: false,
    },
  },
  {
    variable: 'Spread',
    input: {
      id: 'terminal-settings-spread',
      name: 'Spread',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'Timer',
    input: {
      id: 'terminal-settings-timer',
      name: 'Timer',
      type: 'number',
      value: '',
      placeholder: '0',
      required: false,
    },
  },
  {
    variable: 'UsePairSuffix',
    input: {
      id: 'terminal-settings-usepairsuffix',
      name: 'Use Pair Suffix',
      type: 'checkbox',
      value: false,
      placeholder: '',
      required: false,
    },
  },
])

const onChange = (val: IInput) => {
  console.log(val)
}

const toggleSelect = (val: { value: string; isChecked: boolean }) => {
  console.log(val)
}

const handleSubmit = async () => {
  emit('create')
  emit('close')
}

const handleTerminalsSettingsModalClose = () => {
  emit('close')
}
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
            <TableRow v-for="(field, idx) in fieldsList" :key="idx">
              <TableCell
                :item="field?.variable"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                {{ field?.variable }}
              </TableCell>
              <TableCell
                item="choose"
                :disable-tooltip="true"
                :class="[`table-cell--${headerFields[idx]}`]"
              >
                <InputCheckbox
                  v-if="field?.input?.type === 'checkbox'"
                  :name="field?.input?.name"
                  value=""
                  :id="field?.input?.id"
                  @input-value="toggleSelect"
                />
                <InputField
                  v-else
                  :id="field?.input?.id"
                  :required="field?.input?.required"
                  :name="field?.input?.name"
                  :type="field?.input?.type"
                  :placeholder="field?.input?.placeholder"
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
        >
          Ok
        </TheButton>
      </div>
    </form>
  </TheModal>
</template>
