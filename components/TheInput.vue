<script setup lang="ts">
interface iProps {
  required?: boolean
  id: string
  title: string
  name: string
  type?: string
  validation?: string
  validationText?: string
  error?: boolean
  placeholder?: string
  disabled?: boolean
}

const props = defineProps<iProps>()

const emit = defineEmits(['inputValue'])

const {
  inputValue,
  inputFocus,
  error,
  $input,
  onFocus,
  onBlur,
  onInput,
  reset,
  throwError,
} = useInput(emit, props)

defineExpose({
  throwError,
  reset,
})
</script>

<template>
  <label
    class="input"
    :class="[
      type === 'textarea' && 'input--textarea',
      type === 'select' && 'input--select',
      inputFocus && 'js-focus',
    ]"
    :for="id"
  >
    <span class="input__title"
      >{{ title }} <span v-if="required === true">*</span>
    </span>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      ref="$input"
      v-model="inputValue"
      class="input__type"
      :class="error && 'input__type--error'"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />

    <input
      v-else
      :id="id"
      ref="$input"
      v-model="inputValue"
      class="input__type"
      :class="error && 'input__type--error'"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />

    <small v-if="error" class="input__error">
      {{ validationText }}
    </small>
  </label>
</template>
