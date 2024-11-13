<script lang="ts" setup>
import { useCheckbox } from '~/composables/headless/checkbox'
import type { ICheckbox, TCheckboxEmits } from '~/types/headless/input'

const props = defineProps<ICheckbox>()

const emit = defineEmits<TCheckboxEmits>()

const model = defineModel<boolean>()

const { $input, error, onBlur, onChange, onFocus, isFocused } = useCheckbox(
  props,
  emit,
  model
)
</script>

<template>
  <input
    ref="$input"
    type="checkbox"
    data-checkbox
    :id="id"
    :name="name"
    :required="required"
    :data-focused="isFocused"
    :value="name"
    v-model="model"
    :disabled="disabled"
    :autofocus="autoFocus"
    :aria-invalid="error"
    @focus="onFocus"
    @blur="onBlur"
    @change="onChange"
  />
</template>
