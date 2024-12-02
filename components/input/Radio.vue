<script setup lang="ts">
interface iProps {
  id: string
  option: string
  name: string
  disabled?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['inputValue'])
const model = defineModel<string>()
</script>

<template>
  <label class="radio-input" :class="disabled && 'radio-input--disabled'">
    <span class="radio-input__text">
      {{ option }}
    </span>
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="option"
      :disabled="disabled"
      class="radio-input__type"
      v-model="model"
      @change="emit('inputValue', option)"
    />
    <span class="radio-input__checkmark" />
  </label>
</template>
