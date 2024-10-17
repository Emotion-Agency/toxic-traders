<script lang="ts" setup>
interface IProps {
  required?: boolean
  id: string
  title?: string
  name: string
  type?: string
  error?: boolean
  placeholder?: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  value?: string
  validators?: Function[]
}

const props = defineProps<IProps>()

const emit = defineEmits([
  'inputValue',
  'inputFocus',
  'inputBlur',
  'rightClick',
  'leftClick',
])

const hidePassword = ref(true)
</script>

<template>
  <InputField
    v-bind="props"
    @right-click="hidePassword = !hidePassword"
    @left-click="emit('leftClick')"
    @input-value="$event => emit('inputValue', $event)"
    @input-focus="() => emit('inputFocus')"
    @input-blur="() => emit('inputBlur')"
  >
    <template #right-icon>
      <IconsPasswordEye :is-visible="hidePassword" />
    </template>
  </InputField>
</template>
